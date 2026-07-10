document.addEventListener("DOMContentLoaded", function () {
  // Page has finished loading.
  loadLayoutByPetraPixel();
  async function fetchLatestAnnouncement()
  {
    fetch('https://api.beyerhack.club/website/announcement')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        document.getElementById("announcement").innerHTML = JSON.parse(JSON.stringify(data)).Announcement;
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }
  fetchLatestAnnouncement();
    async function fetchLatestMeeting()
  {
    fetch('https://api.beyerhack.club/website/meeting')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        document.getElementById("meeting").innerHTML = JSON.parse(JSON.stringify(data)).Meeting;
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }
  fetchLatestMeeting();
})


function loadLayoutByPetraPixel() {
  const mainEl = document.querySelector("main");
  if (!mainEl) return;
  mainEl.insertAdjacentHTML("beforebegin", headerHTML());
  mainEl.insertAdjacentHTML("afterend", footerHTML());
  giveActiveClassToCurrentPage();
}

const nesting = getNesting();

function headerHTML() {

  return `
  
      <!-- =============================================== -->
      <!-- HEADER -->
      <!-- =============================================== -->

      <header>
<div class="header-image">
          <img src="https://s3.beyerhack.club/logos/raster/banner.png" alt="" />
        </div>
        <div class="header-content">
	        <div class="header-title">Beyer Hack Club</div>
	        
	        <!-- NAVIGATION -->
	        <nav>
	          <ul>
	            <li><a href="/">Home</a></li>
	            <li><a href="/coming-soon">Meeting Logs</a></li>
	            <li><a href="https://hcb.hackclub.com/donations/start/beyer-hack-club">Donate</a></li>
	            <li>
	                <strong>Socials (hover to show)</strong>
	                <ul>
	                  <li><a href="/coming-soon">Instagram</a></li>
	                  <li><a href="/coming-soon">Facebook</a></li>
	                </ul>
	            </li>
	          </ul>
	        </nav>
        	
        </div>
      </header>

	  
	
	  
      <!-- =============================================== -->
      <!-- RIGHT SIDEBAR -->
      <!-- =============================================== -->

      <aside class="right-sidebar">
	  
        
        <div class="sidebar-section">
          <div class="sidebar-title">Latest Announcement</div>
          <p id="announcement">There are no new announcements!</p>
        </div>
        
        <div class="sidebar-section">
          <div class="sidebar-title">Next Meeting</div>
          <blockquote>
            <p id="meeting">The latest meeting date isn't set!</p>
          </blockquote>
        </div>
        
        <div class="sidebar-section">
          <div class="sidebar-title">Skills Taught</div>
          <ul>
            <li>Coding</li>
            <li>Game Development</li>
            <li>3D Modeling</li>
            <li>Hardware</li>
          </ul>
        </div>
      </aside>
      `;
}

function footerHTML() {

  return `


      <!-- =============================================== -->
      <!-- FOOTER -->
      <!-- =============================================== -->

      <footer>
            <div>©2026 Beyer Hack Club.</div>
      </footer>`;
}


function giveActiveClassToCurrentPage() {
  const els = document.querySelectorAll("nav a");
  [...els].forEach((el) => {
    const href = el.getAttribute("href").replace(".html", "").replace("#", "");
    const pathname = window.location.pathname.replace("/public/", "");
    const currentHref = window.location.href.replace(".html", "") + "END";

	/* Homepage */
    if (href == "/" || href == "/index.html") {
      if (pathname == "/") {
        el.classList.add("active");
      }
    } else {
      /* Other pages */
      if (currentHref.includes(href + "END")) {
        el.classList.add("active");

        /* Subnavigation: */
		
        if (el.closest("details")) {
          el.closest("details").setAttribute("open", "open");
          el.closest("details").classList.add("active");
        }

        if (el.closest("ul")) {
          if (el.closest("ul").closest("ul")) {
          	el.closest("ul").closest("ul").classList.add("active");
          }
        }
      }
    }
  });
}

function getNesting() {
  const numberOfSlashes = window.location.pathname.split("/").length - 1;
  if (numberOfSlashes == 1) return "./";
  return "../".repeat(numberOfSlashes - 1);
}
