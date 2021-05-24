(this["webpackJsonpmarket-watch"]=this["webpackJsonpmarket-watch"]||[]).push([[0],{210:function(e,t,a){"use strict";a.r(t);var c=a(1),s=a.n(c),n=a(23),i=a.n(n),r=a(41),o=a(33),l=a(97),d=a(32),h=a(13),j=Object(o.c)({coins:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"FETCH_MARKET_INFO":return t.payload;default:return e}},searchTerm:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"UPDATE_SEARCH_TERM":return t.payload;default:return e}}}),u=a(18),m=a(19),p=a(21),b=a(20),O=a(15),x=a(30),g=a.n(x),f=a(47),v=a(98),y=a.n(v).a.create({baseURL:"https://api.coingecko.com/api/v3/"}),k=(a(130),a(59),a(3)),C=function(e){Object(p.a)(a,e);var t=Object(b.a)(a);function a(e){var c;return Object(u.a)(this,a),(c=t.call(this,e)).numberWithCommas=c.numberWithCommas.bind(Object(O.a)(c)),c.displayPriceChange=c.displayPriceChange.bind(Object(O.a)(c)),c}return Object(m.a)(a,[{key:"numberWithCommas",value:function(e){return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}},{key:"displayPriceChange",value:function(e){var t=parseFloat(e);return t>0?Object(k.jsxs)("p",{className:"pt-2",style:{color:"green"},children:[t.toFixed(2),"%"]}):Object(k.jsxs)("p",{className:"pt-2",style:{color:"red"},children:[t.toFixed(2),"%"]})}},{key:"render",value:function(){var e="coininfo/?coin=".concat(this.props.id);return Object(k.jsx)("div",{className:"coin-row-entry",children:Object(k.jsxs)("div",{className:"row",children:[Object(k.jsx)("div",{className:"col-1",children:Object(k.jsx)("p",{className:"pt-2",children:this.props.counter})}),Object(k.jsx)("div",{className:"col",children:Object(k.jsx)("img",{className:"img-fluid",style:{maxWidth:"40px"},src:this.props.image})}),Object(k.jsx)("div",{className:"col",children:Object(k.jsx)(d.b,{to:e,children:Object(k.jsx)("p",{className:"pt-2",children:this.props.name})})}),Object(k.jsx)("div",{className:"col",children:Object(k.jsxs)("p",{className:"pt-2",children:["$",this.numberWithCommas(parseFloat(this.props.currentPrice).toFixed(2))]})}),Object(k.jsx)("div",{className:"col d-none d-sm-block",children:this.displayPriceChange(this.props.priceChangePercentage)}),Object(k.jsxs)("div",{className:"col d-none d-lg-block",children:["$",this.numberWithCommas(parseFloat(this.props.marketcap).toFixed(2))]})]})})}}]),a}(s.a.Component),_=a(215),N=a(216),w=function(e){Object(p.a)(a,e);var t=Object(b.a)(a);function a(e){var c;return Object(u.a)(this,a),(c=t.call(this,e)).renderCoins=function(){var e=c.filterCoinList(c.props.coins);if(0===c.props.coins.length)return Object(k.jsx)("div",{children:Object(k.jsx)(_.a,{color:"primary"})});var t=0;return""===c.props.searchTerm?e.map((function(e){return Object(k.jsx)(C,{counter:++t,name:e.name,id:e.id,symbol:e.symbol,priceChangePercentage:e.price_change_percentage_24h,image:e.image,currentPrice:e.current_price,marketcap:e.market_cap},e.id)})):e.map((function(e){if(e.name.toLowerCase().includes(c.props.searchTerm))return Object(k.jsx)(C,{name:e.name,priceChangePercentage:e.price_change_percentage_24h,symbol:e.symbol,image:e.image,id:e.id,currentPrice:e.current_price,marketcap:e.market_cap},e.id)}))},c.state={displayAmount:20,sortBy:c.props.sortBy},c.updateNumberOfCoinsToDisplay=c.updateNumberOfCoinsToDisplay.bind(Object(O.a)(c)),c.renderCoins=c.renderCoins.bind(Object(O.a)(c)),c.setListFilterState=c.setListFilterState.bind(Object(O.a)(c)),c.filterCoinList=c.filterCoinList.bind(Object(O.a)(c)),c}return Object(m.a)(a,[{key:"componentDidMount",value:function(){var e=this;this.props.coins.length>0!=1&&this.props.fetchMarketInfo(this.state.displayAmount),this.timerID=setInterval((function(){return e.props.fetchMarketInfo(e.state.displayAmount)}),2e4)}},{key:"componentWillUnmount",value:function(){clearInterval(this.timerID)}},{key:"updateNumberOfCoinsToDisplay",value:function(){var e=document.getElementById("show-more-spinner");e.classList.remove("d-none"),e.classList.add("d-block"),this.props.fetchMarketInfo(20+this.state.displayAmount),setTimeout((function(){e.classList.remove("d-block"),e.classList.add("d-none")}),900),this.setState({displayAmount:this.state.displayAmount+20})}},{key:"filterCoinList",value:function(e){var t=e;return"priceAscending"===this.state.sortBy?t=t.sort((function(e,t){return parseFloat(e.current_price)-parseFloat(t.current_price)})):"priceDescending"===this.state.sortBy?t=t.sort((function(e,t){return parseFloat(t.current_price)-parseFloat(e.current_price)})):"priceChangeAscending"===this.state.sortBy?t=t.sort((function(e,t){return parseFloat(e.price_change_percentage_24h)-parseFloat(t.price_change_percentage_24h)})):"priceChangeDescending"===this.state.sortBy?t=t.sort((function(e,t){return parseFloat(t.price_change_percentage_24h)-parseFloat(e.price_change_percentage_24h)})):"marketcapAscending"===this.state.sortBy?t=t.sort((function(e,t){return parseFloat(e.market_cap)-parseFloat(t.market_cap)})):"marketcapDescending"===this.state.sortBy&&(t=t.sort((function(e,t){return parseFloat(t.market_cap)-parseFloat(e.market_cap)}))),t}},{key:"setListFilterState",value:function(e){"price"===e?"priceDescending"===this.state.sortBy?this.setState({sortBy:"priceAscending"}):"priceAscending"===this.state.sortBy?this.setState({sortBy:"priceDescending"}):this.setState({sortBy:"priceAscending"}):"price-change"===e?"priceChangeDescending"===this.state.sortBy?this.setState({sortBy:"priceChangeAscending"}):"priceChangeAscending"===this.state.sortBy?this.setState({sortBy:"priceChangeDescending"}):this.setState({sortBy:"priceChangeAscending"}):"marketcap"===e&&("marketcapDescending"===this.state.sortBy?this.setState({sortBy:"marketcapAscending"}):"marketcapAscending"===this.state.sortBy?this.setState({sortBy:"marketcapDescending"}):this.setState({sortBy:"marketcapAscending"}))}},{key:"render",value:function(){var e=this;return Object(k.jsxs)("div",{children:[Object(k.jsxs)("div",{className:"pt-3 row",children:[Object(k.jsx)("div",{className:"col-1",children:Object(k.jsx)("p",{className:"font-weight-bold",children:"#"})}),Object(k.jsx)("div",{className:"col",children:Object(k.jsx)("p",{className:"font-weight-bold",children:"Logo"})}),Object(k.jsx)("div",{className:"col",children:Object(k.jsx)("a",{id:"name",className:"coinlist-col-title",onClick:function(t){return e.setListFilterState(t.target.id)},children:"Name"})}),Object(k.jsx)("div",{className:"col",children:Object(k.jsx)("p",{id:"price",className:"coinlist-col-title",onClick:function(t){return e.setListFilterState(t.target.id)},children:"Price"})}),Object(k.jsx)("div",{className:"d-none d-sm-block col",children:Object(k.jsx)("p",{id:"price-change",className:"coinlist-col-title",onClick:function(t){return e.setListFilterState(t.target.id)},children:"Price Change"})}),Object(k.jsx)("div",{className:"d-none d-lg-block col",children:Object(k.jsx)("p",{id:"marketcap",className:"coinlist-col-title",onClick:function(t){return e.setListFilterState(t.target.id)},children:"Market Cap"})})]}),this.renderCoins(),Object(k.jsx)(_.a,{className:"d-none pt-4",id:"show-more-spinner",color:"primary"}),Object(k.jsx)(N.a,{className:"mt-4",onClick:this.updateNumberOfCoinsToDisplay,color:"primary",size:"lg",children:"Show More"})," "]})}}]),a}(c.Component),S=Object(r.b)((function(e){return{coins:e.coins,searchTerm:e.searchTerm}}),{fetchMarketInfo:function(e){return function(){var t=Object(f.a)(g.a.mark((function t(a){var c;return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,y.get("/coins/markets",{params:{vs_currency:"usd",per_page:e}});case 2:c=t.sent,console.log(c),a({type:"FETCH_MARKET_INFO",payload:c.data});case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}})(w),F=a(217),D=a(218),T=a(99),A=a(219),B=function(e){Object(p.a)(a,e);var t=Object(b.a)(a);function a(e){return Object(u.a)(this,a),t.call(this,e)}return Object(m.a)(a,[{key:"render",value:function(){var e=this;return Object(k.jsxs)(F.a,{size:"md",className:"mb-4",children:[Object(k.jsx)(D.a,{addonType:"prepend",children:Object(k.jsx)(T.a,{children:"Search for coin"})}),Object(k.jsx)(A.a,{ame:"name",onChange:function(t){return e.props.updateMarketSearchTerm(t.target.value.toLowerCase())}})]})}}]),a}(c.Component),P=Object(r.b)(null,{updateMarketSearchTerm:function(e){return function(t){console.log(e),t({type:"UPDATE_SEARCH_TERM",payload:e})}}})(B),L=a(220),M=function(e){Object(p.a)(a,e);var t=Object(b.a)(a);function a(e){return Object(u.a)(this,a),t.call(this,e)}return Object(m.a)(a,[{key:"render",value:function(){return Object(k.jsx)("div",{children:Object(k.jsxs)(L.a,{className:"pt-5",children:[Object(k.jsx)(P,{className:"mt-3"}),Object(k.jsx)("div",{className:"p-3",children:Object(k.jsx)(S,{sortBy:"default"})})]})})}}]),a}(c.Component),I=a(221),E=a(222),W=a(223),$=a(233),R=a(224),H=a(225),U=a(226),z=a(100),J=a.n(z),K=(a(146),function(e){Object(p.a)(a,e);var t=Object(b.a)(a);function a(e){var c;return Object(u.a)(this,a),(c=t.call(this,e)).toggle=function(){var e=!c.state.modal;c.setState({modal:e})},c.state={coin:"",amountPurchased:"",startDate:new Date,amountOverTime:"",modal:!1},c.displayCoinInfo=c.displayCoinInfo.bind(Object(O.a)(c)),c.fetchCoin=c.fetchCoin.bind(Object(O.a)(c)),c.calculateAmountOverTime=c.calculateAmountOverTime.bind(Object(O.a)(c)),c.numberWithCommas=c.numberWithCommas.bind(Object(O.a)(c)),c}return Object(m.a)(a,[{key:"componentDidMount",value:function(){var e=new URLSearchParams(this.props.location.search).get("coin");null!==e&&this.fetchCoin(e)}},{key:"fetchCoin",value:function(){var e=Object(f.a)(g.a.mark((function e(t){var a;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y.get("/coins/"+t,{});case 2:a=e.sent,this.setState({coin:a.data});case 4:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"calculateAmountOverTime",value:function(){var e=Object(f.a)(g.a.mark((function e(t){var a,c,s;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),this.state.startDate.getDay()!==(new Date).getDay()){e.next=5;break}this.toggle(),e.next=16;break;case 5:if(this.state.amountPurchased){e.next=9;break}console.log("please entry a valid amount"),e.next=16;break;case 9:return console.log("made it"),e.next=12,y.get("/coins/".concat(this.state.coin.id,"/market_chart/range"),{params:{vs_currency:"usd",from:this.state.startDate.getTime()/1e3,to:(new Date).getTime()/1e3}});case 12:a=e.sent,c=a.data.prices[a.data.prices.length-1][1],s=a.data.prices[0][1],this.setState({amountOverTime:c/s*this.state.amountPurchased});case 16:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"numberWithCommas",value:function(e){return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}},{key:"displayCoinInfo",value:function(){var e=new URLSearchParams(this.props.location.search).get("coin");return this.state.coin.id===e?Object(k.jsxs)("div",{children:[Object(k.jsx)("img",{src:this.state.coin.image.small}),Object(k.jsx)("h1",{style:{verticalAlign:"middle"},className:"d-inline ml-2",children:this.state.coin.name}),Object(k.jsxs)("div",{className:"row coin-stats",children:[Object(k.jsxs)("div",{className:"col-12 col-md mb-4 mb-md-0",children:[Object(k.jsxs)(I.a,{children:[Object(k.jsx)(E.a,{children:Object(k.jsx)("h5",{children:"Market Cap Ranking:"})}),Object(k.jsxs)(W.a,{children:["#",this.state.coin.market_cap_rank]})]}),Object(k.jsxs)(I.a,{children:[Object(k.jsx)(E.a,{children:Object(k.jsx)("h5",{children:"Market Cap:"})}),Object(k.jsxs)(W.a,{children:["$",this.numberWithCommas(this.state.coin.market_data.market_cap.usd)]})]}),Object(k.jsxs)(I.a,{children:[Object(k.jsx)(E.a,{children:Object(k.jsx)("h5",{children:"Current Price:"})}),Object(k.jsxs)(W.a,{children:["$",this.state.coin.market_data.current_price.usd]})]})]}),Object(k.jsxs)("div",{className:"col-12 col-md",children:[Object(k.jsxs)(I.a,{children:[Object(k.jsx)(E.a,{children:Object(k.jsx)("h5",{children:"All Time High:"})}),Object(k.jsxs)(W.a,{children:["$",this.state.coin.market_data.ath.usd]})]}),Object(k.jsxs)(I.a,{children:[Object(k.jsx)(E.a,{children:Object(k.jsx)("h5",{children:"All Time Low:"})}),Object(k.jsxs)(W.a,{children:["$",this.state.coin.market_data.atl.usd.toFixed(2)]})]}),Object(k.jsxs)(I.a,{children:[Object(k.jsx)(E.a,{children:Object(k.jsx)("h5",{children:"24 Hour Change:"})}),Object(k.jsxs)(W.a,{children:[this.state.coin.market_data.price_change_24h>0?Object(k.jsxs)("span",{style:{color:"green"},children:["$",this.state.coin.market_data.price_change_24h.toFixed(2)]}):Object(k.jsxs)("span",{style:{color:"red"},children:["$",this.state.coin.market_data.price_change_24h.toFixed(2)]}),"                                    "]})]})]})]})]}):Object(k.jsx)("div",{children:Object(k.jsx)(_.a,{})})}},{key:"render",value:function(){var e=this,t=(new Date).toDateString();return Object(k.jsxs)("div",{children:[Object(k.jsx)("div",{id:"coin-details-section",children:Object(k.jsx)(L.a,{id:"coin-analysis-container",children:this.displayCoinInfo()})}),Object(k.jsx)("div",{id:"value-over-time-section",children:Object(k.jsxs)(L.a,{children:[Object(k.jsxs)("h3",{className:"text-center mb-3",children:["How much would your ",this.state.coin.name," be worth if you initially purchased it on a certain date?"]}),Object(k.jsxs)("p",{className:"mb-3",children:["Enter an amount of ",this.state.coin.name," and the date you purchased it on to see how much it'd be worth today."]}),Object(k.jsxs)("form",{onSubmit:this.calculateAmountOverTime,children:[Object(k.jsxs)("p",{children:["Amount of $ invested in ",this.state.coin.name,":"]}),Object(k.jsxs)(F.a,{id:"initial-amount-field",children:[Object(k.jsx)(D.a,{addonType:"prepend",children:"$"}),Object(k.jsx)(A.a,{min:"1",value:parseFloat(this.state.amountPurchased),onChange:function(t){return e.setState({amountPurchased:parseFloat(t.target.value)})},placeholder:"Amount",type:"number",step:"1"})]}),Object(k.jsx)("p",{className:"mt-3",children:"Date Purchased:"}),Object(k.jsx)(J.a,{id:"start",selected:this.state.startDate,dateFormat:"MM/dd/yyyy",onChange:function(t){return e.setState({startDate:t})}}),Object(k.jsx)(N.a,{className:"d-block mt-3",type:"submit",value:"Submit",children:"Submit"})]}),Object(k.jsx)("div",{children:this.state.amountOverTime?Object(k.jsxs)("div",{children:["Your ",this.state.coin.name," would be worth $",this.numberWithCommas(this.state.amountOverTime.toFixed(2))," for today's date of ",t]}):Object(k.jsx)("div",{})}),Object(k.jsx)("div",{children:Object(k.jsxs)($.a,{isOpen:this.state.modal,toggle:this.toggle,children:[Object(k.jsx)(R.a,{toggle:this.toggle,children:"Enter a date from the past."}),Object(k.jsxs)(H.a,{children:["You picked today's current date of ",(new Date).toDateString()," Pick a date from the past."]}),Object(k.jsx)(U.a,{children:Object(k.jsx)(N.a,{color:"primary",onClick:this.toggle,children:"Close"})})]})})]})})]})}}]),a}(s.a.Component)),Y=a(227),q=a(228),G=a(229),Q=a(230),V=a(231),X=a(232),Z=a.p+"static/media/coingecko.f8569e11.png",ee=function(e){Object(p.a)(a,e);var t=Object(b.a)(a);function a(e){var c;return Object(u.a)(this,a),(c=t.call(this,e)).state={isOpen:!1},c.toggle=c.toggle.bind(Object(O.a)(c)),c}return Object(m.a)(a,[{key:"toggle",value:function(){var e=!this.state.isOpen;this.setState({isOpen:e})}},{key:"render",value:function(){return Object(k.jsx)("div",{children:Object(k.jsx)(Y.a,{color:"dark",dark:!0,expand:"md",children:Object(k.jsxs)("div",{className:"container",children:[Object(k.jsx)("i",{className:"fa fa-bitcoin fa-2x mr-2",style:{color:"white"}}),Object(k.jsx)(q.a,{href:"/",children:"Crypto Market Watch"}),Object(k.jsx)(G.a,{onClick:this.toggle}),Object(k.jsx)(Q.a,{isOpen:this.state.isOpen,navbar:!0,children:Object(k.jsx)(V.a,{className:"mr-auto",navbar:!0,children:Object(k.jsx)(X.a,{children:Object(k.jsx)(d.b,{to:"/",children:Object(k.jsx)("p",{className:"nav-link",children:"Market Overview"})})})})}),Object(k.jsxs)("div",{class:"d-none d-md-block",children:[Object(k.jsx)("p",{class:"d-inline-block",id:"powered-text",children:"Powered By"}),Object(k.jsx)("a",{target:"_blank",href:"https://coingecko.com",children:Object(k.jsx)("img",{src:Z,className:"img-fluid coingecko-logo",alt:"Coin Gecko Logo"})})]})]})})})}}]),a}(s.a.Component),te=Object(o.d)(j,Object(o.a)(l.a));i.a.render(Object(k.jsx)(r.a,{store:te,children:Object(k.jsxs)(d.a,{children:[Object(k.jsx)(ee,{}),Object(k.jsx)(h.a,{path:"/crypto-market-watch",exact:!0,component:M}),Object(k.jsx)(h.a,{path:"/crypto-market-watch/coininfo/",exact:!0,component:K})]})}),document.querySelector("#root"))},59:function(e,t,a){}},[[210,1,2]]]);
//# sourceMappingURL=main.eea19a0f.chunk.js.map