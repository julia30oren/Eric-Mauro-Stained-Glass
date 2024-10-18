const localhost = 'http://localhost:3000';
let portfolio;

let page = "about";
let current_content;
let div = document.getElementById("first-d");
var topPos = div.offsetTop;
var nav_l = document.getElementsByClassName('nav-link');

let p_content = [
    {
        page: `about`,
        content: `
            <div class="eric">
                <img class="animate__animated animate__zoomIn animate__slow" src="./assets/eric.jpg">
                <div>
                    <h2>Eric&nbsp;Mauro Stained & Leaded Glass</h2>
                    <div> repair / restoration / fused glass / custom design</div>
                </div>
            </div>

            <p class="mrg-t-50">Stained and leaded glass is a timeless and captivating form of art. The use of stained glass windows has been documented in British monasteries as early as the 7th century. </p>

            <p>Stained glass is commonly associated with colorful windows in churches and cathedrals, but it can be used as a decorative touch to any building. The art of using stained glass to create intricate images or to
                convey a narrative has been a cherished tradition for centuries. This ancient artistic technique involves arranging colored glass pieces to form decorative designs, scenes, or symbols, often found in religious
                spaces, historical buildings, and works of art. The vibrant and translucent qualities of stained glass have captivated people throughout history, serving as a timeless medium for storytelling and visual expression. </p>

            <p>These examples showcase the diverse range of original work we have meticulously crafted, demonstrating Eric Mauro Art Studio proficiency in various artistic styles and techniques.</p>
                            
            <div class="QandA QandA-1 mrg-t-100">
                <div class="question">
                    <h2>Frequently Asked Questions:</h2>
                </div>
            </div>

            <div class="QandA QandA-2">
                <div class="question">
                    <p>Q: How does stained or leaded glass work?</p>
                    <p>A: The glass is cut into pieces which fit together like a puzzle. The pieces are held in place by a framework of lead strips. We solder the lead together and then use a gray putty to insulate and add
                        strength to the structure.</p>
                </div>
            </div>
            
            <div class="QandA QandA-3">
                <div class="question">
                    <p>Q: What happens to a leaded glass window and why do I need to fix it?</p>
                    <p>A: Leaded glass windows can experience catastrophic breakage from balls, hailstones, movers and so on. But even if they manage to escape those, time and the elements do have an effect that requires
                        maintenance. The most frequent damage we see is simply aging and drying of the putty, which leads to a weakened structure, deterioration of the lead, and eventual slumping and breakage in the window.
                    </p>
                </div>
            </div>

            <div class="QandA QandA-4">
                <div class="question">
                    <p>Q: What can be done to fix it?</p>
                    <p>A: Options range from repair of the broken pieces and reconnection of broken lead to full cleaning and replacement of the old lead with all new.</p>
                </div>
            </div>

            <div class="QandA QandA-5">
                <div class="question">
                    <p>Q: Can you fix a break on-site? Can you put glass back together that has been broken?</p>
                    <p>A: Small repairs can be made on-site. The process is improvised and not ideal for making large repairs, but can usually work for one pane here and there. There are techniques for covering up some
                        cracks, but we try and make the design close to the original concept, which usually means replacing broken
                        pieces with new glass cut to fit. Glass cannot be fused or melted back together in any way that is useful for repairs.</p>
                </div>
            </div>

            <div class="QandA QandA-6">
                <div class="question">
                    <p>Q: Can you replace any piece of broken glass with the same colors and patterns?</p>
                    <p>A: We do our best to find a decent match, however the number and variety of manufacturers of art glass are only a small fraction of those from the golden age of residential glass from 1875-1920. We
                        have found that the beauty of a well-designed stained glass window holds its integrity even with a variety of glass used in repairs.</p>
                </div>
            </div>

            <div class="QandA QandA-7">
                <div class="question">
                    <p>Q: What is the difference between stained and leaded glass?</p>
                    <p>A: Stained glass is painted and fired in a kiln to incorporate different colors and designs. Leaded glass just refers to the fact that the pieces are held together in a lead framework.</p>
                </div>
            </div>

            <div class="QandA QandA-8">
                <div class="question">
                    <p>Q: How much does it cost?</p>
                    <p>A: Price depends on the amount of damage, installation and removal, and the extent of repairs the client requests. One thing to keep in mind is that a leaded glass window is a delicate antique that
                        takes 100% hand restoration at every stage. Prices for repair can start at $150/square foot, and for new construction can reach $600-$700/square foot for the most labor intensive designs, difficult
                        installations and painted windows.</p>
                </div>
            </div>`
    },
    {
        page: `portfolio`,
        content: ``
    }
];

