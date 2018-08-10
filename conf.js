var canvasObj = {
	startX : 800,
	startY : 40,
	width : 200,
	height: 400
};

var boardObj = {
	square : {
		width : 20,
		height : 20,
		lineWidth : 1,
		lineColor: '#DDD',
	}
};

var canvasHipoObj = {
	startX : 20,
	startY : 40,
	width : 720,
	height: 400,
	track: {
		no : 6,
		height : 50
	},
	sky : {
		height : 63,
		color: '#b3ecff'
	},
	grass : {
		color: '#c6ffb3',
		arc : {
			width : 20,
			height : 20,
			radius : 40,
			lineWidth : 5,
			lineColor: '#61AE24',
		}
	},
	horse : {
		startX : 20,
		startY : 10,
		width : 100,
		height : 50,
		image : 'horse.png',
		advance : {
			units : 20
		}
	}
};

var boardPieces = {
	line : {
		type : 'line',
		position : {
			1 : {
				width : 20,
				height : 80,
				square : {
					1 : {
						x : 2,
						y : 2,
					},
					2 : {
						x : 2,
						y : 22
					},
					3 : {
						x : 2,
						y : 42
					},
					4 : {
						x : 2,
						y : 62
					}
				},
				vector: [[1],[1],[1],[1]],
				rows : 4,
				columns : 1
			},
			2 : {
				width : 80,
				height : 20,
				square : {
					1 : {
						x : 2,
						y : 2
					},
					2 : {
						x : 22,
						y : 2
					},
					3 : {
						x : 42,
						y : 2
					},
					4 : {
						x : 62,
						y : 2
					},
				},
				vector: [[1,1,1,1]],
				rows : 1,
				columns : 4
			}
		},
		squareAttributes : {
			width : 18,
			height : 18,
		},
		squareNo : 4,
		positionNo : 2,
		color : '#E54028'
	},
	zet1 : {
		type : 'zet1',
		position : {
			1 : {
				width : 60,
				height : 40,
				square : {
					1 : {
						x : 2,
						y : 2,
					},
					2 : {
						x : 22,
						y : 2
					},
					3 : {
						x : 22,
						y : 22
					},
					4 : {
						x : 42,
						y : 22
					}
				},
				vector: [[1,1,0],[0,1,1]],
				rows : 2,
				columns : 3
			},
			2 : {
				width : 40,
				height : 60,
				square : {
					1 : {
						x : 22,
						y : 2,
					},
					2 : {
						x : 2,
						y : 22
					},
					3 : {
						x : 22,
						y : 22
					},
					4 : {
						x : 2,
						y : 42
					}
				},
				vector: [[0,1],[1,1],[1,0]],
				rows : 3,
				columns : 2
			}
		},
		squareAttributes : {
			width : 18,
			height : 18,
		},
		positionNo : 2,
		squareNo : 4,
		color : '#F18D05'
	},
	zet2 : {
		type : 'zet2',
		position : {
			1 : {
				width : 60,
				height : 40,
				square : {
					1 : {
						x : 22,
						y : 2,
					},
					2 : {
						x : 42,
						y : 2
					},
					3 : {
						x : 2,
						y : 22
					},
					4 : {
						x : 22,
						y : 22
					}
				},
				vector: [[0,1,1],[1,1,0]],
				rows : 2,
				columns : 3
			},
			2 : {
				width : 40,
				height : 60,
				square : {
					1 : {
						x : 2,
						y : 2,
					},
					2 : {
						x : 2,
						y : 22
					},
					3 : {
						x : 22,
						y : 22
					},
					4 : {
						x : 22,
						y : 42
					}
				},
				vector: [[1,0],[1,1],[0,1]],
				rows : 3,
				columns : 2
			}
		},
		squareAttributes : {
			width : 18,
			height : 18,
		},
		positionNo : 2,
		squareNo : 4,
		color : '#01A4A4'
	},
	el1 : {
		type : 'el1',
		position : {
			1 : {
				width : 60,
				height : 40,
				square : {
					1 : {
						x : 2,
						y : 2,
					},
					2 : {
						x : 22,
						y : 2
					},
					3 : {
						x : 42,
						y : 2
					},
					4 : {
						x : 42,
						y : 22
					}
				},
				vector: [[1,1,1],[0,0,1]],
				rows : 2,
				columns : 3
			},
			2 : {
				width : 40,
				height : 60,
				square : {
					1 : {
						x : 2,
						y : 2,
					},
					2 : {
						x : 2,
						y : 22
					},
					3 : {
						x : 2,
						y : 42
					},
					4 : {
						x : 22,
						y : 2
					}
				},
				vector: [[1,1],[1,0],[1,0]],
				rows : 3,
				columns : 2
			},
			3 : {
				width : 60,
				height : 40,
				square : {
					1 : {
						x : 2,
						y : 2,
					},
					2 : {
						x : 2,
						y : 22
					},
					3 : {
						x : 22,
						y : 22
					},
					4 : {
						x : 42,
						y : 22
					}
				},
				vector: [[1,0,0],[1,1,1]],
				rows : 2,
				columns : 3
			},
			4 : {
				width : 40,
				height : 60,
				square : {
					1 : {
						x : 2,
						y : 42,
					},
					2 : {
						x : 22,
						y : 2
					},
					3 : {
						x : 22,
						y : 22
					},
					4 : {
						x : 22,
						y : 42
					}
				},
				vector: [[0,1],[0,1],[1,1]],
				rows : 3,
				columns : 2
			}
		},
		squareAttributes : {
			width : 18,
			height : 18,
		},
		positionNo : 4,
		squareNo : 4,
		color : '#D0D102'
	},
	el2 : {
		type : 'el2',
		position : {
			1 : {
				width : 60,
				height : 40,
				square : {
					1 : {
						x : 2,
						y : 2,
					},
					2 : {
						x : 22,
						y : 2
					},
					3 : {
						x : 42,
						y : 2
					},
					4 : {
						x : 2,
						y : 22
					}
				},
				vector: [[1,1,1],[1,0,0]],
				rows : 2,
				columns : 3
			},
			2 : {
				width : 40,
				height : 60,
				square : {
					1 : {
						x : 2,
						y : 2,
					},
					2 : {
						x : 2,
						y : 22
					},
					3 : {
						x : 2,
						y : 42
					},
					4 : {
						x : 22,
						y : 42
					}
				},
				vector: [[1,0],[1,0],[1,1]],
				rows : 3,
				columns : 2
			},
			3 : {
				width : 60,
				height : 40,
				square : {
					1 : {
						x : 42,
						y : 2,
					},
					2 : {
						x : 2,
						y : 22
					},
					3 : {
						x : 22,
						y : 22
					},
					4 : {
						x : 42,
						y : 22
					}
				},
				vector: [[0,0,1],[1,1,1]],
				rows : 2,
				columns : 3
			},
			4 : {
				width : 40,
				height : 60,
				square : {
					1 : {
						x : 2,
						y : 2,
					},
					2 : {
						x : 22,
						y : 2
					},
					3 : {
						x : 22,
						y : 22
					},
					4 : {
						x : 22,
						y : 42
					}
				},
				vector: [[1,1],[0,1],[0,1]],
				rows : 3,
				columns : 2
			}
		},
		squareAttributes : {
			width : 18,
			height : 18,
		},
		positionNo : 4,
		squareNo : 4,
		color : '#D70060'
	},
	te : {
		type : 'te',
		position : {
			1 : {
				width : 60,
				height : 40,
				square : {
					1 : {
						x : 2,
						y : 2,
					},
					2 : {
						x : 22,
						y : 2
					},
					3 : {
						x : 42,
						y : 2
					},
					4 : {
						x : 22,
						y : 22
					}
				},
				vector: [[1,1,1],[0,1,0]],
				rows : 2,
				columns : 3
			},
			2 : {
				width : 40,
				height : 60,
				square : {
					1 : {
						x : 2,
						y : 2,
					},
					2 : {
						x : 2,
						y : 22
					},
					3 : {
						x : 2,
						y : 42
					},
					4 : {
						x : 22,
						y : 22
					}
				},
				vector: [[1,0],[1,1],[1,0]],
				rows : 3,
				columns : 2
			},
			3 : {
				width : 60,
				height : 40,
				square : {
					1 : {
						x : 22,
						y : 2,
					},
					2 : {
						x : 2,
						y : 22
					},
					3 : {
						x : 22,
						y : 22
					},
					4 : {
						x : 42,
						y : 22
					}
				},
				vector: [[0,1,0],[1,1,1]],
				rows : 2,
				columns : 3
			},
			4 : {
				width : 40,
				height : 60,
				square : {
					1 : {
						x : 2,
						y : 22,
					},
					2 : {
						x : 22,
						y : 2
					},
					3 : {
						x : 22,
						y : 22
					},
					4 : {
						x : 22,
						y : 42
					}
				},
				vector: [[0,1],[1,1],[0,1]],
				rows : 3,
				columns : 2
			}
		},
		squareAttributes : {
			width : 18,
			height : 18,
		},
		positionNo : 4,
		squareNo : 4,
		color : '#61AE24'
	},
	square : {
		type : 'square',
		position : {
			1 : {
				width : 40,
				height : 40,
				square : {
					1 : {
						x : 2,
						y : 2,
					},
					2 : {
						x : 22,
						y : 2
					},
					3 : {
						x : 2,
						y : 22
					},
					4 : {
						x : 22,
						y : 22
					}
				},
				vector: [[1,1],[1,1]],
				rows : 2,
				columns : 2
			}
		},
		squareAttributes : {
			width : 18,
			height : 18,
		},
		positionNo : 1,
		squareNo : 4,
		color : '#00A1CB'
	}
};