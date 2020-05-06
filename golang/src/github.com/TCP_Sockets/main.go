package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"log"
	"github.com/googollee/go-socket.io"
)

func main() {
	router := gin.New()
	server, err := socketio.NewServer(nil)
	if err != nil {
		log.Fatal(err)
	}
	server.OnConnect("/", func(s socketio.Conn) error {
		s.Join("players")
		s.Emit("playerNumber", server.RoomLen("/", "players"))
		if server.RoomLen("/", "players") == 2 {
			server.BroadcastToRoom("/", "players", "playersReady")
		}
		return nil
	})
	server.OnEvent("/playerMessage", "dataFromPlayer", func(s socketio.Conn, msg string) {
		server.BroadcastToRoom("/", "players", "incomingData", msg)
	})
	server.OnError("/", func(s socketio.Conn, e error) {
		fmt.Println("meet error:", e)
	})
	server.OnDisconnect("/", func(s socketio.Conn, reason string) {
		fmt.Println("closed", reason)
	})

	go server.Serve()
	defer server.Close()

	GinRouter(router, server)
}


