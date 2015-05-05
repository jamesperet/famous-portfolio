define(function(require, exports, module) {
    var SlideData = {
         "website-name" : "Portfolio Go",
	    "content" : [
		     { 
				"title"  : "Desenhos",
				"id"     : "1",
	    			"slides" : [
	    				"https://s3-sa-east-1.amazonaws.com/j1x/projects/portfolio-go/triptico.jpg",
					"https://s3-sa-east-1.amazonaws.com/j1x/projects/portfolio-go/A3.jpg",
					"https://s3-sa-east-1.amazonaws.com/j1x/projects/portfolio-go/escultura_01.jpg",
					"https://s3-sa-east-1.amazonaws.com/j1x/projects/portfolio-go/trifonia-01.png"
	    			]
			},
		     { 
				"title"  : "Esculturas",
				"id"     : "2",
	    			"slides" : [
					"https://s3-sa-east-1.amazonaws.com/j1x/projects/portfolio-go/escultura_01.jpg",
					"https://s3-sa-east-1.amazonaws.com/j1x/projects/portfolio-go/trifonia-01.png"
	    			]
			},
		     { 
				"title"  : "Poemas",
				"id"     : "3",
	    			"slides" : [
					"https://s3-sa-east-1.amazonaws.com/j1x/projects/portfolio-go/trifonia-01.png",
					"https://s3-sa-east-1.amazonaws.com/j1x/projects/portfolio-go/triptico.jpg",
	    			]
			},
		     { 
				"title"  : "Filmes",
				"id"     : "4",
	    			"slides" : [
					"https://s3-sa-east-1.amazonaws.com/j1x/projects/portfolio-go/trifonia-01.png",
					"https://s3-sa-east-1.amazonaws.com/j1x/projects/portfolio-go/triptico.jpg",
	    			]
			},
		     { 
				"title"  : "Fotos Contexto Humano",
				"id"     : "5",
	    			"slides" : [
					"https://s3-sa-east-1.amazonaws.com/j1x/projects/portfolio-go/trifonia-01.png",
					"https://s3-sa-east-1.amazonaws.com/j1x/projects/portfolio-go/triptico.jpg",
	    			]
			},
		     { 
				"title"  : "Textos Críticos",
				"id"     : "6",
	    			"slides" : [
					"https://s3-sa-east-1.amazonaws.com/j1x/projects/portfolio-go/trifonia-01.png",
					"https://s3-sa-east-1.amazonaws.com/j1x/projects/portfolio-go/triptico.jpg",
	    			]
			},
		     { 
				"title"  : "Currículo",
				"id"     : "7",
	    			"slides" : [
					"https://s3-sa-east-1.amazonaws.com/j1x/projects/portfolio-go/trifonia-01.png",
					"https://s3-sa-east-1.amazonaws.com/j1x/projects/portfolio-go/triptico.jpg",
	    			]
			}
	    ],
	    "navigation" : [
		    {
			    	"title"  : "Desenhos",
				"type"   : "sub-nav",
			     "id"     : "101",
				"navigation" : [
					{
			    			"title"  : "Caligramas",
						"type"   : "content",
						"id"     : "1"
					},
					{
			    			"title"  : "Figuras",
						"type"   : "content",
						"id"     : "2"
					},
					{
			    			"title"  : "Cadernos",
						"type"   : "content",
						"id"     : "3"
					}
				]
		    },
		    {
		    		"title"  : "Esculturas",
				"type"   : "sub-nav",
			     "id"     : "102",
				"navigation" : [
					{
			    			"title"  : "Carvão & Tule",
						"type"   : "content",
						"id"     : "1"
					},
					{
			    			"title"  : "Sono (Vidros)",
						"type"   : "content",
						"id"     : "2"
					},
					{
			    			"title"  : "Relevos",
						"type"   : "content",
						"id"     : "3"
					},
					{
			    			"title"  : "Cut-outs",
						"type"   : "content",
						"id"     : "3"
					}
				]
		    },
		    {
		    		"title"  : "Poemas",
				"type"   : "content",
			     "id"     : "5"
		    },
		    {
		    		"title"  : "Filmes",
				"type"   : "content",
			     "id"     : "6"
		    },
		    {
		    		"title"  : "Fotos",
				"type"   : "content",
			     "id"     : "7"
		    },
		    {
		    		"title"  : "Textos",
				"type"   : "content",
			     "id"     : "8"
		    },
		    {
		    		"title"  : "Currículo",
				"type"   : "content",
			     "id"     : "9"
		    }
	    ]
    };

 

    module.exports = SlideData;
});