function loadHTMLportfolio() {
    var port = `<div class="portfolio" id="portfolio-div">`;

    if (screen.width < 768) {
        let portfolio_div1_Html = `<div class="portfolio-col">`;
        let portfolio_div2_Html = `<div class="portfolio-col">`;
        for (i = 0; i < portfolio.length; i++) {
            if (i % 2 === 1) {
                portfolio_div1_Html += `<div class="animate__animated animate__zoomIn animate__slow Portfolio-IMG">`;
                portfolio_div1_Html += `<img src="${portfolio[i].url}" class="" alt="${portfolio[i].title ? portfolio[i].title : ''}">`;
                portfolio_div1_Html += `<h3>${portfolio[i].title ? portfolio[i].title : ''}</h3>`;
                portfolio_div1_Html += `<small>${portfolio[i].description ? portfolio[i].description : ''}</small>`;
                portfolio_div1_Html += `</div>`;
            } else {
                portfolio_div2_Html += `<div class="animate__animated animate__zoomIn animate__slow Portfolio-IMG">`;
                portfolio_div2_Html += `<img src="${portfolio[i].url}" class="" alt="${portfolio[i].title ? portfolio[i].title : ''}">`;
                portfolio_div2_Html += `<h3>${portfolio[i].title ? portfolio[i].title : ''}</h3>`;
                portfolio_div2_Html += `<small>${portfolio[i].description ? portfolio[i].description : ''}</small>`;
                portfolio_div2_Html += `</div>`;
            }
        }
        portfolio_div1_Html += `</div>`;
        portfolio_div2_Html += `</div>`;

        port += portfolio_div1_Html + portfolio_div2_Html;
    }
    else {
        let portfolio_div1_Html = `<div class="portfolio-col">`;
        let portfolio_div2_Html = `<div class="portfolio-col">`;
        let portfolio_div3_Html = `<div class="portfolio-col">`;
        for (i = 0; i < portfolio.length; i++) {
            if (i % 3 == 0) { //every 3rd element
                portfolio_div2_Html += `<div class="animate__animated animate__zoomIn animate__slow Portfolio-IMG">`;
                portfolio_div2_Html += `<img src="${portfolio[i].url}" class="" alt="${portfolio[i].title ? portfolio[i].title : ''}">`;
                portfolio_div2_Html += `<h3>${portfolio[i].title ? portfolio[i].title : ''}</h3>`;
                portfolio_div2_Html += `<small>${portfolio[i].description ? portfolio[i].description : ''}</small>`;
                portfolio_div2_Html += `</div>`;
            }
            else if ((i + 1) % 3 == 0) { //every 2nd element
                portfolio_div3_Html += `<div class="animate__animated animate__zoomIn animate__slow Portfolio-IMG">`;
                portfolio_div3_Html += `<img src="${portfolio[i].url}" class="" alt="${portfolio[i].title ? portfolio[i].title : ''}">`;
                portfolio_div3_Html += `<h3>${portfolio[i].title ? portfolio[i].title : ''}</h3>`;
                portfolio_div3_Html += `<small>${portfolio[i].description ? portfolio[i].description : ''}</small>`;
                portfolio_div3_Html += `</div>`;
            }
            else {
                portfolio_div1_Html += `<div class="animate__animated animate__zoomIn animate__slow Portfolio-IMG">`;
                portfolio_div1_Html += `<img src="${portfolio[i].url}" class="" alt="${portfolio[i].title ? portfolio[i].title : ''}">`;
                portfolio_div1_Html += `<h3>${portfolio[i].title ? portfolio[i].title : ''}</h3>`;
                portfolio_div1_Html += `<small>${portfolio[i].description ? portfolio[i].description : ''}</small>`;
                portfolio_div1_Html += `</div>`;
            }
        }
        portfolio_div1_Html += `</div>`;
        portfolio_div2_Html += `</div>`;
        portfolio_div3_Html += `</div>`;

        port += portfolio_div1_Html + portfolio_div2_Html + portfolio_div3_Html;
    }
    port += `</div>`;

    p_content.forEach(element => {
        if (element.page === 'portfolio') element.content = port;
    });
};

document.addEventListener('DOMContentLoaded', () => {
    if (!portfolio) {
        fetch(localhost + '/getall')
            .then(res => res.json())
            .then(data => {
                portfolio = data['data'];
                loadHTMLportfolio();
            });
    }
});

div.innerHTML = p_content[0].content;

function getnewContent() {
    p_content.forEach(element => {
        if (element.page === page) {
            current_content = element.content;
            div.innerHTML = current_content;
        }
    });
}

function pageChange(new_page) {
    new_page = new_page.toLowerCase();
    if (new_page && page !== new_page) {
        page = new_page;

        for (i = 0; i < nav_l.length; i++) {
            if (nav_l[i].innerText.toLowerCase() !== new_page.toLowerCase()) {
                nav_l[i].classList.remove('active');
            } else nav_l[i].classList.add('active');
        }

        getnewContent();
        window.scrollTo({ top: (topPos - 100), behavior: 'smooth' });
    }
}