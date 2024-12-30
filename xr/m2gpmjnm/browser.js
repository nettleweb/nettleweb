 /*
 Hello, random person looking through this source code.
I'm Cadecraft (find me at https://www.youtube.com/c/AwesomeCadecraft
or https://cadecraft.github.io
or my discord server https://discord.gg/wahdQHBs4Z )

How's your day been?
Mine was good, ty for asking.

Oh btw you should check out this link https://www.youtube.com/watch?v=dQw4w9WgXcQ



Wondering how I made this browser?
I used Chrome Apps (documentation: https://developer.chrome.com/docs/apps/manifest/ )
This was originally based off of the original Obscure 4 browser, so thanks a lot to m.boswell522 who made it.
You have my permission to modify this however you want to account for any new blocks your school/organization imposes.

Wanna know why it is called the Voltaire browser? (hint: i took AP euro)

- Cadecraft 2022/8/26

*/

/*
CHANGELOG
To add:
  THIS VERSION
  > None
  UPCOMING
  > Save cookies ( https://stackoverflow.com/questions/23684583/how-to-keep-cookies-with-webview-based-chrome-hosted-app )
                 ( https://stackoverflow.com/questions/25697697/what-is-partition-attribute-for-webview-tag-in-chrome-app-api )
  > Add background requests (morning star)
  > Improve unblocked discord further (use faster proxy service) ?
  > CTRL+F search (bottom right inspect button)
  > Adblock (similar method as fullscreen?)
  > ctrl+t/ctrl+w suppport, even in webview ?
  > Mouse pointer lock (for remote desktop games)
  > Make zoom in/out work like normal, rather than scaling the window
  > Make tabs show page titles?
  > Picture in picture
  > Flash player

To test:
  > Microphone permissions ?

Promotion:
  > Continue to share the browser publicly
  > Eventually publish on chrome web store
  > Publish as GitHub release

Recently added:
  --0.0.9.8
  > Added link to GitHub repo
  > Added new help image for clarity
  > Fully removed menu box overlap for all boxes, including "help" and "discal"
  > Updated link to head to my new website

  --0.0.9.7
  > Improved background selections (replaced one bg request, replaced one existing img bg)
  > Added microphone permissions
  > Improved efficacy of Discord unblocking system
  > UI improve and polish (fixed bugs, updated layout)

  --0.0.9.6
  > Updated manifest (migration to v3)
  > Removed usage form link
  > Added a confirmation prompt to the "reset data" button
  > New background requests (tivect, LiWOl)
  > Removed an outdated/unused .psd file, reducing overall file size

  --0.0.9.4
  > FIXED fullscreen/download perms on newly created tabs
  > Added dino game
  > Added Windows XP Wallpaper
  > Added usage form link
  > Changed discord server link - goes directly, not through croxyproxy
  > UI improve (removed useless croxyproxy link)
  > UI improve (tab styling)
  > UI improve (tab names)
  > UI improve (hover cursor)

  --0.0.9.2
  > CRUCIAL bug fix: new tabs properly load websites

  --0.0.9.1
  > Fixed status bar position
  > Fixed default homepage and fullscreen/download perms on newly created tabs
  > Had a crucial bug

  --0.0.9
  > Fullscreen permissions
  > Download permissions
  > Zooming and panning the page view
  > Bookmark naming

  --0.0.8
  > Bookmarks
  > Help menu
  > UI improvements
  > Unblocked discord!
  > Unblocked discord server join link
  > Added discord warning
*/

var globhomepg = 'https://google.com';
var bkmlist = [];
var bgsel = 0;
var zoom = 1;
var panx = 0;
var pany = 0;
var dinoactive = false;
var userKnowsSecret = false;
var bgs = [
  {
    'name': 'Default Dark',
    'type': 'color',
    'src': 'none',
    'color': '#505a64',
    'imgsize': 0,
    'pixel': false
  },
  {
    'name': 'Default Blue',
    'type': 'color',
    'src': 'none',
    'color': '#006abc',
    'imgsize': 0,
    'pixel': false
  },
  {
    'name': 'Cityscape',
    'type': 'img',
    'src': 'images/bg-cityscape.png',
    'color': 'transparent',
    'imgsize': 200,
    'pixel': true
  },
  {
    'name': 'Mountain',
    'type': 'img',
    'src': 'images/bg-mountain.png',
    'color': 'transparent',
    'imgsize': 500,
    'pixel': true
  },
  /*{
    'name': 'Leaves',
    'type': 'img',
    'src': 'images/bg-leaves.png',
    'color': 'transparent',
    'imgsize': 500,
    'pixel': true
  },*/
  {
    'name': 'Pixel blue',
    'type': 'img',
    'src': 'images/bg-pixsand.png',
    'color': 'transparent',
    'imgsize': 800,
    'pixel': true
  },
  {
    'name': 'Pixel cherry blossom',
    'type': 'img',
    'src': 'images/bg-pixtree2.png',
    'color': 'transparent',
    'imgsize': 800,
    'pixel': true
  },
  {
    'name': 'Gradient Blue',
    'type': 'img',
    'src': 'images/bg-grad.png',
    'color': 'transparent',
    'imgsize': 1200,
    'pixel': true
  },
  {
    'name': 'Color: White',
    'type': 'color',
    'src': 'none',
    'color': '#c1d6e3',
    'imgsize': 0,
    'pixel': false
  },
  {
    'name': 'Color: Pure White',
    'type': 'color',
    'src': 'none',
    'color': '#ffffff',
    'imgsize': 0,
    'pixel': false
  },
  {
    'name': 'Color: Black',
    'type': 'color',
    'src': 'none',
    'color': '#0f1317',
    'imgsize': 0,
    'pixel': false
  },
  {
    'name': 'Color: Pure Black',
    'type': 'color',
    'src': 'none',
    'color': '#000000',
    'imgsize': 0,
    'pixel': false
  },
  {
    'name': 'Color: Blend',
    'type': 'color',
    'src': 'none',
    'color': '#1e252c',
    'imgsize': 0,
    'pixel': false
  },
  {
    'name': 'Color: Green',
    'type': 'color',
    'src': 'none',
    'color': '#38a115',
    'imgsize': 0,
    'pixel': false
  },
  {
    'name': 'Request: Windows XP Wallpaper',
    'type': 'img',
    'src': 'images/bg-winxp.png',
    'color': 'transparent',
    'imgsize': 550,
    'pixel': true
  },
  {
    'name': 'Request: Yoimiya',
    'type': 'img',
    'src': 'images/bg-yoi.png',
    'color': 'transparent',
    'imgsize': 550,
    'pixel': true
  },
  {
    'name': 'Request: Tetrome',
    'type': 'img',
    'src': 'images/bg-tetr.png',
    'color': 'transparent',
    'imgsize': 400,
    'pixel': true
  },
  {
    'name': 'Request: LiWOl',
    'type': 'img',
    'src': 'images/bg-liwol.png',
    'color': 'transparent',
    'imgsize': 730,
    'pixel': true
  }
];

