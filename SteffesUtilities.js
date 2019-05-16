// ==UserScript==
// @name         Steffesgroup Utilities
// @namespace    423048753940261
// @version      1.2
// @description  Adds a few quick-link buttons to the Steffes Group website for admin purposes. Quickly Search Bidders, Launch the Auction Backend, and edit an auctions lots.
// @author       Daniel Glynn
// @match        https://steffesgroup.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    //Creates a search bar for searching bidders.
    var bidderSearch = document.createElement("INPUT");
    bidderSearch.placeholder="Search Bidders...";
    bidderSearch.id="bidderSearch";
    bidderSearch.setAttribute("type", "text");
    bidderSearch.style = "top:11px;left:7px;position:fixed;z-index: 9999";
    bidderSearch.addEventListener("keyup", function(event) { if (event.keyCode === 13) {
        event.preventDefault();
        getSearchBidder();}});
    document.body.appendChild(bidderSearch);

    //Creates a go button for activating the search bar.
    var bidderButton = document.createElement("Button");
    bidderButton.innerHTML = "Go";
    bidderButton.id="SearhBidderButton";
    bidderButton.style = "top:11px;left:186px;position:fixed;z-index: 9999";
    bidderButton.style.background = "linear-gradient(to bottom, #fefdfd 0%,#b2b2b2 100%)";
    bidderButton.style.border = "2px solid #a1a0a0";
    bidderButton.addEventListener("click", function() {getSearchBidder();});
    document.body.appendChild(bidderButton);

    //Gets the current page url and strips the auction ID from it
    var currentPageUrl = window.location.href;
    var AuctionID = ((currentPageUrl.split("").reverse().join("").split("-"))[0]).split("").reverse().join("");

    //Creates the backend button for an auction page.
    var backendButton = document.createElement("Button");
    backendButton.innerHTML = "View Auction on Backend";
    bidderButton.id="backendButton";
    backendButton.style = "top:11px;Right:178px;position:fixed;z-index: 9999";
    backendButton.style.background = "linear-gradient(to bottom, #fefdfd 0%,#b2b2b2 100%)";
    backendButton.style.border = "2px solid #a1a0a0";
    backendButton.addEventListener("click", function() {openInNewTab('https://steffesgroup.com/Admin/AuctionDetails?auctionId=' +AuctionID);});

    //Creates a button to open the SteffesGroup admin portal.
    var adminButton = document.createElement("Button");
    adminButton.innerHTML = "Open Steffes Admin Page";
    adminButton.id="adminButton";
    adminButton.style = "top:11px;Right:4px;position:fixed;z-index: 9999";
    adminButton.style.background = "linear-gradient(to bottom, #fefdfd 0%,#b2b2b2 100%)";
    adminButton.style.border = "2px solid #a1a0a0";
    adminButton.addEventListener("click", function() {openInNewTab('https://steffesgroup.com/Admin/Auctions');});
    document.body.appendChild(adminButton);


    //Checks to see if the current page is an auction page, if so, append auction specific buttons.
    if (currentPageUrl.startsWith('https://steffesgroup.com/Auction/AuctionDetails?Name=')) {
      //Takes the lotIDS variable from the SteffesGroup website and splits it into a array to be used for the options in the selection list
      var lotIDS = lotids.split('-');
      lotIDS.pop();
      var arrayOpts = lotIDS;

      //Creates the selectList object for the auction lots.
      var selectList = document.createElement("SELECT");
      selectList.style = "top:12px;Right:388px;position:fixed;z-index: 9999";
      selectList.id = "mySelect";
      if (arrayOpts.length > 0) document.body.appendChild(selectList);

      //Create and append the options to the select list.
      for (var i = 0; i < arrayOpts.length; i++) {
        var option = document.createElement("option");
        var lotIDHTML = document.getElementById('lot-container-'+arrayOpts[i]);
        var lotNumber = lotIDHTML.querySelector(`[id*='Lot-']`).outerHTML;
        var tmpStr = lotNumber;
        var tmpListCurrentLot = tmpStr.split('<span id="');
        var tmpStrCurrentLot = tmpListCurrentLot.slice(1);
        var currentLotlist = tmpStrCurrentLot.pop(0);
        var tmpListCurrentLot2 = currentLotlist.split('" class="lot-number-heading');
        var currentLot = tmpListCurrentLot2[0];


        option.value = currentLot;
        option.text = currentLot;
        if (arrayOpts.length > 0) selectList.appendChild(option);}

        //Create and append the Go button for the lot listing
        var lotBackendGo = document.createElement("Button");
        lotBackendGo.innerHTML = "Go";
        lotBackendGo.id="SearhBidderButton";
        lotBackendGo.style = "top:11px;right:349px;position:fixed;z-index: 9999";
        lotBackendGo.style.background = "linear-gradient(to bottom, #fefdfd 0%,#b2b2b2 100%)";
        lotBackendGo.style.border = "2px solid #a1a0a0";
        lotBackendGo.addEventListener("click", function() {
          var selected = selectList.selectedOptions[0].value;
          var html = content.outerHTML;
          var splitHTML = (html.split(selected))[0];
          var splitLots = splitHTML.split('datatablestart-lot-');
          var currentAuc = splitLots.pop();
          var foundLotID = currentAuc.split('" style="')[0];
          var backendLotLink = 'https://steffesgroup.com/Admin/LotDetails?lotId='+foundLotID;
          openInNewTab(backendLotLink);});
        document.body.appendChild(backendButton);
        if (arrayOpts.length > 0) document.body.appendChild(lotBackendGo);
        $(".advancedSearchBtn").hide();}})();

//Get the value from the bidder Search Bar
function getSearchBidder() {
    var bidderString = document.getElementById("bidderSearch").value;
    bidderString = bidderString.replace(/ /g,'%20');
    openInNewTab('https://steffesgroup.com/Admin/SearchBidders?SearchText='+bidderString);}

//Opens a url in a new tab
function openInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();}
