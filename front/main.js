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
        content: `
                <div class="portfolio">
            <div class="portfolio-col">
                <img class="animate__animated animate__zoomIn animate__slow"
                    src="https://i.pinimg.com/originals/19/00/eb/1900eb0d770b7e56b36146d1f409763c.png">
                <img class="animate__animated animate__zoomIn animate__slow"
                    src="https://i.pinimg.com/originals/bd/aa/f2/bdaaf21dd82149113f6ca18927db6d18.jpg">
                <img class="animate__animated animate__zoomIn animate__slow"
                    src="https://i.pinimg.com/originals/20/b8/df/20b8df6bf20e0315a50c3636b2169ead.jpg">
                <img class="animate__animated animate__zoomIn animate__slow"
                    src="https://i.pinimg.com/originals/74/65/df/7465df8ffd23328a927b19ee2035d42b.jpg">
                <img class="animate__animated animate__zoomIn animate__slow"
                    src="https://i.pinimg.com/originals/a2/4c/49/a24c49a3a0ed4fb5dc596e64d82dcbbe.jpg">
                <img class="animate__animated animate__zoomIn animate__slow"
                    src="https://i.pinimg.com/originals/4f/09/8d/4f098d82da22f40011051a549048db50.jpg">
                <img class="animate__animated animate__zoomIn animate__slow"
                    src="https://i.pinimg.com/originals/ef/83/a5/ef83a5d85606e3a976a595c42c750c70.jpg">
                <img class="animate__animated animate__zoomIn animate__slow"
                    src="https://i.pinimg.com/originals/6e/f8/73/6ef873beabee27781bb92f9b527f73be.jpg">
                <img class="animate__animated animate__zoomIn animate__slow"
                    src="https://i.pinimg.com/originals/02/38/bb/0238bb3460aeb739129168396d7c9521.jpg">
                <!-- <img  class="animate__animated animate__zoomIn animate__slow" src=""> -->
            </div>
    
            <div class="portfolio-col">
                <img class="animate__animated animate__zoomIn animate__slow"
                    src="https://i.pinimg.com/originals/9e/a9/1a/9ea91ab110bbf8553545855d49dda4ed.jpg">
                <img class="animate__animated animate__zoomIn animate__slow"
                    src="https://i.pinimg.com/originals/a6/d8/2d/a6d82d8d62ae9fa19e57bad6860c3e48.jpg">
                <img class="animate__animated animate__zoomIn animate__slow"
                    src="https://i.pinimg.com/originals/0e/c1/3d/0ec13d11b813214348d61ae485943491.jpg">
                <img class="animate__animated animate__zoomIn animate__slow"
                    src="https://i.pinimg.com/originals/3a/6f/6f/3a6f6f708f91c34570f1d3a7d2b52702.png">
                <img class="animate__animated animate__zoomIn animate__slow"
                    src="https://i.pinimg.com/originals/e1/b4/76/e1b4761f4f7ec5995ba36c52777c8324.jpg">
                <img class="animate__animated animate__zoomIn animate__slow"
                    src="https://i.pinimg.com/originals/cd/e4/c6/cde4c6be8739bb086b76544207891af4.jpg">
                <img class="animate__animated animate__zoomIn animate__slow"
                    src="https://i.pinimg.com/originals/59/1c/2c/591c2c3482ce49e00d7aa5f20aa51154.jpg">
                <img class="animate__animated animate__zoomIn animate__slow"
                    src="https://i.pinimg.com/originals/f4/5a/15/f45a1598d98f0e8b20be709399b91baa.jpg">
                <img class="animate__animated animate__zoomIn animate__slow"
                    src="https://i.pinimg.com/originals/29/fa/96/29fa96794c3d9c8d5fd338df67739f41.jpg">
            </div>
    
            <div class="portfolio-col">
                <img class="animate__animated animate__zoomIn animate__slow"
                    src="https://i.pinimg.com/originals/4c/bf/5e/4cbf5e0be3409f72360c461457ffb847.png">
                <img class="animate__animated animate__zoomIn animate__slow"
                    src="https://i.pinimg.com/originals/01/6b/0c/016b0cb3550f48eb2a3594ab8295122f.jpg">
                <img class="animate__animated animate__zoomIn animate__slow"
                    src="https://i.pinimg.com/originals/da/74/1b/da741b81e00307171a88acd01e416ddf.jpg">
                <img class="animate__animated animate__zoomIn animate__slow"
                    src="https://i.pinimg.com/originals/08/75/fb/0875fbbffc1cfd2e7ffb6da8452683d2.png">
                <img class="animate__animated animate__zoomIn animate__slow"
                    src="https://i.pinimg.com/originals/a2/65/e6/a265e6c0819c7c4353d824021e3b65e5.jpg">
                <img class="animate__animated animate__zoomIn animate__slow"
                    src="https://i.pinimg.com/originals/a2/54/b7/a254b759c57ad08ab957a7140c3d311f.jpg">
                <img class="animate__animated animate__zoomIn animate__slow"
                    src="https://i.pinimg.com/originals/d5/b4/08/d5b408593b7ac8d8fa71129381c3679e.jpg">
                <img class="animate__animated animate__zoomIn animate__slow"
                    src="https://i.pinimg.com/originals/d0/0e/aa/d00eaa4a62823c13ef1afe83818e700d.jpg">
            </div>
        </div>`
    }
];

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