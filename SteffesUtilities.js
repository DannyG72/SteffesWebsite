// ==UserScript==
// @name         Steffesgroup Utilities
// @namespace    423048753940261
// @version      2.3
// @description  Adds a few quick-link buttons to the Steffes Group website for admin purposes. Quickly Search Bidders, Launch the Auction Backend, and edit an auction's lots.
// @author       Daniel Glynn
// @match        https://steffesgroup.com/*
// @match        https://steffesapi.nextlot.com/login/login
// @grant        none
// @grant       GM_addStyle
// ==/UserScript==
(function() {

    let style = document.createElement('style');
    style.type='text/css';
    style.innerHTML = '.custom-button-for-stuff{'
    + 'background: #CE0000;'
    + 'color: #fff;'
    + 'border-radius: 10px;'
    + 'border: none;'
    + 'box-shadow: none;'
    + 'cursor: pointer;'
    + 'padding-left: 5px;'
    + 'margin-right: 5px;'
    + 'padding-right: 5px;'
    + 'height: 30px;'
    + 'font-size: 18px;'
    + 'z-index: 1033;'
    + 'outline: none;'
    + 'display: inline-block;'
    + 'min-width: 40px;'
    + '}'
    + '.custom-button-for-stuff:hover{'
    + 'background: #fff;'
    + 'color: #000;'
    + '}'
    + '.countdownText{'
    + 'background: #CE0000;'
    + 'color: #fff;'
    + 'border-radius: 10px;'
    + 'border: none;'
    + 'box-shadow: none;'
    + 'cursor: pointer;'
    + 'padding-left: 5px;'
    + 'margin-right: 5px;'
    + 'padding-right: 5px;'
    + 'height: 30px;'
    + 'font-size: 18px;'
    + 'z-index: 1033;'
    + 'outline: none;'
    + 'display: inline-block;'
    + 'min-width: 40px;'
    + '}'
    + '.custom-div-parent{'
    + 'display: inline-flex;'
    + 'align-items: center;'
    + 'justify-content: center;'
    + 'position: fixed;'
    + 'width: 955px;'
    + 'height: 60px;'
    + 'top: 0;'
    + 'left: 50%;'
    + 'transform: translate(-50%, 0);'
    + 'z-index: 1032;'
    + 'background: #CE0000;'
    + '}'
    + '.custom-div-grandParent{'
    + 'display: inline-flex;'
    + 'align-items: center;'
    + 'justify-content: center;'
    + 'position: fixed;'
    + 'width: 100%;'
    + 'height: 60px;'
    + 'top: 0;'
    + 'z-index: 1032;'
    + 'background: #CE0000;'
    + '}'
    + '.custom-left-side{'
    + 'width: 100%;'
    + 'height: 100%;'
    + 'display: flex;'
    + 'align-items: center;'
    + 'justify-content: flex-start;'
    + '}'
    + '.custom-right-side{'
    + 'width: 100%;'
    + 'height: 100%;'
    + 'display: flex;'
    + 'align-items: center;'
    + 'justify-content: flex-end;'
    + '}'
    + '.custom-admin-button{'
    + 'justify-self: center;'
    + 'min-width: 113px; !important'
    + 'padding-left: 10px;'
    + 'display: inline-block;'
    + '}'
    + '.custom-search-input{'
    + 'height: 30px;'
    + 'width: 201px;'
    + 'border-radius: 10px;'
    + 'outline: none;'
    + 'border: none;'
    + 'box-shadow: none;'
    + 'padding-left: 10px;'
    + 'margin-right: 5px;'
    + 'font-size: 18px;'
    + '}'
    + '.custom-select-input{'
    + 'width: 100px;'
    + 'height: 30px;'
    + 'font-size: 18px;'
    + 'outline: none;'
    + 'margin-right: 5px;'
    + 'border-radius: 10px;'
    + '}'

    document.getElementsByTagName('head')[0].appendChild(style);

    'use strict';

    //Gets the current page url and strips the auction ID from it
    let currentPageUrl = window.location.href;
    let AuctionID = ((currentPageUrl.split("").reverse().join("").split("-"))[0]).split("").reverse().join("");

    let grandParent = document.createElement('div');
    grandParent.className= 'custom-div-grandParent';
    document.body.appendChild(grandParent);

    let parent = document.createElement('div');
    parent.className= 'custom-div-parent';
    document.body.appendChild(parent);

    let leftSide = document.createElement('div');
    leftSide.className='custom-left-side';
    parent.appendChild(leftSide);

    let rightSide = document.createElement('div');
    rightSide.className='custom-right-side';
    parent.appendChild(rightSide);

    let loginButton = document.getElementsByClassName("loginButton")[0]
    let steffesLogo = document.createElement("IMG");
    steffesLogo.id="SteffesLogo";
    steffesLogo.style.marginRight = '5px';
    steffesLogo.setAttribute("src", "https://i.imgur.com/5UVVBEC.png");
    //steffesLogo.onmouseover="" style="cursor: pointer"
    steffesLogo.style.cursor="pointer";
    leftSide.appendChild(steffesLogo);


    if (currentPageUrl.startsWith('https://steffesapi.nextlot.com/login/login')) {
      //let nextLotLoginButton = document.getElementsByClassName("btn btn-primary")[0]
      //rightSide.appendChild(nextLotLoginButton)
      let countdown = document.createElement('div');
      countdown.id="countdown";
      countdown.className= 'countdownText';
      countdown.style.width='400px'
      countdown.style.marginTop="-12px"
      leftSide.appendChild(countdown)
      var timeleft = 25;
      var downloadTimer = setInterval(function(){
        document.getElementById("countdown").innerHTML = "If you are already signed into NextLot, ignore this webpage. It will automatically close in "+ timeleft + " seconds.";
        timeleft -= 1;
        if(timeleft < 0){
          clearInterval(downloadTimer);
          document.getElementById("countdown").innerHTML = "Finished"
        }
}, 1000);
      setTimeout (window.close, 26000)
      }



    //Hides mobile site indicators/changes header color if present
    let div = document.getElementById("mobileSiteDiv");
    if (div) {
      div.parentNode.removeChild(div)}; // Hides it
      $('img[src="https://cdn.steffesgroup.com/static-files/images/interior/Steffes-Auctioneers-logo.png"]').hide();
      let oldHeader = document.getElementById('header-content')
      oldHeader.style.background="#CE0000"
      let oldHeaderBackground = document.getElementById('header-bg')
      oldHeaderBackground.style.background="#CE0000"

      steffesLogo.onclick = function(event) {
        window.location.href = 'https://steffesgroup.com';
      };
    try {
      loginButton.style.marginTop="0px"
      rightSide.appendChild(loginButton)
    }
    catch(err) {
      let bidderSearch = document.createElement("INPUT");
      bidderSearch.id="bidderSearch";
      bidderSearch.className='custom-search-input';
      bidderSearch.setAttribute("type", "text");

      //Creates a go button for activating the search bar.
      let bidderButton = document.createElement("Button");
      bidderButton.innerHTML = "Search";
      bidderButton.id="SearhBidderButton";
      bidderButton.className= 'custom-button-for-stuff'
      bidderButton.style.width= '70px'

      //https://steffesapi.nextlot.com/admin/new/login/login#/users?q=

      if (currentPageUrl.startsWith('https://steffesgroup.com/Admin/SearchBidder')) {
          //Creates a search bar for searching bidders.

          bidderSearch.placeholder="Nextlot Search Bidders...";
          bidderSearch.addEventListener("keyup", function(event) { if (event.keyCode === 13) {
              event.preventDefault();
              let bidderString = document.getElementById("bidderSearch").value;
              bidderString = bidderString.replace(/ /g,'%20');
              openInNewTab('https://steffesapi.nextlot.com/login/login')
              sleep(0).then(() => {
                openNewBackgroundTab('https://steffesapi.nextlot.com/admin/new#/users?q='+bidderString);
                });
              };
              ;});
          bidderButton.addEventListener("click", function() {let bidderString = document.getElementById("bidderSearch").value;
          bidderString = bidderString.replace(/ /g,'%20');
          openInNewTab('https://steffesapi.nextlot.com/admin/new#/users?q='+bidderString);});
            } else {
        //Creates a search bar for searching bidders.
          bidderSearch.placeholder="Search Bidders...";
          bidderSearch.addEventListener("keyup", function(event) { if (event.keyCode === 13) {
              event.preventDefault();
              let bidderString = document.getElementById("bidderSearch").value;
              bidderString = bidderString.replace(/ /g,'%20');
              openInNewTab('https://steffesgroup.com/Admin/SearchBidders?SearchText='+bidderString);
              ;}});
          bidderButton.addEventListener("click", function() {let bidderString = document.getElementById("bidderSearch").value;
          bidderString = bidderString.replace(/ /g,'%20');
          openInNewTab('https://steffesgroup.com/Admin/SearchBidders?SearchText='+bidderString);});
      }

      //Creates the backend button for an auction page.
      let backendButton = document.createElement("Button");
      backendButton.innerHTML = "View Auction on Backend";
      bidderButton.id="backendButton";
      backendButton.className= 'custom-button-for-stuff custom-admin-button'
      backendButton.addEventListener("click", function() {openInNewTab('https://steffesgroup.com/Admin/AuctionDetails?auctionId=' +AuctionID);});

      //Creates a button to open the SteffesGroup admin portal.
      if (currentPageUrl.includes('Admin')) {
      } else {
        let adminButton = document.createElement("Button");
        adminButton.innerHTML = "Admin Portal";
        adminButton.id="adminButton";
        adminButton.className= 'custom-button-for-stuff'
        adminButton.style.width= '120px'
        adminButton.addEventListener("click", function() {openInNewTab('https://steffesgroup.com/Admin/Auctions');});
        leftSide.appendChild(adminButton);
      }

      leftSide.appendChild(bidderSearch);
      leftSide.appendChild(bidderButton);


      //Checks to see if the current page is an auction page, if so, append auction specific buttons.
      if (currentPageUrl.startsWith('https://steffesgroup.com/Auction/AuctionDetails?Name=')) {
        let lotBackendGo = document.createElement("Button");
        lotBackendGo.innerHTML = "Go";
        lotBackendGo.id="SearhBidderButton";
        lotBackendGo.className= 'custom-button-for-stuff'
        lotBackendGo.addEventListener("click", function() {
          let selected = selectList.selectedOptions[0].value;
          let html = content.outerHTML;
          let splitHTML = (html.split(selected))[0];
          let splitLots = splitHTML.split('datatablestart-lot-');
          let currentAuc = splitLots.pop();
          let foundLotID = currentAuc.split('" style="')[0];
          let backendLotLink = 'https://steffesgroup.com/Admin/LotDetails?lotId='+foundLotID;
          openInNewTab(backendLotLink);});
          rightSide.appendChild(backendButton);
        //Takes the lotIDS letiable from the SteffesGroup website and splits it into a array to be used for the options in the selection list
        let lotIDS = lotids.split('-');
        lotIDS.pop();
        let arrayOpts = lotIDS;

        //Creates the selectList object for the auction lots.
        let selectList = document.createElement("SELECT");
        selectList.className= 'custom-select-input';
        selectList.id = "mySelect";
        if (arrayOpts.length > 0) rightSide.appendChild(selectList);

        //Create and append the options to the select list.
        for (let i = 0; i < arrayOpts.length; i++) {
          let option = document.createElement("option");
          let lotIDHTML = document.getElementById('lot-container-'+arrayOpts[i]);
          let lotNumber = lotIDHTML.querySelector(`[id*='Lot-']`).outerHTML;
          let tmpStr = lotNumber;
          let tmpListCurrentLot = tmpStr.split('<span id="');
          let tmpStrCurrentLot = tmpListCurrentLot.slice(1);
          let currentLotlist = tmpStrCurrentLot.pop(0);
          let tmpListCurrentLot2 = currentLotlist.split('" class="lot-number-heading');
          let currentLot = tmpListCurrentLot2[0];

          option.value = currentLot;
          option.text = currentLot;
          if (arrayOpts.length > 0) selectList.appendChild(option);}

          //Create and append the Go button for the lot listing
          if (arrayOpts.length > 0) rightSide.appendChild(lotBackendGo);
          $(".advancedSearchBtn").hide();}
    }})();

//Opens a url in a new tab
function openInNewTab(url) {
    let win = window.open(url, '_blank');
    win.focus();}


function openNewBackgroundTab (url) {
    var a = document.createElement("a");
    a.href = url;
    var evt = document.createEvent("MouseEvents");
    //the tenth parameter of initMouseEvent sets ctrl key
    evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0,
                                true, false, false, false, 0, null);
    a.dispatchEvent(evt);
}


function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
