package main

import (
	"bufio"
	"fmt"
	"log"
	"net"
)

var playerMap = map[string]net.Conn{}
var totalPlayers = 0

func main() {
	li, err := net.Listen("tcp", ":8082")
	if err != nil { log.Fatalln(err) }

	for {
		conn, err := li.Accept()
		if err != nil { log.Println(err) }
		if totalPlayers < 2 {
			_, ok := playerMap["Player-1"]
			if ok == false {
				playerMap["Player-1"] = conn
				totalPlayers++
				go request(conn, "Player-1")
			} else {
				playerMap["Player-2"] = conn
				totalPlayers++
				go request(conn, "Player-2")
			}
		} else {
			conn.Close()
		}
	}
}

func request (conn net.Conn, player string) {
	scanner := bufio.NewScanner(conn)
	for scanner.Scan() {
		ln := scanner.Text()
		if totalPlayers == 1 {
			fmt.Fprintln(conn,"Waiting for additional players")
		} else if totalPlayers == 2 {
			if player == "Player-1" {
				fmt.Fprintln(playerMap["Player-2"],"Message from other player1: " + ln)
			} else {
				fmt.Fprintln(playerMap["Player-1"] ,"Message from other player2: " + ln)
			}
		}
	}
	conn.Close()
	totalPlayers--
	delete(playerMap, player)
}

