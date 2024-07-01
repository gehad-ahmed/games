

// DETAILS FILE

class details{
  
  arrData = [];
  constructor(){
    this.detFunc()
    this.displayCard();
        
  }
      
  async detFunc(){
    const queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let gameId = urlParams.get('variable')
    try{
     let detailsUrl=`https://www.freetogame.com/api/game?id=${gameId}`
        let data=await fetch(detailsUrl)
        this.response=await data.json()
        if (data.ok){
            this.arrData=this.response
        }
    }
       catch(error){
        this.error=error.message
       }
    }
    displayCard(){
     
     
return      `
              <div class="title d-flex justify-content-between align-items-center mb-4">
              <h2 class="">Details Game</h2>
             <i class="fa-solid fa-xmark text-white-50" onclick="test2()" id="icon"></i>
            </div>
            <div class="row">
                <div class="col-md-4 ">
                  <div class="box1 mb-4">
                    <img src="images/thumbnail.jpg" alt="" class="w-100">
                  </div>
                </div>
                <div class="col-md-8 ">
                  <div class="box2">
                    <h2>Title: ${this.arrData.title}</h2>
                    <p>Category:<span>${this.arrData.genre}</span></p>
                    <p>Platform:<span>${this.arrData.platform}</span></p>
                    <p>Status:<span>${this.arrData.status}</span></p>
                    <div class="text">
                      <p>
                     ${this.arrData.description}
                      </p>
                    
                    </div>
                    <div class="btn-show">
                      <button>Show Game</button>
                    </div>
                  </div>
                
                 
                </div>
            </div>
            `
      
    }
}

async function main(){
  
    let firstDet=new details;
    await firstDet.detFunc()
    
    document.querySelector(".details .container").innerHTML=firstDet.displayCard()
}

main()

function test2(params) {
  
  window.location.href="index.html"
}