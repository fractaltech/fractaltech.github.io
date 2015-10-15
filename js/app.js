var winwidth = window.innerWidth;
// pending: running this function on resize
var styles = ( function() {
	if (winwidth > 990) {
		return {
			topPanel:{
				backgroundColor: "#ebf0fa",
				h3: {
		        marginBottom: "10px"
		    	},
		    	img: {
		        height: "15%",
		        padding: "5px"
		    	}
			},
			panel1: {
			    position: "relative",
			    backgroundColor: "#100F0D",
			    h1: {
			    	position: "absolute",
			        marginTop: "-350px",
			        textAlign: "left",
			        color: "#EBF0FA",
			        padding: "20px",
			        marginBottom: "60px",
			        zIndex: "+2"
			    },
			    h2_a: {
			    	position: "absolute",
			    	marginTop: "-200px",
			        textAlign: "left",
			        color: "#EBF0FA",
			        padding: "10px",
			        marginLeft: "10px",
			        zIndex: "+2"
			    },
			    h2_b: {
			    	position: "absolute",
			    	marginTop: "-100px",
			        textAlign: "left",
			        color: "#EBF0FA",
			        padding: "10px",
			        marginLeft: "10px",
			        zIndex: "+2"
			    },
			    back1: {
				    position: "relative",
				    width: "100%",
				    zIndex: "+1"
		    	}
			},
			panel2: {
			    position: "relative",
			    backgroundColor: "#EBF0FA",
			    h1: {
			        textAlign: "center",
			        padding: "60px"   
			    },
			    h2: {
			        textAlign: "center",
			        padding: "20px"
			    },
			    p: {
			        textAlign: "center",
			        marginBottom: "80px"
			    },
			    ul: {
			        textAlign: "center"
			    },
			    p2Logo: {
			        display: "block",
			        marginRight: "auto",
			        marginLeft: "auto",
			        height: "100px"
			    }
			},
			panel3: {
			    position: "relative",
			    backgroundColor: "#0A0B0F",
			    img: {
			        zIndex: "+1",
			        width: "100%"
			    },
			    h1: {
			        position: "absolute",
			        zIndex: "+2",
			        padding: "20px",
			        marginTop: "-150px",
			        textAlign: "center",
			        width: "100%"
			    }
			},
			bottomPanel: {
			    position: "relative",
			    backgroundColor: "#00334C",
			    h1: {
			        textAlign: "center",
			        color: "#EBF0FA"
			    },
			    h5: {
			        textAlign: "center",
			        padding: "25px",
			        color: "#EBF0FA"
			    }
			},
			getInTouch: {
			    backgroundColor: "#0A0B0F",
			    color: "#008cba",
			    border: "4px solid #008cba"
			}/*,
			input: {
			    padding: "5px",
			    marginTop: "5px",
			    marginLeft: "10px",
			    backgroundColor: "#EBF0FA",
			    border: "2px ridge #B8B8B8"
			}, 
			textarea: {
			    padding: "5px",
			    marginTop: "5px",
			    marginLeft: "10px",
			    backgroundColor: "#EBF0FA",
			    border: "2px ridge #B8B8B8"
			},
			modalHeader: {
			    backgroundColor: "#EBF0FA",
			    h3: {
			    	padding: "10px"
			    }
			},
			modalBody: {
			    backgroundColor: "#EBF0FA"
			},
			submitButton: {
				marginTop: "5px",
				marginLeft: "10px",
				padding: "5px"
			},
			closeButton: {
				padding: "5px"
			}*/
		};
	} else {
		return {
	    	topPanel:{
				backgroundColor: "#ebf0fa",
				h3: {
		        marginRight: "10px",
		        textAlign: "right",
		        marginTop: "35px"
		    	},
		    	img: {
		        height: "10%",
		        padding: "1px"
		    	}
		    },
			panel1: {
			    position: "relative",
			    backgroundColor: "#100F0D",
			    height: "auto",
			    h1: {
			    	position: "absolute",
			        fontSize: "35px",
			        marginTop: "-250px",
			        textAlign: "left",
			        color: "#EBF0FA",
			        padding: "5px",
			        marginBottom: "2px",
			        marginLeft: "3px",
			        zIndex: "+2"
			    },
			    h2_a: {
			    	position: "absolute",
			    	marginTop: "-140px",
			    	fontSize: "28px",
			        textAlign: "left",
			        color: "#EBF0FA",
			        padding: "0px",
			        marginLeft: "8px",
			        textShadow: "2px 2px black",
			        zIndex: "+2"
			    },
			    h2_b: {
			    	position: "absolute",
			    	marginTop: "-80px",
			    	fontSize: "28px",
			        textAlign: "left",
			        color: "#EBF0FA",
			        padding: "0px",
			        marginLeft: "8px",
			        textShadow: "2px 2px black",
			        zIndex: "+2"
			    },
			    back1: {
				    width: "100%",
				    zIndex: "+1"
		    	}
			},
			panel2: {
			    position: "relative",
			    backgroundColor: "#EBF0FA",
			    h1: {
			        textAlign: "center",
			        padding: "60px"   
			    },
			    h2: {
			        textAlign: "center",
			        padding: "20px"
			    },
			    p: {
			        textAlign: "center",
			        marginBottom: "80px"
			    },
			    ul: {
			        textAlign: "center"
			    },
			    p2Logo: {
			        display: "block",
			        marginRight: "auto",
			        marginLeft: "auto",
			        height: "100px"
			    }
			},
			panel3: {
			    position: "relative",
			    backgroundColor: "#0A0B0F",
			    img: {
			        zIndex: "+1",
			        width: "100%"
			    },
			    h1: {
			        position: "absolute",
			        zIndex: "+2",
			        padding: "5px",
			        marginTop: "-130px",
			        textAlign: "center",
			        width: "100%"
			    }
			},
			bottomPanel: {
			    position: "relative",
			    backgroundColor: "#00334C",
			    h1: {
			        textAlign: "center",
			        color: "#EBF0FA"
			    },
			    h5: {
			        textAlign: "center",
			        padding: "25px",
			        color: "#EBF0FA"
			    }
			},
			getInTouch: {
				fontSize: "28px",
			    backgroundColor: "#0A0B0F",
			    color: "#008cba",
			    border: "4px solid #008cba"
			}/*,
			input: {
			    padding: "5px",
			    marginTop: "5px",
			    marginLeft: "10px",
			    backgroundColor: "#EBF0FA",
			    border: "2px ridge #B8B8B8"
			}, 
			textarea: {
			    padding: "5px",
			    marginTop: "5px",
			    marginLeft: "10px",
			    backgroundColor: "#EBF0FA",
			    border: "2px ridge #B8B8B8"
			},
			modalHeader: {
			    backgroundColor: "#EBF0FA",
			    h3: {
			    	padding: "10px"
			    }
			},
			modalBody: {
			    backgroundColor: "#EBF0FA"
			},
			submitButton: {
				marginTop: "5px",
				marginLeft: "10px",
				padding: "5px"
			},
			closeButton: {
				padding: "5px"
			}*/
		};
	}
} ());