// Set status
function setstat(innew) {
  document.getElementById('status').innerText = 'Status: '+innew;
  console.log('Status set: '+innew);
}

var keys = {};

// Update bg
function updatebg() {
  try {
    var bgselitem = bgs[bgsel];
    document.getElementById('tab-controls').style.backgroundColor = bgselitem.color;
    if(bgselitem.src == 'none') {
      document.getElementById('tab-controls').style.backgroundImage = 'none';
    }
    else {
      document.getElementById('tab-controls').style.backgroundImage = 'url(\''+bgselitem.src+'\')';
    }
    document.getElementById('tab-controls').style.backgroundSize = bgselitem.imgsize+'px';
    // Set bg of name+info to dark if non-default bg (to avoid unreadable text)
    if(bgsel == 0) {
      document.getElementById('br-name').style.backgroundColor = 'transparent';
    }
    else {
      document.getElementById('br-name').style.backgroundColor = 'rgb(0,0,0,0.7)';
    }
  }
  catch(err) {
    // Error
    setstat('err updating bg image/color');
  }
  // Update in storage
  try {
    chrome.storage.local.set({savebgsel: bgsel}, function() {
      // savebgsel set successfully
    });
  }
  catch(err) {
    // Error
    setstat('err setting local bgsel storage val');
  }
}

// Update bkms
function updatebkms() {
  try {
    while(document.getElementById('bkmlistbox').firstChild) {
      document.getElementById('bkmlistbox').removeChild(document.getElementById('bkmlistbox').firstChild);
    }
    for(let i = 0; i < bkmlist.length; i++) {
      let thisi = i;
      var trimmed = '';
      if(bkmlist[i].length >= 32) { trimmed = '...' }
      var thisspan = document.createElement('span');
      // Set inner HTML
      thisspan.innerHTML = '&nbsp;<button id="bkmx-'+thisi+'">X</button>&nbsp;&nbsp;&nbsp;<a id="bkmlk-'+thisi+'">' // Link
      +bkmlist[thisi].url.substr(0, 32)+trimmed+'</a>' // Link url
      +'<input id="bkmnm-'+thisi+'" type="text" style="width:200px; float:right; height:15px;"'// Name box
      +' value="'+bkmlist[thisi].name+'" placeholder="Name this bookmark..."></input>'; // Name box name

      var thisbr = document.createElement('br');
      document.getElementById('bkmlistbox').append(thisspan);
      document.getElementById('bkmlistbox').append(thisbr);
      // On clicks
      //console.log('onclick value is = '+thisi);
      document.getElementById('bkmx-'+thisi).onclick = function() {
        // Splice
        bkmlist.splice(thisi, 1);
        updatebkms();
      }
      document.getElementById('bkmlk-'+thisi).onclick = function() {
        // Go
        document.getElementById('location').value = bkmlist[thisi].url;
        document.getElementById('gobutton').click();
        document.getElementById('bkmbox').style.display = 'none';
      }
      document.getElementById('bkmnm-'+thisi).onchange = function() {
        // Rename
        bkmlist[thisi].name = document.getElementById('bkmnm-'+thisi).value;
        updatebkms();
      }
    }
  }
  catch(err) {
    setstat('err attempting to update bkm');
  }
  // Update in storage
  try {
    chrome.storage.local.set({savebkmlist: bkmlist}, function() {
      // bkmlist set successfully
    });
  }
  catch(err) {
    // Error
    setstat('err setting local bkm storage val');
  }
}

