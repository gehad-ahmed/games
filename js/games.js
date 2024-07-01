

// GAMES FILE

class games {
  arrData = [];
  apiUrl = "https://www.freetogame.com/api/games";
  constructor() {
    this.fetchGames();
    this.filtering();
    this.displayData();
  }
  async fetchGames() {
    try {
      let data = await fetch(this.apiUrl);
      this.gameList = await data.json();
      if (data.ok) {
        this.arrData = this.gameList;
        
      }
    } catch (err) {
      this.error = err.message;
    }
  }
  displayData() {
    return this.arrData
      .map((ele) => {
        return `
                 <div onclick="test(${ele.id})" class="col-md-6 col-lg-4">
                   <div class="card" id="card">
                     <img src="${ele.thumbnail}" class="card-img-top" alt="" id="cardImg">
                     <div class="card-body text-white p-0">
                       <div class="card-content d-flex justify-content-between py-2 px-3 ">
                         <span id="cardTitle">${ele.title}</span>
                         <span class="free">Free</span>
                       </div>
                       <p class="card-text text-center px-4 text-white-50" id="cardText">${ele.short_description} </p>
                       <div class="card-footer py-2 px-3 d-flex justify-content-between ">
                         <span class="" id="cardCat">${ele.genre}</span>
                         <span class="" id="cardPlatform">${ele.platform}</span>
                         <span class="" id="cardPlatform">${ele.id}</span>
                         
                       </div>

                     </div>
                   </div>
                 </div>
         `;
      
      })
      .join("");
  }
  async filtering() {
    try {
      let navLinks = document.querySelectorAll(".nav-link");
      navLinks.forEach((ele) => {
        ele.addEventListener("click", async (e)=> {
          this.apiUrlLinks = `https://www.freetogame.com/api/games?category=${e.target.innerHTML}`;
          let data = await fetch(this.apiUrlLinks);
          this.response = await data.json();
          if (data.ok) {
            this.arrData = this.response;
            document.querySelector(".games .container .row").innerHTML = this.displayData();
          }
        });
      });
    } catch (error) {
      this.error = error.message;
    }
  }
}

async function main() {
  let game = new games();
  await game.fetchGames();
  document.querySelector(".games .container .row").innerHTML = game.displayData();
}
function test(params) {
    // console.log("test " ,params);
    window.open(`details.html?variable=${params}`, "_self");
}

main();