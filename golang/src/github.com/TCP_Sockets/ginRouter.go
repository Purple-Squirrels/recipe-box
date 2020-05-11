package main

import (
	"github.com/gin-gonic/gin"
	"github.com/googollee/go-socket.io"
)

func GinRouter(router *gin.Engine, server *socketio.Server) {
	router.Use(GinMiddleware("http://localhost:3000"))
	router.GET("/socket.io/*any", gin.WrapH(server))
	router.POST("/socket.io/*any", gin.WrapH(server))
	router.GET("/", func(c *gin.Context) {
		c.File("./asset/index.html")
	})

	router.Run(":8082")
}