var browser = (function(configModule, tabsModule) {
  var dce = function(str) { return document.createElement(str); };

  var Browser = function(
    controlsContainer,
    back,
    forward,
    home,
    reload,
    locationForm,
    locationBar,
    tabContainer,
    contentContainer,
    newTabElement) {
    this.controlsContainer = controlsContainer;
    this.back = back;
    this.forward = forward;
    this.reload = reload;
    this.home = home;
    this.locationForm = locationForm;
    this.locationBar = locationBar;
    this.tabContainer = tabContainer;
    this.contentContainer = contentContainer;
    this.newTabElement = newTabElement;
    this.tabs = new tabsModule.TabList(
        'tabs',
        this,
        tabContainer,
        contentContainer,
        newTabElement);

    this.init();
  };

  Browser.prototype.init = function() {
    // Get default settings from local storage
    try {
      chrome.storage.local.get(['homepg'], function(result) {
        // Obtain homepage if result is valid
        if(result.homepg != null && result.homepg.length > 0) {
          // Set homepage
          document.getElementById('def-homepg').value = result.homepg; // DBG: may have changed; try this.homepg instead of result.homepg
          globhomepg = result.homepg;
          // Navigate to homepage
          //this.tabs.selectIdx(0);
          //this.tabs.getSelected().navigateTo(globhomepg);
        }
      });
    }
    catch(err) {
      // Error
      setstat('err getting local homepg storage val');
    }
    try {
      chrome.storage.local.get(['savebkmlist'], function(result) {
        // Obtain bkm list if result is valid
        if(result.savebkmlist != null && result.savebkmlist.length > 0) {
          // Set bkm list
          for(let i = 0; i < result.savebkmlist.length; i++) {
            // In case bkms are formatted old way:
            try {
              if('name' in result.savebkmlist[i]) {
                bkmlist.push(result.savebkmlist[i]);
              }
              else {
                bkmlist.push({'url': result.savebkmlist[i], 'name': ''});
              }
            } catch(err) {
              bkmlist.push({'url': result.savebkmlist[i], 'name': ''});
            }
          }
          updatebkms();
        }
      });
    }
    catch(err) {
      // Error
      setstat('err getting local bkm storage val');
    }
    try {
      chrome.storage.local.get(['savebgsel'], function(result) {
        // Obtain bgsel if result is valid
        if(result.savebgsel != null && result.savebgsel.length > 0) {
          // Set bg sel
          bgsel = result.savebgsel;
          document.getElementById('bgSelect').selectedIndex = bgsel;
          updatebg();
        }
      })
    }
    catch(err) {
      // Error
      setstat('err getting local bgsel storage val');
    }
    try {
      chrome.storage.local.get(['savediscpermbox'], function(result) {
        // Obtain discpermbox value if result is valid
        if(result.savediscpermbox != null && result.savediscpermbox.length > 0) {
          // Set discpermbox
          document.getElementById('discpermbox').value = result.savediscpermbox;
        }
      })
    }
    catch(err) {
      // Error
      setstat('err getting local discpermbox storage val');
    }
    try {
      chrome.storage.local.get(['saveuserknows'], function(result) {
        // Obtain userknows value if result is valid
        if(result.saveuserknows != null) {
          // Set user knows
          userKnowsSecret = result.saveuserknows;
        }
      })
    }
    catch(err) {
      // Error
      console.log('err getting local userknows val');
    }

    (function(browser) {
      window.addEventListener('resize', function(e) {
        browser.doLayout(e);
      });

      window.addEventListener('keydown', function(e) {
        browser.doKeyDown(e);
      });

      browser.back.addEventListener('click', function(e) {
        browser.tabs.getSelected().goBack();
      });

      browser.forward.addEventListener('click', function() {
        browser.tabs.getSelected().goForward();
      });

      browser.home.addEventListener('click', function() {
        browser.tabs.getSelected().navigateTo('https://google.com'); // this is just search
      });
      document.getElementById('yt').addEventListener('click', function() {
        browser.tabs.getSelected().navigateTo('https://youtube.com');
      });
      document.getElementById('discord').addEventListener('click', function() {
        // Discord alert box (for croxyproxy expired link)
        document.getElementById('discalbox').style.display = 'inline';
        document.getElementById('discurl').innerText = 'discord.com/login';
        // OLD Permalink: https://104.149.146.202/__cpi.php?s=UkQ2YXlSaWJuc3ZoeGR2dG04WW9LcEFKSm41OWRnVmhzeWtkTHd0c1NmL0VualhOajhscUVMNWw3MktxWEVvVnF0WUdDbEtjQXIraXRQMDFKendkL1ljSi91OTV0eWN2cFltcjNtUVE4NjA9&r=aHR0cHM6Ly8xMDQuMTQ5LjE0Ni4yMDIvbG9naW4%2FX19jcG89YUhSMGNITTZMeTlrYVhOamIzSmtMbU52YlE%3D&__cpo=1
        // NEW Permalink: https://104.149.186.10/__cpi.php?s=UkQ2YXlSaWJuc3ZoeGR2dG04WW9LdlRIVW1qWndMZ3Bzc0h3d2VvU0dHbUpOZS9nNHErODZCb1NMU09KTy9EM3cwMEhBYmovbzFKSnBUSk5ITW80bDl6WXl2NTNVUWc2cldFWGV2cmdaaHM9&r=aHR0cHM6Ly8xMDQuMTQ5LjE4Ni4xMC9hcHA%2FX19jcG89YUhSMGNITTZMeTlrYVhOamIzSmtMbU52YlE%3D&__cpo=1
        // Proxy attempt: https://104.149.146.202/login?__cpo=aHR0cHM6Ly9kaXNjb3JkLmNvbQ
        // Orig: https://discord.com/app
        if(document.getElementById('discpermbox').value == '') {
          browser.tabs.getSelected().navigateTo('https://discord.com/'/*'https://104.149.186.10/__cpi.php?s=UkQ2YXlSaWJuc3ZoeGR2dG04WW9LdlRIVW1qWndMZ3Bzc0h3d2VvU0dHbUpOZS9nNHErODZCb1NMU09KTy9EM3cwMEhBYmovbzFKSnBUSk5ITW80bDl6WXl2NTNVUWc2cldFWGV2cmdaaHM9&r=aHR0cHM6Ly8xMDQuMTQ5LjE4Ni4xMC9hcHA%2FX19jcG89YUhSMGNITTZMeTlrYVhOamIzSmtMbU52YlE%3D&__cpo=1'*/);
        }
        else {
          browser.tabs.getSelected().navigateTo(document.getElementById('discpermbox').value);
        }
      });
      document.getElementById('remote').addEventListener('click', function() {
        browser.tabs.getSelected().navigateTo('https://remotedesktop.google.com/');
      });
      /*document.getElementById('croxy').addEventListener('click', function() {
        browser.tabs.getSelected().navigateTo('https://croxyproxy.com');
      });*/

      // Set browser name text with version (if not on chrome os version is '...') and settings menu
      var ver = '...';
      try {
        ver = chrome.runtime.getManifest().version;
      }
      catch(err) { }
      try {
        document.getElementById('br-name').innerHTML = 'VOLTAIRE BROWSER<br>v'+ver+' &#8226; <a id="mysite">My site</a>	&#8226; <a id="settings">Settings</a>	&#8226; <a id="help">Help</a>';
        // On click mysite
        document.getElementById('mysite').onclick = function() {
          browser.tabs.getSelected().navigateTo('https://cadecraft.github.io/');
        }
        // On click help
        document.getElementById('help').onclick = function() {
          // Toggle visibility of help box
          if(document.getElementById('helpbox').style.display == 'none') {
            document.getElementById('helpbox').style.display = 'inline'
            document.getElementById('settingsbox').style.display = 'none' // Hide to avoid overlap
          }
          else {
            document.getElementById('helpbox').style.display = 'none'
          }
        }
        // On click help X
        document.getElementById('helpclose').onclick = function() {
          document.getElementById('helpbox').style.display = 'none'
        }
        // On click discal X
        document.getElementById('discalclose').onclick = function() {
          document.getElementById('discalbox').style.display = 'none';
        }
        // On click settings
        document.getElementById('settings').onclick = function() {
          // Toggle visibility of settings box
          if(document.getElementById('settingsbox').style.display == 'none') {
            document.getElementById('settingsbox').style.display = 'inline'
            document.getElementById('helpbox').style.display = 'none' // Hide to avoid overlap
          }
          else {
            document.getElementById('settingsbox').style.display = 'none'
          }
        }
        // On click settings X
        document.getElementById('settingsclose').onclick = function() {
          document.getElementById('settingsbox').style.display = 'none'
        }
        // On click inspect
        document.getElementById('inspect').onclick = function() {
          // Toggle visibility of inspect box
          document.getElementById('menubox').style.display = 'none'
          document.getElementById('discalbox').style.display = 'none'
          if(document.getElementById('inspectbox').style.display == 'none') {
            document.getElementById('inspectbox').style.display = 'inline'
          }
          else {
            document.getElementById('inspectbox').style.display = 'none'
          }
        }
        // On click inspect X
        document.getElementById('inspectclose').onclick = function() {
          document.getElementById('inspectbox').style.display = 'none';
        }
        // On click bkm
        document.getElementById('bkm').onclick = function() {
          // Toggle visibility of bkm box
          if(document.getElementById('bkmbox').style.display == 'none') {
            document.getElementById('bkmbox').style.display = 'inline'
          }
          else {
            document.getElementById('bkmbox').style.display = 'none'
          }
        }
        // On click bkm X
        document.getElementById('bkmclose').onclick = function() {
          document.getElementById('bkmbox').style.display = 'none';
        }
        // On click menu
        document.getElementById('menu').onclick = function() {
          // Toggle visibility of menu box
          document.getElementById('inspectbox').style.display = 'none'
          document.getElementById('discalbox').style.display = 'none'
          if(document.getElementById('menubox').style.display == 'none') {
            document.getElementById('menubox').style.display = 'inline'
            dinoactive = true;
            document.getElementById('menu').blur();
          }
          else {
            document.getElementById('menubox').style.display = 'none'
            dinoactive = false;
          }
        }
        // On click menu X
        document.getElementById('menuclose').onclick = function() {
          document.getElementById('menubox').style.display = 'none';
          dinoactive = false;
        }
        
        // On click zoom or pan
        function updtr() { document.getElementById('content-container').style.transform = 'scaleX('+zoom+') scaleY('+zoom+') translateX('+panx+'px) translateY('+pany+'px)'; }
        document.getElementById('zoomin').onclick = function() {
          zoom += 0.2;
          if(zoom > 3) { zoom = 3; }
          updtr();
        }
        document.getElementById('zoomout').onclick = function() {
          zoom -= 0.2;
          if(zoom < 0.4) { zoom = 0.4; }
          updtr();
        }
        document.getElementById('p-u').onclick = function() { pany += 20; updtr(); }
        document.getElementById('p-d').onclick = function() { pany -= 20; updtr(); }
        document.getElementById('p-l').onclick = function() { panx += 20; updtr(); }
        document.getElementById('p-r').onclick = function() { panx -= 20; updtr(); }
        document.getElementById('p-res').onclick = function() {
          panx = 0;
          pany = 0;
          zoom = 1;
          updtr();
        }
        document.getElementById('fullscreens').onclick = function() {
          if(document.getElementById('tab-controls').style.display == 'block') {
            document.getElementById('tab-controls').style.display = 'none';
            document.getElementById('browser-controls').style.display = 'none';
          }
          else {
            document.getElementById('tab-controls').style.display = 'block';
            document.getElementById('browser-controls').style.display = 'flex';
          }
        }

        // On change inspect input
        document.getElementById('inspect-input').onchange = function() {
          var newinspin = document.getElementById('inspect-input').value;
          // Search page for new input
        }

        // On click links
        document.getElementById('lk-yt').onclick = function() {
          browser.tabs.getSelected().navigateTo('https://youtube.com/c/AwesomeCadecraft/');
        }
        document.getElementById('lk-site').onclick = function() {
          browser.tabs.getSelected().navigateTo('https://cadecraft.github.io/');
        }
        document.getElementById('lk-git-repo').onclick = function() {
          browser.tabs.getSelected().navigateTo('https://github.com/Cadecraft/voltaire-browser-source');
        }
        /*document.getElementById('lk-form').onclick = function() {
          browser.tabs.getSelected().navigateTo('https://docs.google.com/forms/d/e/1FAIpQLSf-7Cunu1xQru9nr5dMjBWrS5mqCGDrGeEyru7i-wEzEd3CeQ/viewform?usp=sf_link');
        }*/
        document.getElementById('lk-croxy').onclick = function() {
          // Whether user has found the secret or not:
          if(userKnowsSecret) {
            browser.tabs.getSelected().navigateTo('https://croxyproxy.rocks/');
          }
          else {
            //browser.tabs.getSelected().navigateTo('https://croxyproxy.com/'); // Secret abolished; always .rocks
            browser.tabs.getSelected().navigateTo('https://croxyproxy.rocks/');
          }
        }
        document.getElementById('lk-discord').onclick = function() {
          // Discord alert box (for croxyproxy expired link)
          document.getElementById('discalbox').style.display = 'inline';
          document.getElementById('discurl').innerText = 'discord.gg/wahdQHBs4Z';
          // OLD Permalink: https://104.149.146.202/__cpi.php?s=UkQ2YXlSaWJuc3ZoeGR2dG04WW9LazFkVEJsZUgxTjhMd2daaVd5VkxaNHRmL3JKaXNhWmM3VnRhSWxQK1R3SmxmaC9RbENSS0hEdmIwc1BETngrY2JqOExvanRiK3VLTGp0cFBCcXR6Wjg9&r=aHR0cHM6Ly8xMDQuMTQ5LjE0Ni4yMDIvaW52aXRlL3dhaGRRSEJzNFo%2FX19jcG89YUhSMGNITTZMeTlrYVhOamIzSmtMbU52YlE%3D&__cpo=1
          // OLD Permalink2:https://104.149.186.10/__cpi.php?s=UkQ2YXlSaWJuc3ZoeGR2dG04WW9LdlRIVW1qWndMZ3Bzc0h3d2VvU0dHbUpOZS9nNHErODZCb1NMU09KTy9EM3cwMEhBYmovbzFKSnBUSk5ITW80bDl6WXl2NTNVUWc2cldFWGV2cmdaaHM9&r=aHR0cHM6Ly8xMDQuMTQ5LjE4Ni4xMC9hcHA%2FX19jcG89YUhSMGNITTZMeTlrYVhOamIzSmtMbU52YlE%3D&__cpo=1
          // NEW Permalink: https://104.149.186.10/__cpi.php?s=UkQ2YXlSaWJuc3ZoeGR2dG04WW9LdlRIVW1qWndMZ3Bzc0h3d2VvU0dHbUpOZS9nNHErODZCb1NMU09KTy9EM3cwMEhBYmovbzFKSnBUSk5ITW80bDl6WXl2NTNVUWc2cldFWGV2cmdaaHM9&r=aHR0cHM6Ly8xMDQuMTQ5LjE4Ni4xMC9hcHA%2FX19jcG89YUhSMGNITTZMeTlrYVhOamIzSmtMbU52YlE%3D&__cpo=1
          // Orig: https://discord.gg/wahdQHBs4Z
          browser.tabs.getSelected().navigateTo('https://discord.gg/wahdQHBs4Z');
          //browser.tabs.getSelected().navigateTo('https://104.149.146.202/__cpi.php?s=UkQ2YXlSaWJuc3ZoeGR2dG04WW9LazFkVEJsZUgxTjhMd2daaVd5VkxaNHRmL3JKaXNhWmM3VnRhSWxQK1R3SmxmaC9RbENSS0hEdmIwc1BETngrY2JqOExvanRiK3VLTGp0cFBCcXR6Wjg9&r=aHR0cHM6Ly8xMDQuMTQ5LjE0Ni4yMDIvaW52aXRlL3dhaGRRSEJzNFo%2FX19jcG89YUhSMGNITTZMeTlrYVhOamIzSmtMbU52YlE%3D&__cpo=1');
        }
        document.getElementById('lk-discord2').onclick = function() {
          // Discord alert box (for croxyproxy expired link)
          document.getElementById('discalbox').style.display = 'inline';
          document.getElementById('discurl').innerText = 'discord.gg/wahdQHBs4Z';
          // OLD Permalink: https://104.149.146.202/__cpi.php?s=UkQ2YXlSaWJuc3ZoeGR2dG04WW9LazFkVEJsZUgxTjhMd2daaVd5VkxaNHRmL3JKaXNhWmM3VnRhSWxQK1R3SmxmaC9RbENSS0hEdmIwc1BETngrY2JqOExvanRiK3VLTGp0cFBCcXR6Wjg9&r=aHR0cHM6Ly8xMDQuMTQ5LjE0Ni4yMDIvaW52aXRlL3dhaGRRSEJzNFo%2FX19jcG89YUhSMGNITTZMeTlrYVhOamIzSmtMbU52YlE%3D&__cpo=1
          // NEW Permalink: https://104.149.186.10/__cpi.php?s=UkQ2YXlSaWJuc3ZoeGR2dG04WW9LdlRIVW1qWndMZ3Bzc0h3d2VvU0dHbUpOZS9nNHErODZCb1NMU09KTy9EM3cwMEhBYmovbzFKSnBUSk5ITW80bDl6WXl2NTNVUWc2cldFWGV2cmdaaHM9&r=aHR0cHM6Ly8xMDQuMTQ5LjE4Ni4xMC9hcHA%2FX19jcG89YUhSMGNITTZMeTlrYVhOamIzSmtMbU52YlE%3D&__cpo=1
          // Orig: https://discord.gg/wahdQHBs4Z
          //browser.tabs.getSelected().navigateTo('https://104.149.146.202/__cpi.php?s=UkQ2YXlSaWJuc3ZoeGR2dG04WW9LazFkVEJsZUgxTjhMd2daaVd5VkxaNHRmL3JKaXNhWmM3VnRhSWxQK1R3SmxmaC9RbENSS0hEdmIwc1BETngrY2JqOExvanRiK3VLTGp0cFBCcXR6Wjg9&r=aHR0cHM6Ly8xMDQuMTQ5LjE0Ni4yMDIvaW52aXRlL3dhaGRRSEJzNFo%2FX19jcG89YUhSMGNITTZMeTlrYVhOamIzSmtMbU52YlE%3D&__cpo=1');
          browser.tabs.getSelected().navigateTo('https://discord.gg/wahdQHBs4Z');
        }
        // Fill out bgSelect
        console.log('SETTING: Fill out BG select');
        try {
        for(let i = 0; i < bgs.length; i++) {
          let thisi = i;
          const thisopt = document.createElement('option');
          thisopt.value = ''+thisi;
          thisopt.innerText = bgs[i].name;
          document.getElementById('bgSelect').append(thisopt);
        }
        document.getElementById('bgSelect').onclick = function() {
          bgsel = document.getElementById('bgSelect').value;
          updatebg();
        } } catch(err) { console.log('err on fill out bgSelect - '+err)}
        
        // On set settings
        document.getElementById('def-homepg').onchange = function() {
          var newhomepg = document.getElementById('def-homepg').value;
          if(!newhomepg.includes('http')) {
            document.getElementById('errtxt').innerText = 'Warning: the homepage should start with https://';
          }
          try {
            chrome.storage.local.set({homepg: newhomepg}, function() {
              // homepg set successfully
            });
          }
          catch(err) {
            // Error
            setstat('err setting local homepg vals');
          }
          globhomepg = newhomepg;
        }
        document.getElementById('discpermbox').onchange = function() {
          var newdiscperm = document.getElementById('discpermbox').value;
          try {
            chrome.storage.local.set({savediscpermbox: newdiscperm}, function() {
              // discpermbox set successfully
            })
          }
          catch(err) {
            // Error
            setstat('err setting local discpermbox vals');
          }
        }
        // Reset data
        document.getElementById('resetdata').onclick = function() {
          // Prompt to clear all data
          if(document.getElementById('resetdataprompt').style.display == 'none') {
            document.getElementById('resetdataprompt').style.display = 'inline';
          } else {
            document.getElementById('resetdataprompt').style.display = 'none';
          }
        }
        document.getElementById('lk-reset-clear').onclick = function() {
          // Try to clear all data
          try {
            chrome.storage.local.clear(function() {
              // cleared successfully
            });
          }
          catch(err) {
            // Error
            setstat('err attempting to call clear datas');
          }
        }
        /* document.getElementById('lk-secretprompt').onclick = function() {
          // Prompt to show secret
          if(document.getElementById('secretprompt').style.display == 'none') {
            document.getElementById('secretprompt').style.display = 'inline';
          } else {
            document.getElementById('secretprompt').style.display = 'none';
          }
        } */
        document.getElementById('lk-secret-cancel').onclick = function() {
          document.getElementById('secretprompt').style.display = 'none';
        }
        document.getElementById('lk-secret-show').onclick = function() {
          // Show secret
          document.getElementById('secret-msg').innerHTML = 'There is a chance that <span style="color:#00b7ff;">croxyproxy.com</span> is sometimes blocked by the wifi, '
          +'but <span style="color:#00b7ff;">croxyproxy.rocks</span> isn\'t. So, from now on, <span style="color:#00b7ff;">use the .rocks</span> instead of the .com link to fully bypass blocking. '
          +'Again, <span style="color:#00b7ff;">don\'t tell anyone</span>--if this information gets more public, you might find croxyproxy.rocks getting blocked too...';
          userKnowsSecret = true;
          // Update in storage
          chrome.storage.local.set({saveuserknows: userKnowsSecret}, function() {
            // saveuserknows set successfully
          });
        }
        document.getElementById('lk-reset-cancel').onclick = function() {
          // Cancel clear
          document.getElementById('resetdataprompt').style.display = 'none';
        }
        // Add bkm
        document.getElementById('addbkm').onclick = function() {
          var thisval = document.getElementById('location').value
          bkmlist.push({'url': thisval, 'name': ''});
          // Update bkms
          updatebkms();
        }
        // Bkm function (old)
        /*function bkmGo(goto) {
          browser.tabs.getSelected().navigateTo(goto);
        }*/
      }
      catch(err) { }

      // Input checks (key down)
      document.addEventListener('keydown',
      function(e) {
          var l = e.key.toLowerCase();
          keys[l] = true;
          /*if(['Space', 'ArrowUp', 'ArrowDown'].indexOf(e.code) > -1) {
              e.preventDefault();
          }*/
      }, false
      );
      document.addEventListener('keyup',
      function(e) {
          var l = e.key.toLowerCase();
          keys[l] = false;
      }, false
      );

      // Dinosaur game
      // Vars
      var d_locx = 0;
      var d_locy = 50;
      var d_velx = 4;
      var d_vely = 0;
      var d_score = 0;
      var d_groundlvl = 50;
      var d_cactustimer = 1000;
      var d_cactus = [];
      var wipe = 0.9;
      var d_cactustypes = ['d-cactus.png', 'd-wall.png', 'd-spike.png']
      // Gameloop
      setInterval(function() {
        // If game is open
        if(dinoactive) {
          // Input
          if(keys[' ']) {
            if(d_locy >= d_groundlvl) {
              d_vely = -9; // 10, 10, 9
            }
          }
          // Physics
          d_vely += 0.75; // 0.8, 0.9, 0.75
          d_locy += d_vely;
          if(d_locy >= d_groundlvl) {
            d_locy = d_groundlvl;
          }
          d_locx += d_velx;
          // Updates
          d_score += 1;
          cullCactus();
          collision();
          // Spawn cactus
          d_cactustimer -= 20;
          if(d_cactustimer <= 0) {
            d_cactustimer = Math.random()*1400+300;
            d_cactus.push({
              'locx': d_locx+160,
              'locy': d_groundlvl,
              'img': d_cactustypes[Math.floor(Math.random()*d_cactustypes.length)]
            })
          }
          // Render
          d_render();
        }
      }, 20)
      // Cull cactus
      function cullCactus() {
        var tocull = [];
        for(let i = 0; i < d_cactus.length; i++) {
          if(d_cactus[i].locx < 0) {
            tocull.push(i);
          }
        }
        for(let i = 0; i < tocull.length; i++) {
          d_cactus.splice(tocull[i]-i);
        }
      }
      // Collision
      function collision() {
        // For each cactus
        for(let i = 0; i < d_cactus.length; i++) {
          // Determine if inside dino
          var thisc = d_cactus[i];
          if(thisc.locx < d_locx+15 /*17; decrease for more left clip*/ && thisc.locx > d_locx-8 /*10; decrease for more right clip*/) {
            if(thisc.locy < d_locy+23 && thisc.locy >= d_locy) {
              // Touching dino; game over; reset all vars
              d_locx = 0;
              d_locy = 50;
              d_velx = 4;
              d_vely = 0;
              d_score = 0;
              d_groundlvl = 50;
              d_cactustimer = 1000;
              d_cactus = [];
              wipe = 0.9;
            }
          }
        }
      }
      // Render
      function d_render() {
        // Defs
        var canvas = document.getElementById('dinocanvas');
        var ctx = canvas.getContext("2d");
        ctx.imageSmoothingEnabled = false;
        var cwidth = canvas.width;
        var cheight = canvas.height;
        var globalMult = 2.0;
        // Blank
        ctx.globalAlpha = 1.0;
        ctx.fillStyle = '#505a64';
        ctx.fillRect(0, 0, cwidth, cheight)
        // Dinosaur
        ctx.globalAlpha = 0.8;
        const imgdino = document.getElementById('d-dino.png');
        ctx.drawImage(imgdino, 0, 0, 26, 26, (d_locx-d_locx)*globalMult, d_locy*globalMult, 26*globalMult, 26*globalMult);
        // Cactus
        ctx.globalAlpha = 0.8;
        for(let i = 0; i < d_cactus.length; i++) {
          //console.log(d_cactus)
          const imgcactus = document.getElementById(d_cactus[i].img);
          ctx.drawImage(imgcactus, 0, 0, 26, 26, (d_cactus[i].locx-d_locx)*globalMult, d_cactus[i].locy*globalMult, 26*globalMult, 26*globalMult);
        }
        // Score
        ctx.globalAlpha = 1.0;
        ctx.fillStyle = 'white';
        ctx.font = '24px arial';
        ctx.fillText(d_score+'pts', cwidth-110, 22);
        // Wipe
        ctx.globalAlpha = wipe;
        wipe -= 0.06;
        if(wipe <= 0) {
          wipe = 0;
        }
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, cwidth, cheight);
      }

      browser.reload.addEventListener('click', function() {
        var tab = browser.tabs.getSelected();
        if (tab.isLoading()) {
          tab.stopNavigation();
        } else {
          tab.doReload();
        }
      });
      browser.reload.addEventListener(
        'webkitAnimationIteration',
        function() {
          // Between animation iterations: If loading is done, then stop spinning
          if (!browser.tabs.getSelected().isLoading()) {
            document.body.classList.remove('loading');
          }
        }
      );

      browser.locationForm.addEventListener('submit', function(e) {
        // On submit location
        e.preventDefault();
        // Determine whether is a direct address
        var isaddress = true;
        var googlesrch = '';
        if(browser.locationBar.value.substring(0, 4) == 'http' || browser.locationBar.value.length <= 0) { isaddress = true; }
        else {
          // Determine search URL
          isaddress = false;
          googlesrch = browser.locationBar.value;
          googlesrch = googlesrch.split(' ').join('+');
        }
        // Go to either address or google search
        if(isaddress) {
          browser.tabs.getSelected().navigateTo(browser.locationBar.value);
        }
        else {
          try {
            browser.tabs.getSelected().navigateTo('https://google.com/search?q='+googlesrch);
            //document.getElementById('status').innerText = 'Status: entered a non-url; redirected to google'
          }
          catch(err) {
            console.log('error while entering google search string: '+err)
          }
        }
      });

      browser.newTabElement.addEventListener(
        'click',
        function(e) { return browser.doNewTab(e); });

      window.addEventListener('message', function(e) {
        if (e.data) {
          var data = JSON.parse(e.data);
          if (data.name && data.title) {
            browser.tabs.setLabelByName(data.name, data.title);
          } else {
            console.warn(
                'Warning: Expected message from guest to contain {name, title}, but got:',
                data);
          }
        } else {
          console.warn('Warning: Message from guest contains no data');
        }
      });

      function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
      }      

      var webview = dce('webview');
      // Fullscreen perms
      try {
      webview.addEventListener('permissionrequest', function(e) {
        if (e.permission === 'fullscreen') {
          e.request.allow();
        }
        if (e.permission === 'download') {
          e.request.allow();
        }
        if (e.permission === 'audioCapture') {
          e.request.allow();
        }
      });
      } catch(err) { console.log('error on fs perms (1st one): '+err); }
      var tab = browser.tabs.append(webview);

      // Delay before setting in order to obtain correct homepage
      delay(500).then(function() {
        // Global window.newWindowEvent may be injected by opener
        if (window.newWindowEvent) {
          window.newWindowEvent.window.attach(webview);
        } else {
          tab.navigateTo(globhomepg);
        }
        browser.tabs.selectTab(tab);
      });
    }(this));
  };

  Browser.prototype.doLayout = function(e) {
    var controlsHeight = this.controlsContainer.offsetHeight;
    var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;
    var contentWidth = windowWidth;
    var contentHeight = windowHeight - controlsHeight;

    var tab = this.tabs.getSelected();
    var webview = tab.getWebview();
    var webviewContainer = tab.getWebviewContainer();
    // Fullscreen perms
    try {
      webview.addEventListener('permissionrequest', function(e) {
        if (e.permission === 'fullscreen') {
          e.request.allow();
        }
        if (e.permission === 'download') {
          e.request.allow();
        }
        if (e.permission === 'audioCapture') {
          e.request.allow();
        }
      });
    } catch(err) { console.log('error on fs perms (3rd one): '+err); }

    var layoutElements = [
      this.contentContainer,
      webviewContainer,
      webview];
    for (var i = 0; i < layoutElements.length; ++i) {
      layoutElements[i].style.width = contentWidth + 'px';
      layoutElements[i].style.height = contentHeight + 'px';
    }
  };

  // New window that is NOT triggered by existing window
  Browser.prototype.doNewTab = function(e) {
    // Get webview var
    var webview = dce('webview');
    // Fullscreen perms
    try {
    webview.addEventListener('permissionrequest', function(e) {
      if (e.permission === 'fullscreen') {
        e.request.allow();
      }
      if (e.permission === 'download') {
        e.request.allow();
      }
      if (e.permission === 'audioCapture') {
        e.request.allow();
      }
    });
    } catch(err) { console.log('error on fs perms (2nd one): '+err); }
    // Append after
    var tab = this.tabs.append(dce('webview'));
    // Navigate
    tab.navigateTo(globhomepg); // this.myhomepg, document.getElementById('def-homepg').value
    this.tabs.selectTab(tab);
    return tab;
  };

  Browser.prototype.doKeyDown = function(e) {
    if (e.ctrlKey) {
      switch(e.keyCode) {
        // Ctrl+ T
        case 84:
        this.doNewTab();
        break;
        // Ctrl+ W
        case 87:
        e.preventDefault();
        this.tabs.removeTab(this.tabs.getSelected());
        break;
        // Ctrl+ +
        case 187:
        document.getElementById('zoomin').click();
        break;
        // Ctrl+ -
        case 189:
        document.getElementById('zoomout').click();
        break;
      }
      // Ctrl + [1-9]
      if (e.keyCode >= 49 && e.keyCode <= 57) {
        var idx = e.keyCode - 49;
        if (idx < this.tabs.getNumTabs()) {
          this.tabs.selectIdx(idx);
        }
      }
    }
  };

  Browser.prototype.doTabNavigating = function(tab, url) {
    if (tab.selected) {
      document.body.classList.add('loading');
      this.locationBar.value = url;
    }
  };

  Browser.prototype.doTabNavigated = function(tab, url) {
    this.updateControls();
  };

  Browser.prototype.doTabSwitch = function(oldTab, newTab) {
    this.updateControls();
  };

  Browser.prototype.updateControls = function() {
    var selectedTab = this.tabs.getSelected();
    if (selectedTab.isLoading()) {
      document.body.classList.add('loading');
    }
    var selectedWebview = selectedTab.getWebview();
    this.back.disabled = !selectedWebview.canGoBack();
    this.forward.disabled = !selectedWebview.canGoForward();
    if (this.locationBar.value != selectedTab.url) {
      this.locationBar.value = selectedTab.url;
    }
  };

  return {'Browser': Browser};
})(config, tabs);

/*

If you're reading this, I have an important message for you.

To survive hardship
you must prepare for hardship.

- Cadecraft 2022/3/27

*/