const FractalTech = React.createClass({
	render() {
    return(
    	<div className="container-fluid">
		    <div className="row topPanel" style={styles.topPanel}>
		      <div className="col-md-3 col-md-offset-1 col-xs-3 col-xs-offset-1">
		        <img src="img/logo.png" className="logo" style={styles.topPanel.img}/>
		      </div>
		      <div className="col-md-2 col-md-offset-6 col-xs-6 col-xs-offset-2">
		        <h3 style={styles.topPanel.h3}>
		          <button type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
		            Contact us
		          </button>
		        </h3>
		      </div>
		    </div>
		    <div className="row panel1 img-height-1" style={styles.panel1}>
		      <img src="img/back-1.jpg" className="back1" style={styles.panel1.back1}/>
		      <h1 style={styles.panel1.h1}>Fractaltech Solutions</h1>
		      <h2 style={styles.panel1.h2_a}>Let us worry about your technology</h2>
		      <h2 style={styles.panel1.h2_b}>so you can focus on your business</h2>
		    </div>
	        <div className="row panel2" style={styles.panel2}>
		      <h1 style={styles.panel2.h1}>What we do</h1>
		      <div className="col-md-4 p2-left">
		        <img src="img/icon-2.gif" className="p2Logo" style={styles.panel2.p2Logo}/>
		        <h2 style={styles.panel2.h2}>Custom Application Development</h2>
		        <p style={styles.panel2.p}>Desktop application development<br/>
		           Web development<br/>
		           Mobile application development
		        </p>
		      </div>
		      <div className="col-md-4 p2-middle">
		        <img src="img/icon-4.png" className="p2Logo" style={styles.panel2.p2Logo}/>
		        <h2 style={styles.panel2.h2}>Outsourced Product Development</h2>
		        <p style={styles.panel2.p}>Full cycle product development<br/>
		           Software customization<br/>
		           Independent testing services<br/>
		           Maintenance and support
		        </p>
		      </div>
		      <div className="col-md-4 p2-right">
		        <img src="img/icon-1.png" className="p2Logo" style={styles.panel2.p2Logo}/>
		        <h2 style={styles.panel2.h2}>How It Works<br/><br/></h2>
		        <p style={styles.panel2.p}>Just pick a plan that best fits your needs and budget and explain your issue to us. Our awsome tech guys will then start resolving your issue(s). It’s really that simple.</p>
		      </div>
		    </div>
	        <div className="row panel3 img-height-2" style={styles.panel3}>
		      <img src="img/back-2.png" className="back2" style={styles.panel3.img}/>
		      <div className="col-md-4 col-md-offset-4">
		        <h1  style={styles.panel3.h1}>
		          <button type="button" id="getInTouch" className="btn btn-primary btn-lg" style={styles.getInTouch} data-toggle="modal" data-target="#myModal">
		            Get in touch
		          </button>
		        </h1>
		      </div>
		    </div>
		    <div className="row bottomPanel" style={styles.bottomPanel}>
		      <div className="col-md-2 col-md-offset-1">
		        <h1 style={styles.bottomPanel.h1}>Fractaltech</h1>
		      </div>
		      <div className="col-md-6">
		        <h5 style={styles.bottomPanel.h5}>
		          Be sure to visit us at <a href="https://github.com/fractaltech">Github</a>
		        </h5>
		      </div>
		      <div className="col-md-3">
		        <h5 style={styles.bottomPanel.h5}>Gurgaon, India</h5>
		      </div>
		    </div>
		</div>
    );
  }
});
ReactDOM.render(<FractalTech />, document.querySelector('main'));