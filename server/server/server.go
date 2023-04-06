package server

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func Start() {
	router := gin.Default()
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"*"}
	router.Use(cors.New(config))

	// router.GET("/transactions", server.getAllNormalTransactions)
	// router.GET("/fixed", server.getAllFixedTransactions)
	// router.POST("/transactions", server.postNormalTransaction)
	// router.POST("/fixed", server.postFixedTransaction)

	// router.PUT("/transactions", server.updateNormalTransaction)
	// router.DELETE("/transactions", server.deleteNormalTransaction)

	// router.GET("/accounts", server.getAccounts)
	// router.POST("/accounts", server.postAccount)

	router.GET("/balances", server.getBalances)

	// router.POST("/transactions", server.postTransaction)
	// router.GET("/transactions", server.getTransactions)

	// router.POST("signup", server.postSignUp)
	// router.POST("signin", server.postSignIn)
	// router.POST("signout", server.postSignOut)

	// router.POST("/consolidations", server.postConsolidation)

	router.Run("localhost:8080")
}

// func (server *Server) getAccounts(c *gin.Context) {
// 	accounts, err := server.db.GetAccounts()
// 	if err != nil {
// 		fmt.Printf("server: error getting accounts: %v", err)
// 		return
// 	}
// 	c.IndentedJSON(http.StatusOK, accounts)
// }

// func (server *Server) postAccount(c *gin.Context) {
// 	var newAccount database.Account

// 	if err := c.BindJSON(&newAccount); err != nil {
// 		fmt.Printf("server: failed to post account: %v", err)
// 		return
// 	}

// 	err := server.db.PostAccount(newAccount)
// 	if err != nil {
// 		fmt.Printf("server: error posting account: %v", err)
// 		return
// 	}

// 	c.Status(200)
// }

// func (server *Server) getBalances(c *gin.Context) {
// 	balances, err := server.db.GetBalances()
// 	if err != nil {
// 		fmt.Printf("server: error getting accounts: %v", err)
// 		return
// 	}
// 	c.IndentedJSON(http.StatusOK, balances)
// }

// func (server *Server) getTransactions(c *gin.Context) {
// 	transactions, err := server.db.GetTransactions()
// 	if err != nil {
// 		fmt.Printf("server: error getting transactions: %v", err)
// 		return
// 	}
// 	c.IndentedJSON(http.StatusOK, transactions)
// }

// func (server *Server) postTransaction(c *gin.Context) {
// 	var newTransaction database.Transaction

// 	if err := c.BindJSON(&newTransaction); err != nil {
// 		fmt.Printf("server: failed to post transaction: %v", err)
// 		return
// 	}

// 	err := server.db.PostTransaction(newTransaction)
// 	if err != nil {
// 		fmt.Printf("server: error posting transaction: %v", err)
// 		return
// 	}

// 	c.Status(200)
// }

// func (server *Server) postSignUp(c *gin.Context) {
// 	var newUser database.Transaction

// 	if err := c.BindJSON(&newTransaction); err != nil {
// 		fmt.Printf("server: failed to post transaction: %v", err)
// 		return
// 	}

// 	err := server.db.PostTransaction(newTransaction)
// 	if err != nil {
// 		fmt.Printf("server: error posting transaction: %v", err)
// 		return
// 	}

// 	c.Status(200)
// }

// // func (server *Server) postConsolidation(c *gin.Context) {
// // 	var newConsolidation database.Consolidation

// // 	if err := c.BindJSON(&newConsolidation); err != nil {
// // 		fmt.Printf("server: failed to post consolidation: %v", err)
// // 		return
// // 	}

// // 	err := server.db.PostConsolidation(newConsolidation)
// // 	if err != nil {
// // 		fmt.Printf("server: error posting consolidation: %v", err)
// // 		return
// // 	}

// // 	c.Status(200)
// // }

// // func (server *Server) getSummary(c *gin.Context) {
// // 	summary, err := server.db.GetSummary()
// // 	if err != nil {
// // 		fmt.Printf("server: error getting summary: %v", err)
// // 		return
// // 	}
// // 	c.IndentedJSON(http.StatusOK, summary)
// // }

// // func (server *Server) getAllNormalTransactions(c *gin.Context) {
// // 	transactions, err := server.db.GetAllNormalTransactions()
// // 	if err != nil {
// // 		fmt.Printf("server: error getting all normal transactions: %v", err)
// // 		return
// // 	}
// // 	c.IndentedJSON(http.StatusOK, transactions)
// // }

// // func (server *Server) getAllFixedTransactions(c *gin.Context) {
// // 	transactions, err := server.db.GetAllFixedTransactions()
// // 	if err != nil {
// // 		fmt.Printf("server: error getting all fixed transactions: %v", err)
// // 		return
// // 	}
// // 	c.IndentedJSON(http.StatusOK, transactions)
// // }

// // func (server *Server) postNormalTransaction(c *gin.Context) {
// // 	var newTransaction database.Transaction

// // 	if err := c.BindJSON(&newTransaction); err != nil {
// // 		fmt.Printf("server: failed to post transaction: %v", err)
// // 		return
// // 	}

// // 	server.db.AddNormalTransaction(newTransaction)
// // 	c.IndentedJSON(http.StatusCreated, newTransaction)
// // }

// // func (server *Server) postFixedTransaction(c *gin.Context) {
// // 	var newTransaction database.Fixed

// // 	if err := c.BindJSON(&newTransaction); err != nil {
// // 		fmt.Printf("server: failed to post transaction: %v", err)
// // 		return
// // 	}

// // 	server.db.AddFixedTransaction(newTransaction)
// // 	c.IndentedJSON(http.StatusCreated, newTransaction)
// // }

// // func (server *Server) updateNormalTransaction(c *gin.Context) {
// // 	var newTransaction database.Transaction

// // 	if err := c.BindJSON(&newTransaction); err != nil {
// // 		fmt.Printf("server: failed to post transaction: %v", err)
// // 		return
// // 	}

// // 	server.db.UpdateNormalTransaction(newTransaction)
// // 	c.IndentedJSON(http.StatusCreated, newTransaction)
// // }

// // func (server *Server) deleteNormalTransaction(c *gin.Context) {
// // 	idStr := c.Query("id")

// // 	id, err := strconv.ParseInt(idStr, 10, 64)
// // 	if err != nil {
// // 		fmt.Printf("server: failed to delete transaction: %v", err)
// // 		return
// // 	}

// // 	server.db.DeleteNormalTransaction(id)
// // 	c.Status(200)
// // }
