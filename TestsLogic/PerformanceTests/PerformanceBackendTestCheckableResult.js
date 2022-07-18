import { sleep, group } from 'k6'
import http from 'k6/http'

export const options = { vus: 10, duration: '5m' }

export default function main() {
  let response

  group('page_1 - https://sf-uat.digitalboost.co.nz/', function () {
    response = http.get('https://sf-uat.digitalboost.co.nz/s/?language=en_NZ', {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })

    response = http.get('https://munchkin.marketo.net/161/munchkin.js', {
      headers: {
        'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })

    response = http.get(
      'https://www.googletagmanager.com/gtag/js?id=G-F6RSJKSH3D&l=dataLayer&cx=c',
      {
        headers: {
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.post(
      'https://354-zfw-077.mktoresp.com/webevents/visitWebPage?_mchNc=1657100878725&_mchCn=&_mchId=354-ZFW-077&_mchTk=_mch-digitalboost.co.nz-1657097811094-76840&_mchHo=sf-uat.digitalboost.co.nz&_mchPo=&_mchRu=%2Fs%2F&_mchPc=https%3A&_mchVr=161&_mchEcid=&_mchHa=&_mchRe=&_mchQp=language%3Den_NZ',
      null,
      {
        headers: {
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )
    sleep(1.1)

    response = http.get('https://www.googletagmanager.com/gtm.js?id=GTM-WJHGD6T', {
      headers: {
        'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })

    response = http.get('https://snap.licdn.com/li.lms-analytics/insight.min.js', {
      headers: {
        'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })

    response = http.get('https://munchkin.marketo.net/munchkin.js', {
      headers: {
        'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })

    response = http.get('https://munchkin.marketo.net/161/munchkin.js', {
      headers: {
        'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })

    response = http.get(
      'https://www.googletagmanager.com/gtag/js?id=G-F6RSJKSH3D&l=dataLayer&cx=c',
      {
        headers: {
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.post(
      'https://354-zfw-077.mktoresp.com/webevents/visitWebPage?_mchNc=1657100879907&_mchCn=&_mchId=354-ZFW-077&_mchTk=_mch-digitalboost.co.nz-1657097811094-76840&_mchHo=sf-uat.digitalboost.co.nz&_mchPo=&_mchRu=%2Fs%2F&_mchPc=https%3A&_mchVr=161&_mchEcid=&_mchHa=&_mchRe=&_mchQp=language%3Den_NZ',
      null,
      {
        headers: {
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )
    sleep(3.7)

    response = http.get(
      'https://fonts.googleapis.com/css?family=Open+Sans:400,600&subset=cyrillic',
      {
        headers: {
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.post(
      'https://sf-uat.digitalboost.co.nz/s/sfsites/aura?r=0&ui-communities-components-aura-components-forceCommunity-richText.RichText.getParsedRichTextValue=13',
      {
        message:
          '{"actions":[{"id":"140;a","descriptor":"serviceComponent://ui.communities.components.aura.components.forceCommunity.richText.RichTextController/ACTION$getParsedRichTextValue","callingDescriptor":"UNKNOWN","params":{"html":"<div class=\\"slds-text-align_center footer-brand\\">\\n    <h1 class=\\"footer-title slds-m-bottom_large\\">Got questions? We\'re happy to help.</h1>\\n    <p class=\\"footer-content slds-m-bottom_xx-large\\">To learn more about how Digital Boost can help you, get in touch today</p>\\n    <a class=\\"dg-btn dg-btn-brand\\" href=\\"/s/help\\">\\n        <span class=\\"icon-media_xx-small\\"></span>\\n        <span>GET IN TOUCH</span>\\n    </a> \\n    <div class=\\"slds-m-vertical_xx-large footer-logos\\">\\n        <ul class=\\"slds-p-vertical_large dg-list dg-list_inline slds-grid slds-grid_align-spread\\" style=\\"max-width: 320px; margin: 0 auto;\\">\\n    \\t\\t<li><a href=\\"https://www.facebook.com/DigitalBoostNZ/\\" target=\\"_blank\\"><img src=\\"{!contentAsset.footer_facebook.1}\\" width=\\"32\\" /></a></li>\\n            <li><a href=\\"https://nz.linkedin.com/company/digitalboostnz\\" target=\\"_blank\\"><img src=\\"{!contentAsset.footer_linkedin.1}\\" width=\\"32\\" /></a></li>\\n            <li><a href=\\"https://www.instagram.com/digitalboostnz/\\" target=\\"_blank\\"><img src=\\"{!contentAsset.footer_instagram.1}\\" width=\\"32\\" /></a></li>\\n            <li><a href=\\"https://www.youtube.com/c/digitalboost\\" target=\\"_blank\\"><img src=\\"{!contentAsset.footer_youtube.1}\\" width=\\"32\\" /></a></li>\\t\\n\\t\\t</ul>\\n        <ul class=\\"slds-p-vertical_medium dg-list dg-list_inline slds-grid slds-grid_align-spread slds-wrap\\" style=\\"max-width: 600px; margin: 0 auto; align-items: center;\\">\\n            <span class=\\"footer-broughtby\\"><b>Brought to you by</b></span>\\n            <li class=\\"footer-mbie\\"><a href=\\"https://www.business.govt.nz/\\" target=\\"_blank\\"><img src=\\"{!contentAsset.footer_mbie.1}\\" width=\\"130\\"/></a></li>\\n    \\t\\t<li class=\\"footer-tml\\"><a href=\\"https://themindlab.com\\" target=\\"_blank\\"><img src=\\"{!contentAsset.footer_tml.1}\\" width=\\"130\\" /></a></li> \\n\\t\\t</ul>\\n        <ul class=\\"slds-p-vertical_medium dg-list dg-list_inline slds-grid slds-grid_align-spread slds-grid_vertical-align-center slds-wrap footer-terms\\" style=\\"margin: 0 auto;\\">\\n            <li class=\\"footer-google\\"><a href=\\"https://play.google.com/store/apps/details?id=nz.co.digitalboost.live\\" target=\\"_blank\\"><img src=\\"{!contentAsset.footer_googleplay2.1}\\" style=\\"height: 28px\\"/></a></li>\\n            <li class=\\"footer-ios\\"><a href=\\"https://apps.apple.com/al/app/digital-boost-live/id1580326501\\" target=\\"_blank\\"><img src=\\"{!contentAsset.footer_iosapp.1}\\" style=\\"height: 28px\\"/></a></li>\\n            <li><a href=\\"/s/terms\\" target=\\"_blank\\">Terms & Conditions</a></li>\\n            <li><a href=\\"/s/privacy\\" target=\\"_blank\\">Privacy Policy</a></li>\\n            <li><a href=\\"/s/help\\" target=\\"_blank\\">Contact</a></li>\\n            <li class=\\"footer-content_dark\\">©2022 BUSINESS.GOVT.NZ</li>\\n        </ul>\\n    </div>\\n</div>"},"version":"55.0","storable":true},{"id":"141;a","descriptor":"serviceComponent://ui.communities.components.aura.components.forceCommunity.richText.RichTextController/ACTION$getParsedRichTextValue","callingDescriptor":"UNKNOWN","params":{"html":"<div class=\\"slds-text-align_center\\">\\n    <div class=\\"slds-clearfix header-brand\\">\\n        <div class=\\"slds-float_left\\">\\n            <div class=\\"logoImage\\" style=\\"background-image: var(--lwc-brandLogoImage,url(/sfsites/c/file-asset/Lockup_01?v=1&height=300&width=300)); background-size: contain; background-repeat: no-repeat; background-position: center center;width: 194px; height: 64px;\\">\\n\\n            </div>\\n        </div>\\n        <div class=\\"slds-float_right\\">\\n            <a href=\\"/DigitalBoost/s/\\">Why digital Boost?</a>&nbsp;\\n            <a class=\\"dg-btn dg-btn-brand\\" href=\\"/DigitalBoost/s/login\\">Log in</a>\\n        </div>\\n    </div>\\n</div>"},"version":"55.0","storable":true},{"id":"145;a","descriptor":"serviceComponent://ui.communities.components.aura.components.forceCommunity.richText.RichTextController/ACTION$getParsedRichTextValue","callingDescriptor":"UNKNOWN","params":{"html":"<p style=\\"text-align: center;\\"><img class=\\"sfdcCbImage\\" alt=\\"\\" src=\\"{!contentAsset.GovtIcon1.1}\\" style=\\"width: 115.859px; height: 115.859px;\\">&nbsp;<img class=\\"sfdcCbImage\\" alt=\\"\\" src=\\"{!contentAsset.GovtIcon.1}\\" style=\\"width: 109.266px; height: 109.266px;\\"></p>"},"version":"55.0","storable":true},{"id":"146;a","descriptor":"serviceComponent://ui.communities.components.aura.components.forceCommunity.richText.RichTextController/ACTION$getParsedRichTextValue","callingDescriptor":"UNKNOWN","params":{"html":"<h1 style=\\"text-align:center; color:#007CAD\\">Government-backed</h1>\\n<br>\\n<div class=\\"simple-icon-card\\"><p class=\\"simple-icon-card-body\\" style=\\"text-align:center;\\">Digital Boost is a completely free government-funded tool to help all Kiwi small businesses adapt to today and prepare for tomorrow.</p></div>"},"version":"55.0","storable":true},{"id":"147;a","descriptor":"serviceComponent://ui.communities.components.aura.components.forceCommunity.richText.RichTextController/ACTION$getParsedRichTextValue","callingDescriptor":"UNKNOWN","params":{"html":"<p style=\\"text-align: center;\\"><img class=\\"sfdcCbImage\\" alt=\\"\\" src=\\"{!contentAsset.Videos.1}\\" style=\\"width: 110.062px; height: 110.062px;\\"></p>"},"version":"55.0","storable":true},{"id":"148;a","descriptor":"serviceComponent://ui.communities.components.aura.components.forceCommunity.richText.RichTextController/ACTION$getParsedRichTextValue","callingDescriptor":"UNKNOWN","params":{"html":"<h1 style=\\"text-align:center; color:#007CAD\\">350+ How to videos</h1>\\n<br>\\n<div class=\\"simple-icon-card\\"><p class=\\"simple-icon-card-body\\" style=\\"text-align:center;\\">Explore our wide range of content, broken down into bite-size pieces to fit around your busy schedule.</p></div>"},"version":"55.0","storable":true},{"id":"149;a","descriptor":"serviceComponent://ui.communities.components.aura.components.forceCommunity.richText.RichTextController/ACTION$getParsedRichTextValue","callingDescriptor":"UNKNOWN","params":{"html":"<p style=\\"text-align: center;\\"><img class=\\"sfdcCbImage\\" alt=\\"\\" src=\\"{!contentAsset.RWS.1}\\" style=\\"width: 109.969px; height: 109.969px;\\"></p>"},"version":"55.0","storable":true},{"id":"150;a","descriptor":"serviceComponent://ui.communities.components.aura.components.forceCommunity.richText.RichTextController/ACTION$getParsedRichTextValue","callingDescriptor":"UNKNOWN","params":{"html":"<h1 style=\\"text-align:center; color:#007CAD\\">Real world stories</h1>\\n<br>\\n<div class=\\"simple-icon-card\\"><p class=\\"simple-icon-card-body\\" style=\\"text-align:center;\\">Find out how other Kiwi businesses are successfully using digital tools, and get inspired.</p></div>"},"version":"55.0","storable":true},{"id":"151;a","descriptor":"serviceComponent://ui.communities.components.aura.components.forceCommunity.richText.RichTextController/ACTION$getParsedRichTextValue","callingDescriptor":"UNKNOWN","params":{"html":"<p style=\\"text-align: center;\\"><img class=\\"sfdcCbImage\\" alt=\\"\\" src=\\"{!contentAsset.Tool.1}\\" style=\\"width: 109.328px; height: 109.328px;\\"></p>"},"version":"55.0","storable":true},{"id":"152;a","descriptor":"serviceComponent://ui.communities.components.aura.components.forceCommunity.richText.RichTextController/ACTION$getParsedRichTextValue","callingDescriptor":"UNKNOWN","params":{"html":"<h1 style=\\"text-align:center; color:#007CAD\\">Test your website</h1>\\n<br>\\n<div class=\\"simple-icon-card\\"><p class=\\"simple-icon-card-body\\" style=\\"text-align:center;\\">Our diagnostic tool Checkable evaluates your website\'s performance and identifies small changes that would make a big difference.</p></div>"},"version":"55.0","storable":true},{"id":"153;a","descriptor":"serviceComponent://ui.communities.components.aura.components.forceCommunity.richText.RichTextController/ACTION$getParsedRichTextValue","callingDescriptor":"UNKNOWN","params":{"html":"<div style=\\"text-align: center;\\">          \\n<a class=\\"db-button db-button_pink\\" href=\\"/s/login/SelfRegister\\">Sign up to Digital Boost</a>\\n</div>"},"version":"55.0","storable":true},{"id":"155;a","descriptor":"serviceComponent://ui.communities.components.aura.components.forceCommunity.richText.RichTextController/ACTION$getParsedRichTextValue","callingDescriptor":"UNKNOWN","params":{"html":"<div class=\\"what-learn-container\\" >\\n        \\t<div class=\\"sneak-peek-title\\">\\n                <div class=\\"what-learn-detail\\">\\n                    <h3 class=\\"sneak-peek-heading\\">Join thousands of other Kiwi small businesses</h3>\\n                    <div style=\\"padding-top:40px\\"> </div>\\n                  <p class=\\"sneak-peak-body\\">\\n                    <p style=\\"font-size: 20px\\"> Take advantage of hundreds of short educational videos covering a wide range of topics.</p>\\n                    <div style=\\"padding-top:60px\\"> </div>\\n                             <a class=\\"db-button db-button_pink\\" href=\\"/s/login/SelfRegister\\">Sign up to Digital Boost</a>\\n                    </div>            \\n</div>"},"version":"55.0","storable":true},{"id":"156;a","descriptor":"serviceComponent://ui.communities.components.aura.components.forceCommunity.richText.RichTextController/ACTION$getParsedRichTextValue","callingDescriptor":"UNKNOWN","params":{"html":"<div class=\\"what-learn-container\\" >\\n        \\t<div class=\\"sneak-peek-title\\">\\n                <div class=\\"what-learn-detail\\">\\n                    <h3 class=\\"sneak-peek-heading\\">Start your journey with Digital Boost today</h3>\\n                  <div style=\\"padding-top:40px\\"> </div>\\n                  <p class=\\"sneak-peak-body\\">\\n                    <p style=\\"font-size: 20px\\"> It\'s easy to sign up - and it is, and will always be free to all Kiwi small businesses!</p>\\n                    <div style=\\"padding-top:60px\\"> </div>\\n                             <a class=\\"db-button db-button_pink\\" href=\\"/s/login/SelfRegister\\">Sign up to Digital Boost</a>\\n                    </div>            \\n</div>"},"version":"55.0","storable":true}]}',
        'aura.context':
          '{"mode":"PROD","fwuid":"QPQi8lbYE8YujG6og6Dqgw","app":"siteforce:communityApp","loaded":{"APPLICATION@markup://siteforce:communityApp":"0DbugOKt-DnBZOgYmuPNFg","COMPONENT@markup://instrumentation:o11yCoreCollector":"8089lZkrpgraL8-V8KZXNw"},"dn":[],"globals":{},"uad":false}',
        'aura.pageURI': '/s/?language=en_NZ',
        'aura.token': 'null',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'x-sfdc-page-cache': '47f1783493aa7a16',
          'x-sfdc-page-scope-id': '18cf89b4-96d7-4dbb-b6b7-b07bcf84a434',
          'x-sfdc-request-id': '5215390000a8fd0e81',
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get(
      'https://sf-uat.digitalboost.co.nz/s/sfsites/aura?message=%7B%22actions%22%3A%5B%7B%22descriptor%22%3A%22serviceComponent%3A%2F%2Fui.communities.components.aura.components.forceCommunity.managedContent.ManagedContentComponentController%2FACTION%24getRenderData%22%2C%22callingDescriptor%22%3A%22UNKNOWN%22%2C%22params%22%3A%7B%22contentItemUrlNameIds%22%3A%5B%5D%2C%22contentItemContentKeys%22%3A%5B%22MCLN4WJHFUWZCZBMJPT6Q4Q2AU5Q%22%5D%7D%2C%22version%22%3A%2255.0%22%2C%22storable%22%3Atrue%7D%5D%7D&aura.context=%7B%22mode%22%3A%22PROD%22%2C%22fwuid%22%3A%22QPQi8lbYE8YujG6og6Dqgw%22%2C%22app%22%3A%22siteforce%3AcommunityApp%22%2C%22loaded%22%3A%7B%22APPLICATION%40markup%3A%2F%2Fsiteforce%3AcommunityApp%22%3A%220DbugOKt-DnBZOgYmuPNFg%22%7D%2C%22apck%22%3A%22i8CRepyCqdjRYtNF5MvQ_w%22%2C%22uad%22%3Afalse%7D&aura.isAction=true',
      {
        headers: {
          'x-sfdc-page-cache': '47f1783493aa7a16',
          'x-sfdc-page-scope-id': '18cf89b4-96d7-4dbb-b6b7-b07bcf84a434',
          'x-sfdc-request-id': '52170000003d52c1af',
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get(
      'https://sf-uat.digitalboost.co.nz/s/sfsites/aura?message=%7B%22actions%22%3A%5B%7B%22descriptor%22%3A%22serviceComponent%3A%2F%2Fui.communities.components.aura.components.forceCommunity.managedContent.ManagedContentComponentController%2FACTION%24getRenderData%22%2C%22callingDescriptor%22%3A%22UNKNOWN%22%2C%22params%22%3A%7B%22contentItemUrlNameIds%22%3A%5B%5D%2C%22contentItemContentKeys%22%3A%5B%22MCY52FSO4J4BADNN3MQN2HQYVJHE%22%5D%7D%2C%22version%22%3A%2255.0%22%2C%22storable%22%3Atrue%7D%5D%7D&aura.context=%7B%22mode%22%3A%22PROD%22%2C%22fwuid%22%3A%22QPQi8lbYE8YujG6og6Dqgw%22%2C%22app%22%3A%22siteforce%3AcommunityApp%22%2C%22loaded%22%3A%7B%22APPLICATION%40markup%3A%2F%2Fsiteforce%3AcommunityApp%22%3A%220DbugOKt-DnBZOgYmuPNFg%22%7D%2C%22apck%22%3A%22i8CRepyCqdjRYtNF5MvQ_w%22%2C%22uad%22%3Afalse%7D&aura.isAction=true',
      {
        headers: {
          'x-sfdc-page-cache': '47f1783493aa7a16',
          'x-sfdc-page-scope-id': '18cf89b4-96d7-4dbb-b6b7-b07bcf84a434',
          'x-sfdc-request-id': '521739000075f1da0c',
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.post(
      'https://sf-uat.digitalboost.co.nz/s/sfsites/aura?r=3&aura.ApexAction.execute=3',
      {
        message:
          '{"actions":[{"id":"158;a","descriptor":"aura://ApexActionController/ACTION$execute","callingDescriptor":"UNKNOWN","params":{"namespace":"","classname":"db_LangSwitcherController","method":"getAvailableLanguages","cacheable":true,"isContinuation":false}},{"id":"159;a","descriptor":"aura://ApexActionController/ACTION$execute","callingDescriptor":"UNKNOWN","params":{"namespace":"","classname":"db_ContentController","method":"getContentForContentType","params":{"contentType":"Hero","language":"en-NZ"},"cacheable":false,"isContinuation":false}},{"id":"160;a","descriptor":"aura://ApexActionController/ACTION$execute","callingDescriptor":"UNKNOWN","params":{"namespace":"","classname":"db_ContentController","method":"getContentForContentType","params":{"contentType":"Sneak peek","language":"en-NZ"},"cacheable":false,"isContinuation":false}}]}',
        'aura.context':
          '{"mode":"PROD","fwuid":"QPQi8lbYE8YujG6og6Dqgw","app":"siteforce:communityApp","loaded":{"APPLICATION@markup://siteforce:communityApp":"0DbugOKt-DnBZOgYmuPNFg","COMPONENT@markup://instrumentation:o11yCoreCollector":"8089lZkrpgraL8-V8KZXNw"},"dn":[],"globals":{},"uad":false}',
        'aura.pageURI': '/s/?language=en_NZ',
        'aura.token': 'null',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'x-sfdc-page-cache': '47f1783493aa7a16',
          'x-sfdc-page-scope-id': '18cf89b4-96d7-4dbb-b6b7-b07bcf84a434',
          'x-sfdc-request-id': '526909000028bc4b6e',
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get('https://sf-uat.digitalboost.co.nz/file-asset/GovtIcon1?v=1', {
      headers: {
        'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })

    response = http.get('https://sf-uat.digitalboost.co.nz/s/undefined', {
      headers: {
        'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })
    sleep(1.3)

    response = http.post(
      'https://sf-uat.digitalboost.co.nz/s/sfsites/aura?r=4&ui-instrumentation-components-beacon.InstrumentationBeacon.sendData=1',
      {
        message:
          '{"actions":[{"id":"200;a","descriptor":"serviceComponent://ui.instrumentation.components.beacon.InstrumentationBeaconController/ACTION$sendData","callingDescriptor":"UNKNOWN","params":{"batch":[{"topic":"ailtn","schemaType":"LightningInteraction","payload":"{\\"id\\":\\"ltng:interaction\\",\\"ts\\":4963.89,\\"pageStartTime\\":1657100878460,\\"owner\\":\\"siteforce:communityApp\\",\\"unixTS\\":false,\\"eventType\\":\\"user\\",\\"eventSource\\":\\"synthetic-communitynavigation\\",\\"attributes\\":{\\"pageViewCounter\\":1,\\"cdnEnabled\\":false,\\"uriDefsEnabled\\":false,\\"gates\\":{}},\\"locator\\":{\\"target\\":\\"link\\",\\"scope\\":\\"communitynavigation\\",\\"context\\":{\\"unifiedEventType\\":\\"COMMUNITY_PAGE_NAVIGATION\\",\\"referrer\\":\\"/s/\\",\\"requestURI\\":\\"/s/\\",\\"entityId\\":null}},\\"sequence\\":1,\\"page\\":{\\"context\\":\\"home\\",\\"attributes\\":{\\"url\\":\\"/s/\\"}}}"},{"topic":"ailtn","schemaType":"LightningPerformance","payload":"{\\"id\\":\\"ltng:performance\\",\\"ts\\":5047.79,\\"duration\\":0,\\"pageStartTime\\":1657100878460,\\"marks\\":{},\\"owner\\":\\"siteforce:routerInitializer\\",\\"unixTS\\":false,\\"eventType\\":\\"performance\\",\\"eventSource\\":\\"synthetic-communityembarcadero\\",\\"attributes\\":{\\"methodName\\":\\"resolveUrl\\",\\"pageType\\":\\"comm__namedPage\\",\\"pageAttributes\\":{\\"name\\":\\"Home\\"},\\"success\\":true,\\"cdnEnabled\\":false,\\"uriDefsEnabled\\":false,\\"gates\\":{}}}"},{"topic":"ailtn","schemaType":"LightningPageView","payload":"{\\"id\\":\\"ltng:pageView\\",\\"ts\\":4899.19,\\"duration\\":1715,\\"pageStartTime\\":1657100878460,\\"marks\\":{\\"transport\\":[{\\"ts\\":5217,\\"context\\":{\\"auraXHRId\\":1,\\"requestLength\\":781,\\"background\\":false,\\"actionDefs\\":[\\"154;a\\"],\\"requestId\\":\\"52170000003d52c1af\\",\\"status\\":200,\\"statusText\\":\\"OK\\",\\"responseLength\\":43009,\\"xhrDuration\\":608,\\"xhrStall\\":4,\\"startTime\\":5217,\\"fetchStart\\":5217,\\"requestStart\\":5221,\\"dns\\":0,\\"tcp\\":0,\\"ttfb\\":607,\\"transfer\\":0,\\"transferSize\\":8972,\\"nextHopProtocol\\":\\"http/1.1\\",\\"serverTime\\":238,\\"xhrDelay\\":4},\\"duration\\":612},{\\"ts\\":5217.39,\\"context\\":{\\"auraXHRId\\":2,\\"requestLength\\":781,\\"background\\":false,\\"actionDefs\\":[\\"157;a\\"],\\"requestId\\":\\"521739000075f1da0c\\",\\"status\\":200,\\"statusText\\":\\"OK\\",\\"responseLength\\":43009,\\"xhrDuration\\":1202,\\"xhrStall\\":3,\\"startTime\\":5217,\\"fetchStart\\":5217,\\"requestStart\\":5221,\\"dns\\":0,\\"tcp\\":0,\\"ttfb\\":1202,\\"transfer\\":0,\\"transferSize\\":8971,\\"nextHopProtocol\\":\\"http/1.1\\",\\"serverTime\\":170,\\"xhrDelay\\":3},\\"duration\\":1205},{\\"ts\\":5269.09,\\"context\\":{\\"auraXHRId\\":3,\\"requestLength\\":1747,\\"background\\":false,\\"actionDefs\\":[\\"158;a\\",\\"159;a\\",\\"160;a\\"],\\"requestId\\":\\"526909000028bc4b6e\\",\\"status\\":200,\\"statusText\\":\\"OK\\",\\"responseLength\\":6355,\\"xhrDuration\\":1254,\\"xhrStall\\":3,\\"startTime\\":5269,\\"fetchStart\\":5269,\\"requestStart\\":5273,\\"dns\\":0,\\"tcp\\":0,\\"ttfb\\":1253,\\"transfer\\":0,\\"transferSize\\":2608,\\"nextHopProtocol\\":\\"http/1.1\\",\\"serverTime\\":243,\\"xhrDelay\\":2},\\"duration\\":1256}],\\"actions\\":[{\\"ts\\":4948.69,\\"context\\":{\\"id\\":\\"34;a\\",\\"abortable\\":true,\\"storable\\":true,\\"background\\":false,\\"cmp\\":\\"forceCommunity:richText\\",\\"def\\":\\"serviceComponent://ui.communities.components.aura.components.forceCommunity.richText.RichTextController/ACTION$getParsedRichTextValue\\",\\"state\\":\\"SUCCESS\\",\\"cache\\":true},\\"callbackTime\\":0,\\"enqueueWait\\":256,\\"duration\\":256},{\\"ts\\":4951,\\"context\\":{\\"id\\":\\"37;a\\",\\"abortable\\":true,\\"storable\\":true,\\"background\\":false,\\"cmp\\":\\"forceCommunity:richText\\",\\"def\\":\\"serviceComponent://ui.communities.components.aura.components.forceCommunity.richText.RichTextController/ACTION$getParsedRichTextValue\\",\\"state\\":\\"SUCCESS\\",\\"cache\\":true},\\"callbackTime\\":0,\\"enqueueWait\\":254,\\"duration\\":254},{\\"ts\\":4954.59,\\"context\\":{\\"id\\":\\"52;a\\",\\"abortable\\":true,\\"storable\\":true,\\"background\\":false,\\"cmp\\":\\"force:hostConfig\\",\\"def\\":\\"serviceComponent://ui.force.components.controllers.hostConfig.HostConfigController/ACTION$getConfigData\\",\\"state\\":\\"SUCCESS\\",\\"cache\\":true},\\"callbackTime\\":1,\\"enqueueWait\\":251,\\"duration\\":252},{\\"ts\\":5026.5,\\"context\\":{\\"id\\":\\"70;a\\",\\"abortable\\":true,\\"storable\\":true,\\"background\\":false,\\"cmp\\":\\"forceCommunity:richText\\",\\"def\\":\\"serviceComponent://ui.communities.components.aura.components.forceCommunity.richText.RichTextController/ACTION$getParsedRichTextValue\\",\\"state\\":\\"SUCCESS\\",\\"cache\\":true},\\"callbackTime\\":0,\\"enqueueWait\\":187,\\"duration\\":187},{\\"ts\\":5026.89,\\"context\\":{\\"id\\":\\"73;a\\",\\"abortable\\":true,\\"storable\\":true,\\"background\\":false,\\"cmp\\":\\"forceCommunity:richText\\",\\"def\\":\\"serviceComponent://ui.communities.components.aura.components.forceCommunity.richText.RichTextController/ACTION$getParsedRichTextValue\\",\\"state\\":\\"SUCCESS\\",\\"cache\\":true},\\"callbackTime\\":0,\\"enqueueWait\\":186,\\"duration\\":187},{\\"ts\\":5027.5,\\"context\\":{\\"id\\":\\"76;a\\",\\"abortable\\":true,\\"storable\\":true,\\"background\\":false,\\"cmp\\":\\"forceCommunity:richText\\",\\"def\\":\\"serviceComponent://ui.communities.components.aura.components.forceCommunity.richText.RichTextController/ACTION$getParsedRichTextValue\\",\\"state\\":\\"SUCCESS\\",\\"cache\\":true},\\"callbackTime\\":0,\\"enqueueWait\\":186,\\"duration\\":186},{\\"ts\\":5028.09,\\"context\\":{\\"id\\":\\"79;a\\",\\"abortable\\":true,\\"storable\\":true,\\"background\\":false,\\"cmp\\":\\"forceCommunity:richText\\",\\"def\\":\\"serviceComponent://ui.communities.components.aura.components.forceCommunity.richText.RichTextController/ACTION$getParsedRichTextValue\\",\\"state\\":\\"SUCCESS\\",\\"cache\\":true},\\"callbackTime\\":0,\\"enqueueWait\\":185,\\"duration\\":185},{\\"ts\\":5028.5,\\"context\\":{\\"id\\":\\"82;a\\",\\"abortable\\":true,\\"storable\\":true,\\"background\\":false,\\"cmp\\":\\"forceCommunity:richText\\",\\"def\\":\\"serviceComponent://ui.communities.components.aura.components.forceCommunity.richText.RichTextController/ACTION$getParsedRichTextValue\\",\\"state\\":\\"SUCCESS\\",\\"cache\\":true},\\"callbackTime\\":0,\\"enqueueWait\\":185,\\"duration\\":185},{\\"ts\\":5028.89,\\"context\\":{\\"id\\":\\"85;a\\",\\"abortable\\":true,\\"storable\\":true,\\"background\\":false,\\"cmp\\":\\"forceCommunity:richText\\",\\"def\\":\\"serviceComponent://ui.communities.components.aura.components.forceCommunity.richText.RichTextController/ACTION$getParsedRichTextValue\\",\\"state\\":\\"SUCCESS\\",\\"cache\\":true},\\"callbackTime\\":0,\\"enqueueWait\\":185,\\"duration\\":185},{\\"ts\\":5029.5,\\"context\\":{\\"id\\":\\"88;a\\",\\"abortable\\":true,\\"storable\\":true,\\"background\\":false,\\"cmp\\":\\"forceCommunity:richText\\",\\"def\\":\\"serviceComponent://ui.communities.components.aura.components.forceCommunity.richText.RichTextController/ACTION$getParsedRichTextValue\\",\\"state\\":\\"SUCCESS\\",\\"cache\\":true},\\"callbackTime\\":0,\\"enqueueWait\\":184,\\"duration\\":184},{\\"ts\\":5030,\\"context\\":{\\"id\\":\\"91;a\\",\\"abortable\\":true,\\"storable\\":true,\\"background\\":false,\\"cmp\\":\\"forceCommunity:richText\\",\\"def\\":\\"serviceComponent://ui.communities.components.aura.components.forceCommunity.richText.RichTextController/ACTION$getParsedRichTextValue\\",\\"state\\":\\"SUCCESS\\",\\"cache\\":true},\\"callbackTime\\":0,\\"enqueueWait\\":184,\\"duration\\":184},{\\"ts\\":5031.5,\\"context\\":{\\"id\\":\\"97;a\\",\\"abortable\\":true,\\"storable\\":true,\\"background\\":false,\\"cmp\\":\\"forceCommunity:richText\\",\\"def\\":\\"serviceComponent://ui.communities.components.aura.components.forceCommunity.richText.RichTextController/ACTION$getParsedRichTextValue\\",\\"state\\":\\"SUCCESS\\",\\"cache\\":true},\\"callbackTime\\":0,\\"enqueueWait\\":182,\\"duration\\":182},{\\"ts\\":5035.5,\\"context\\":{\\"id\\":\\"107;a\\",\\"abortable\\":true,\\"storable\\":true,\\"background\\":false,\\"cmp\\":\\"forceCommunity:managedContent\\",\\"def\\":\\"serviceComponent://ui.communities.components.aura.components.forceCommunity.managedContent.ManagedContentComponentController/ACTION$getRenderData\\",\\"state\\":\\"SUCCESS\\",\\"cache\\":true},\\"callbackTime\\":0,\\"enqueueWait\\":178,\\"duration\\":179},{\\"ts\\":5036.39,\\"context\\":{\\"id\\":\\"110;a\\",\\"abortable\\":true,\\"storable\\":true,\\"background\\":false,\\"cmp\\":\\"forceCommunity:richText\\",\\"def\\":\\"serviceComponent://ui.communities.components.aura.components.forceCommunity.richText.RichTextController/ACTION$getParsedRichTextValue\\",\\"state\\":\\"SUCCESS\\",\\"cache\\":true},\\"callbackTime\\":0,\\"enqueueWait\\":178,\\"duration\\":178},{\\"ts\\":5041.79,\\"context\\":{\\"id\\":\\"124;a\\",\\"abortable\\":true,\\"storable\\":true,\\"background\\":false,\\"cmp\\":\\"forceCommunity:richText\\",\\"def\\":\\"serviceComponent://ui.communities.components.aura.components.forceCommunity.richText.RichTextController/ACTION$getParsedRichTextValue\\",\\"state\\":\\"SUCCESS\\",\\"cache\\":true},\\"callbackTime\\":0,\\"enqueueWait\\":173,\\"duration\\":173},{\\"ts\\":5042.5,\\"context\\":{\\"id\\":\\"127;a\\",\\"abortable\\":true,\\"storable\\":true,\\"background\\":false,\\"cmp\\":\\"forceCommunity:managedContent\\",\\"def\\":\\"serviceComponent://ui.communities.components.aura.components.forceCommunity.managedContent.ManagedContentComponentController/ACTION$getRenderData\\",\\"state\\":\\"SUCCESS\\",\\"cache\\":true},\\"callbackTime\\":0,\\"enqueueWait\\":172,\\"duration\\":172},{\\"ts\\":5248.29,\\"context\\":{\\"id\\":\\"158;a\\",\\"abortable\\":false,\\"storable\\":false,\\"background\\":false,\\"cmp\\":\\"none\\",\\"def\\":\\"aura://ApexActionController/ACTION$execute\\",\\"state\\":\\"SUCCESS\\",\\"cache\\":false},\\"xhrWait\\":1,\\"enqueueWait\\":20,\\"serverTime\\":{\\"total\\":35,\\"db\\":1,\\"xhrServerTime\\":243,\\"boxCarCount\\":3},\\"callbackTime\\":0,\\"duration\\":1278},{\\"ts\\":5251.69,\\"context\\":{\\"id\\":\\"159;a\\",\\"abortable\\":false,\\"storable\\":false,\\"background\\":false,\\"cmp\\":\\"none\\",\\"def\\":\\"aura://ApexActionController/ACTION$execute\\",\\"state\\":\\"SUCCESS\\",\\"cache\\":false},\\"xhrWait\\":0,\\"enqueueWait\\":17,\\"serverTime\\":{\\"total\\":113,\\"db\\":3,\\"xhrServerTime\\":243,\\"boxCarCount\\":3},\\"callbackTime\\":0,\\"duration\\":1274},{\\"ts\\":5265.5,\\"context\\":{\\"id\\":\\"160;a\\",\\"abortable\\":false,\\"storable\\":false,\\"background\\":false,\\"cmp\\":\\"none\\",\\"def\\":\\"aura://ApexActionController/ACTION$execute\\",\\"state\\":\\"SUCCESS\\",\\"cache\\":false},\\"xhrWait\\":0,\\"enqueueWait\\":3,\\"serverTime\\":{\\"total\\":48,\\"db\\":6,\\"xhrServerTime\\":243,\\"boxCarCount\\":3},\\"callbackTime\\":0,\\"duration\\":1261}],\\"component\\":[{\\"totalCreateTime\\":71,\\"slowestCreates\\":[{\\"name\\":\\"siteforce-generatedpage-0445d9ba-a9d6-41ec-8b15-657f67386cc0.c165\\",\\"createCount\\":1,\\"createTimeTotal\\":55.8},{\\"name\\":\\"forceCommunity:bannerLayout\\",\\"createCount\\":2,\\"createTimeTotal\\":12.69},{\\"name\\":\\"force:recordGlobalValueProvider\\",\\"createCount\\":1,\\"createTimeTotal\\":2.5}]}]},\\"owner\\":\\"siteforce:routerInitializer\\",\\"unixTS\\":false,\\"ept\\":1710,\\"previousPage\\":{\\"context\\":\\"unknown\\",\\"attributes\\":{}},\\"attributes\\":{\\"designTime\\":false,\\"domain\\":\\"https://sf-uat.digitalboost.co.nz\\",\\"template\\":\\"Starter Template\\",\\"priorityDuration\\":{},\\"longTaskTotal\\":0,\\"longestTask\\":0,\\"network\\":{\\"rtt\\":100,\\"downlink\\":4.05,\\"maxAllowedParallelXHRs\\":6},\\"cores\\":8,\\"eptDeviation\\":false,\\"density\\":\\"UNKNOWN\\",\\"totalEpt\\":6609.19,\\"bootstrapType\\":\\"UNKNOWN\\",\\"defaultCmp\\":[],\\"gates\\":{\\"lds.useNewTrackedFieldBehavior\\":false,\\"scenarioTrackerEnabled.instrumentation.ltng\\":true,\\"scenarioTrackerMarksEnabled.instrumentation.ltng\\":false,\\"ui.services.PageScopedCache.enabled\\":true,\\"browserIdleTime.instrumentation.ltng\\":false,\\"clientTelemetry.instrumentation.ltng\\":true,\\"componentProfiler.instrumentation.ltng\\":false,\\"o11yAuraActionsEnabled.instrumentation.ltng\\":false,\\"o11yEnabled.instrumentation.ltng\\":true,\\"forceRecordMarksEnabled\\":false},\\"cdnEnabled\\":false,\\"uriDefsEnabled\\":false},\\"cacheStats\\":{\\"AuraStorage_actions\\":{\\"hits\\":22,\\"misses\\":0},\\"lds:Apex.getApex\\":{\\"hits\\":0,\\"misses\\":1},\\"total\\":{\\"hits\\":22,\\"misses\\":1}},\\"complexity\\":null,\\"sequence\\":1,\\"page\\":{\\"context\\":\\"home\\",\\"attributes\\":{\\"url\\":\\"/s/\\"}}}"},{"topic":"ailtn","schemaType":"LightningInteraction","payload":"{\\"id\\":\\"ltng:interaction\\",\\"ts\\":6615.5,\\"pageStartTime\\":1657100878460,\\"owner\\":null,\\"unixTS\\":false,\\"eventType\\":\\"system\\",\\"eventSource\\":\\"defsUsage\\",\\"attributes\\":{\\"defs\\":[\\"markup://aura:application\\",\\"markup://siteforce:baseApp\\",\\"markup://siteforce:communityApp\\",\\"markup://aura:component\\",\\"markup://siteforce:routerInitializer\\",\\"markup://siteforce:pageLoader\\",\\"layout://siteforce-generatedpage-0445d9ba-a9d6-41ec-8b15-657f67386cc0.c165\\",\\"markup://ui:asyncComponentManager\\",\\"markup://force:toastManager\\",\\"markup://aura:html\\",\\"markup://force:visualMessageQueue\\",\\"markup://aura:iteration\\",\\"markup://aura:expression\\",\\"markup://aura:if\\",\\"markup://force:hoverPrototypeManager\\",\\"markup://force:hoverPrototype\\",\\"markup://one:actionsManager\\",\\"markup://force:targetInteractionHandler\\",\\"markup://siteforce:conditional\\",\\"markup://force:massErrorsManager\\",\\"markup://siteforce:panelsContainer\\",\\"markup://siteforce:spinnerManager\\",\\"markup://siteforce:loadingBalls\\",\\"markup://siteforce:panelManager\\",\\"markup://ui:panelManager2\\",\\"markup://one:panelManager\\",\\"markup://ui:containerManager\\",\\"markup://forceContent:filesManager\\",\\"markup://forceContent:modalPreviewManager\\",\\"markup://force:hostConfig\\",\\"markup://forceCommunity:signalCollector\\",\\"markup://forceSearch:searchGDP\\",\\"markup://forceSearch:searchGDPCache\\",\\"markup://forceSearch:searchGDPCacheActivity\\",\\"markup://forceSearch:searchGDPCacheMrus\\",\\"markup://forceSearch:searchGDPCachePermsAndPrefs\\",\\"markup://forceSearch:searchGDPCacheResultsFilters\\",\\"markup://forceSearch:searchGDPCacheScopes\\",\\"markup://search_lightning:store\\",\\"markup://siteforce:systemErrorHandler\\",\\"markup://siteforce:customerErrorHandler\\",\\"markup://force:alohaUrlService\\",\\"markup://siteforce:navigationProvider\\",\\"markup://siteforce:qb\\",\\"markup://instrumentation:beacon\\",\\"markup://instrumentation:o11yCoreCollector\\",\\"markup://force:quickActionManager\\",\\"markup://forceChatter:editManager\\",\\"markup://siteforce:networkTracking\\",\\"markup://community_runtime:services\\",\\"layout://siteforce-generatedpage-3heHAYfjlUnSyiHGr93qAdPI2b8h4C.c165\\",\\"markup://siteforce:themeLayoutStarter\\",\\"markup://siteforce:contentArea\\",\\"markup://siteforce:runtimeRegion\\",\\"markup://siteforce:runtimeComponent\\",\\"markup://forceCommunity:richText\\",\\"markup://forceCommunity:htmlBlock\\",\\"markup://ui:outputRichText\\",\\"markup://forceCommunity:outputRichText\\",\\"markup://aura:unescapedHtml\\",\\"markup://force:skipLink\\",\\"markup://forceChatter:feedEventsProcessor\\",\\"markup://forceCommunity:psscFeedsProxy\\",\\"markup://siteforce:runtimeMode\\",\\"markup://aura:text\\",\\"markup://siteforce:hiddenRegion\\",\\"markup://forceCommunity:seoAssistant\\",\\"markup://siteforce:dynamicLayout\\",\\"markup://forceCommunity:section\\",\\"markup://c:digitalBoostHeaderWithVideo\\",\\"markup://c:digitalBoostTitle\\",\\"markup://forceCommunity:richTextInline\\",\\"markup://c:digitalBoostVideoContentTileSingle\\",\\"markup://forceCommunity:managedContent\\",\\"markup://forceCommunity:bannerLayout\\",\\"markup://c:digitalBoostVideoContentTiles\\",\\"markup://lightning:navigation\\",\\"markup://sfdc_cms:videoPlayer\\",\\"markup://force:recordGlobalValueProvider\\",\\"markup://force:adsBridge\\"],\\"pageCounter\\":1,\\"phase\\":\\"EPT\\",\\"pageViewCounter\\":1,\\"cdnEnabled\\":false,\\"uriDefsEnabled\\":false,\\"gates\\":{}},\\"locator\\":{\\"target\\":\\"defsUsage\\",\\"scope\\":\\"defsUsage\\"},\\"sequence\\":2,\\"page\\":{\\"context\\":\\"home\\",\\"attributes\\":{\\"url\\":\\"/s/\\"}}}"}],"traces":"[]","metrics":"[{\\"owner\\":\\"LIGHTNING.lds.service\\",\\"name\\":\\"request.Apex.getApex\\",\\"type\\":\\"Counter\\",\\"ts\\":1657100883706,\\"value\\":1},{\\"owner\\":\\"LIGHTNING.lds.service\\",\\"name\\":\\"request\\",\\"type\\":\\"Counter\\",\\"ts\\":1657100883707,\\"value\\":1},{\\"owner\\":\\"Instrumentation\\",\\"name\\":\\"bwUsageReceived.beforeEpt.bytes\\",\\"type\\":\\"PercentileHistogram\\",\\"ts\\":1657100885069,\\"value\\":[103900]},{\\"owner\\":\\"Instrumentation\\",\\"name\\":\\"bwUsageSent.beforeEpt.bytes\\",\\"type\\":\\"PercentileHistogram\\",\\"ts\\":1657100885069,\\"value\\":[20835]},{\\"owner\\":\\"Instrumentation\\",\\"name\\":\\"pageview.ept.ms\\",\\"type\\":\\"PercentileHistogram\\",\\"ts\\":1657100885075,\\"value\\":[1710]},{\\"owner\\":\\"lds\\",\\"name\\":\\"ads-bridge-evict-duration\\",\\"type\\":\\"PercentileHistogram\\",\\"ts\\":1657100884884,\\"value\\":[1,1]},{\\"name\\":\\"cache-policy-undefined\\",\\"owner\\":\\"lds\\",\\"type\\":\\"Counter\\",\\"ts\\":1657100883707,\\"value\\":1,\\"tags\\":{\\"status\\":\\"success\\"}},{\\"name\\":\\"cache-miss-count\\",\\"owner\\":\\"lds\\",\\"type\\":\\"Counter\\",\\"ts\\":1657100885005,\\"value\\":1,\\"tags\\":{\\"status\\":\\"success\\"}},{\\"name\\":\\"cache-miss-count.Apex.getApex\\",\\"owner\\":\\"lds\\",\\"type\\":\\"Counter\\",\\"ts\\":1657100885005,\\"value\\":1,\\"tags\\":{\\"status\\":\\"success\\"}},{\\"name\\":\\"request.Apex.getApex\\",\\"owner\\":\\"LIGHTNING.lds.service\\",\\"type\\":\\"Counter\\",\\"ts\\":1657100883707,\\"value\\":1,\\"tags\\":{\\"status\\":\\"success\\"}},{\\"name\\":\\"request\\",\\"owner\\":\\"LIGHTNING.lds.service\\",\\"type\\":\\"Counter\\",\\"ts\\":1657100883707,\\"value\\":1,\\"tags\\":{\\"status\\":\\"success\\"}},{\\"name\\":\\"store-size-count\\",\\"owner\\":\\"lds\\",\\"type\\":\\"PercentileHistogram\\",\\"ts\\":1657100884884,\\"value\\":[0,0],\\"tags\\":{\\"status\\":\\"success\\"}},{\\"name\\":\\"store-snapshot-subscriptions-count\\",\\"owner\\":\\"lds\\",\\"type\\":\\"PercentileHistogram\\",\\"ts\\":1657100884884,\\"value\\":[0,0],\\"tags\\":{\\"status\\":\\"success\\"}},{\\"name\\":\\"store-watch-subscriptions-count\\",\\"owner\\":\\"lds\\",\\"type\\":\\"PercentileHistogram\\",\\"ts\\":1657100884884,\\"value\\":[2,2],\\"tags\\":{\\"status\\":\\"success\\"}},{\\"name\\":\\"store-broadcast-duration\\",\\"owner\\":\\"lds\\",\\"type\\":\\"PercentileHistogram\\",\\"ts\\":1657100884988,\\"value\\":[0,0,0,0,0],\\"tags\\":{\\"status\\":\\"success\\"}},{\\"name\\":\\"store-ingest-duration\\",\\"owner\\":\\"lds\\",\\"type\\":\\"PercentileHistogram\\",\\"ts\\":1657100884988,\\"value\\":[0,0,0],\\"tags\\":{\\"status\\":\\"success\\"}},{\\"name\\":\\"store-lookup-duration\\",\\"owner\\":\\"lds\\",\\"type\\":\\"PercentileHistogram\\",\\"ts\\":1657100884988,\\"value\\":[0,0,0],\\"tags\\":{\\"status\\":\\"success\\"}},{\\"name\\":\\"cache-miss-duration.Apex.getApex\\",\\"owner\\":\\"lds\\",\\"type\\":\\"PercentileHistogram\\",\\"ts\\":1657100885001,\\"value\\":[1294],\\"tags\\":{\\"status\\":\\"success\\"}}]","o11yLogs":"CiEKBG8xMXkRAEjFjS4deEIYASAAKAAyCDIzOC4yNC4wOAAShQgKG3NmLmluc3RydW1lbnRhdGlvbi5BY3Rpdml0eRKDAgnNrG+NLh14QhJYChBjZmE0YmYyZTk4YTA0ZGQ0EgxBcGV4LmdldEFwZXgZAADNzMw4lEAiKQoZc2YuaW5zdHJ1bWVudGF0aW9uLlNpbXBsZRIMCgpjYWNoZS1taXNzUABYABkAAACgmX60QCIgZjU3YjhiOWQxNDZhN2Q2MjdiZjRjNTBiM2FkYjVjNTMoATIDbGRzOjkKEnNmLmxleC5QYWdlUGF5bG9hZBIjCAAiD1BMQUNFSE9MREVSX1VSTDIOUExBQ0VIT0xERVJfSURCFnNpdGVmb3JjZTpjb21tdW5pdHlBcHBKAjRnUhUKEXNmLmxleC5BcHBQYXlsb2FkEgAS3wUJZjZcjS4deEISwgQKIGY1N2I4YjlkMTQ2YTdkNjI3YmY0YzUwYjNhZGI1YzUzEg9MZXhSb290QWN0aXZpdHkZAIBmZmYumkAi/QMKFHNmLmxleC5QYWdldmlld0RyYWZ0EuQDCAERAAAAAAC4mkApehSuR2HqqEBBAAAAAAAAAABJAAAAAAAAAABoAJgBAKIBB1VOS05PV06yAStzY2VuYXJpb1RyYWNrZXJFbmFibGVkLmluc3RydW1lbnRhdGlvbi5sdG5nsgEjdWkuc2VydmljZXMuUGFnZVNjb3BlZENhY2hlLmVuYWJsZWSyASRjbGllbnRUZWxlbWV0cnkuaW5zdHJ1bWVudGF0aW9uLmx0bmeyASBvMTF5RW5hYmxlZC5pbnN0cnVtZW50YXRpb24ubHRuZ7oBHmxkcy51c2VOZXdUcmFja2VkRmllbGRCZWhhdmlvcroBMHNjZW5hcmlvVHJhY2tlck1hcmtzRW5hYmxlZC5pbnN0cnVtZW50YXRpb24ubHRuZ7oBJGJyb3dzZXJJZGxlVGltZS5pbnN0cnVtZW50YXRpb24ubHRuZ7oBJmNvbXBvbmVudFByb2ZpbGVyLmluc3RydW1lbnRhdGlvbi5sdG5nugErbzExeUF1cmFBY3Rpb25zRW5hYmxlZC5pbnN0cnVtZW50YXRpb24ubHRuZ/ABCKoCD1BMQUNFSE9MREVSX1VSTLoCDlBMQUNFSE9MREVSX0lEyAIB2AKFsPYJ4AKH79QSiQMAAAAAANB6QEABUABYABkAAAAwM0ezQCgCMhZzaXRlZm9yY2U6Y29tbXVuaXR5QXBwOjkKEnNmLmxleC5QYWdlUGF5bG9hZBIjCAEiD1BMQUNFSE9MREVSX1VSTDIOUExBQ0VIT0xERVJfSURCFnNpdGVmb3JjZTpjb21tdW5pdHlBcHBKAjRnUhUKEXNmLmxleC5BcHBQYXlsb2FkEgAaACIA"}}]}',
        'aura.context':
          '{"mode":"PROD","fwuid":"QPQi8lbYE8YujG6og6Dqgw","app":"siteforce:communityApp","loaded":{"APPLICATION@markup://siteforce:communityApp":"0DbugOKt-DnBZOgYmuPNFg","COMPONENT@markup://instrumentation:o11yCoreCollector":"8089lZkrpgraL8-V8KZXNw"},"dn":[],"globals":{},"uad":false}',
        'aura.pageURI': '/s/?language=en_NZ',
        'aura.token': 'null',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'x-sfdc-page-cache': '47f1783493aa7a16',
          'x-sfdc-page-scope-id': '18cf89b4-96d7-4dbb-b6b7-b07bcf84a434',
          'x-sfdc-request-id': '661769000033bd3235',
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.post(
      'https://sf-uat.digitalboost.co.nz/s/sfsites/aura?r=5&ui-comm-runtime-components-aura-components-siteforce-network-tracking.NetworkTracking.createLogRecord=1',
      {
        message:
          '{"actions":[{"id":"202;a","descriptor":"serviceComponent://ui.comm.runtime.components.aura.components.siteforce.network.tracking.NetworkTrackingController/ACTION$createLogRecord","callingDescriptor":"UNKNOWN","params":{"viewId":"0I30K00000O3M4R","pageId":"0I30K00000O3M6V","networkTrackingCookieValue":"151801c6-8096-4d54-9290-1f4f0325e826"}}]}',
        'aura.context':
          '{"mode":"PROD","fwuid":"QPQi8lbYE8YujG6og6Dqgw","app":"siteforce:communityApp","loaded":{"APPLICATION@markup://siteforce:communityApp":"0DbugOKt-DnBZOgYmuPNFg","COMPONENT@markup://instrumentation:o11yCoreCollector":"8089lZkrpgraL8-V8KZXNw"},"dn":[],"globals":{},"uad":false}',
        'aura.pageURI': '/s/?language=en_NZ',
        'aura.token': 'null',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'x-sfdc-page-cache': '47f1783493aa7a16',
          'x-sfdc-page-scope-id': '18cf89b4-96d7-4dbb-b6b7-b07bcf84a434',
          'x-sfdc-request-id': '6619590000a0fe6ed2',
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )
    sleep(5.8)
  })

  group('page_2 - https://sf-uat.digitalboost.co.nz/s/login', function () {
    response = http.get('https://sf-uat.digitalboost.co.nz/s/login', {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })
    sleep(1.6)

    response = http.get('https://www.googletagmanager.com/gtm.js?id=GTM-WJHGD6T', {
      headers: {
        'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })

    response = http.get('https://static.hotjar.com/c/hotjar-2216500.js?sv=6', {
      headers: {
        'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })

    response = http.get('https://snap.licdn.com/li.lms-analytics/insight.min.js', {
      headers: {
        'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })

    response = http.get('https://munchkin.marketo.net/munchkin.js', {
      headers: {
        'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })

    response = http.get('https://munchkin.marketo.net/161/munchkin.js', {
      headers: {
        'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })

    response = http.get(
      'https://www.googletagmanager.com/gtag/js?id=G-F6RSJKSH3D&l=dataLayer&cx=c',
      {
        headers: {
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.post(
      'https://354-zfw-077.mktoresp.com/webevents/visitWebPage?_mchNc=1657100892672&_mchCn=&_mchId=354-ZFW-077&_mchTk=_mch-digitalboost.co.nz-1657097811094-76840&_mchHo=sf-uat.digitalboost.co.nz&_mchPo=&_mchRu=%2Fs%2Flogin%2F&_mchPc=https%3A&_mchVr=161&_mchEcid=&_mchHa=&_mchRe=https%3A%2F%2Fsf-uat.digitalboost.co.nz%2Fs%2F%3Flanguage%3Den_NZ&_mchQp=language%3Den_NZ',
      null,
      {
        headers: {
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get('https://script.hotjar.com/modules.eaa59710f7e60ac1d235.js', {
      headers: {
        'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })
    sleep(2.4)

    response = http.post(
      'https://sf-uat.digitalboost.co.nz/s/sfsites/aura?r=0&aura.ApexAction.execute=2&ui-communities-components-aura-components-forceCommunity-richText.RichText.getParsedRichTextValue=1',
      {
        message:
          '{"actions":[{"id":"62;a","descriptor":"serviceComponent://ui.communities.components.aura.components.forceCommunity.richText.RichTextController/ACTION$getParsedRichTextValue","callingDescriptor":"UNKNOWN","params":{"html":"<div class=\\"slds-text-align_center footer-brand\\">\\n    <h1 class=\\"footer-title slds-m-bottom_large\\">Got questions? We\'re happy to help.</h1>\\n    <p class=\\"footer-content slds-m-bottom_xx-large\\">To learn more about how Digital Boost can help you, get in touch today</p>\\n    <a class=\\"dg-btn dg-btn-brand\\" href=\\"/s/help\\">\\n        <span class=\\"icon-media_xx-small\\"></span>\\n        <span>GET IN TOUCH</span>\\n    </a> \\n    <div class=\\"slds-m-vertical_xx-large footer-logos\\">\\n        <ul class=\\"slds-p-vertical_large dg-list dg-list_inline slds-grid slds-grid_align-spread\\" style=\\"max-width: 320px; margin: 0 auto;\\">\\n    \\t\\t<li><a href=\\"https://www.facebook.com/DigitalBoostNZ/\\" target=\\"_blank\\"><img src=\\"{!contentAsset.footer_facebook.1}\\" width=\\"32\\" /></a></li>\\n            <li><a href=\\"https://nz.linkedin.com/company/digitalboostnz\\" target=\\"_blank\\"><img src=\\"{!contentAsset.footer_linkedin.1}\\" width=\\"32\\" /></a></li>\\n            <li><a href=\\"https://www.instagram.com/digitalboostnz/\\" target=\\"_blank\\"><img src=\\"{!contentAsset.footer_instagram.1}\\" width=\\"32\\" /></a></li>\\n            <li><a href=\\"https://www.youtube.com/c/digitalboost\\" target=\\"_blank\\"><img src=\\"{!contentAsset.footer_youtube.1}\\" width=\\"32\\" /></a></li>\\t\\n\\t\\t</ul>\\n        <ul class=\\"slds-p-vertical_medium dg-list dg-list_inline slds-grid slds-grid_align-spread slds-wrap\\" style=\\"max-width: 600px; margin: 0 auto; align-items: center;\\">\\n            <span class=\\"footer-broughtby\\"><b>Brought to you by</b></span>\\n            <li class=\\"footer-mbie\\"><a href=\\"https://www.business.govt.nz/\\" target=\\"_blank\\"><img src=\\"{!contentAsset.footer_mbie.1}\\" width=\\"130\\"/></a></li>\\n    \\t\\t<li class=\\"footer-tml\\"><a href=\\"https://themindlab.com\\" target=\\"_blank\\"><img src=\\"{!contentAsset.footer_tml.1}\\" width=\\"130\\" /></a></li> \\n\\t\\t</ul>\\n        <ul class=\\"slds-p-vertical_medium dg-list dg-list_inline slds-grid slds-grid_align-spread slds-grid_vertical-align-center slds-wrap footer-terms\\" style=\\"margin: 0 auto;\\">\\n            <li class=\\"footer-google\\"><a href=\\"https://play.google.com/store/apps/details?id=nz.co.digitalboost.live\\" target=\\"_blank\\"><img src=\\"{!contentAsset.footer_googleplay2.1}\\" style=\\"height: 28px\\"/></a></li>\\n            <li class=\\"footer-ios\\"><a href=\\"https://apps.apple.com/al/app/digital-boost-live/id1580326501\\" target=\\"_blank\\"><img src=\\"{!contentAsset.footer_iosapp.1}\\" style=\\"height: 28px\\"/></a></li>\\n            <li><a href=\\"/s/terms\\" target=\\"_blank\\">Terms & Conditions</a></li>\\n            <li><a href=\\"/s/privacy\\" target=\\"_blank\\">Privacy Policy</a></li>\\n            <li><a href=\\"/s/help\\" target=\\"_blank\\">Contact</a></li>\\n            <li class=\\"footer-content_dark\\">©2022 BUSINESS.GOVT.NZ</li>\\n        </ul>\\n    </div>\\n</div>"},"version":"55.0","storable":true},{"id":"41;a","descriptor":"aura://ApexActionController/ACTION$execute","callingDescriptor":"UNKNOWN","params":{"namespace":"","classname":"db_HeaderConfig","method":"isEnableGlobalSearch","cacheable":false,"isContinuation":false}},{"id":"42;a","descriptor":"aura://ApexActionController/ACTION$execute","callingDescriptor":"UNKNOWN","params":{"namespace":"","classname":"db_LangSwitcherController","method":"getAvailableLanguages","cacheable":true,"isContinuation":false}}]}',
        'aura.context':
          '{"mode":"PROD","fwuid":"QPQi8lbYE8YujG6og6Dqgw","app":"siteforce:loginApp2","loaded":{"APPLICATION@markup://siteforce:loginApp2":"SzXgejmF9-yxZZjm-2nuZQ"},"dn":[],"globals":{},"uad":false}',
        'aura.pageURI': '/s/login/?language=en_NZ',
        'aura.token': 'null',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'x-sfdc-page-scope-id': '491ce930-b3cb-4155-bc46-ded4dc340e5d',
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.post(
      'https://sf-uat.digitalboost.co.nz/s/sfsites/aura?r=1&aura.ApexAction.execute=1',
      {
        message:
          '{"actions":[{"id":"66;a","descriptor":"aura://ApexActionController/ACTION$execute","callingDescriptor":"UNKNOWN","params":{"namespace":"","classname":"db_AuthenticationController","method":"isLoggedIn","cacheable":false,"isContinuation":false}}]}',
        'aura.context':
          '{"mode":"PROD","fwuid":"QPQi8lbYE8YujG6og6Dqgw","app":"siteforce:loginApp2","loaded":{"APPLICATION@markup://siteforce:loginApp2":"SzXgejmF9-yxZZjm-2nuZQ"},"dn":[],"globals":{},"uad":false}',
        'aura.pageURI': '/s/login/?language=en_NZ',
        'aura.token': 'null',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'x-sfdc-page-scope-id': '491ce930-b3cb-4155-bc46-ded4dc340e5d',
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get(
      'https://fonts.googleapis.com/css?family=Open+Sans:400,600&subset=cyrillic',
      {
        headers: {
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.post(
      'https://sf-uat.digitalboost.co.nz/s/sfsites/aura?r=2&ui-comm-runtime-components-aura-components-siteforce-qb.Quarterback.getAllowedPostMessageOrigins=1',
      {
        message:
          '{"actions":[{"id":"72;a","descriptor":"serviceComponent://ui.comm.runtime.components.aura.components.siteforce.qb.QuarterbackController/ACTION$getAllowedPostMessageOrigins","callingDescriptor":"UNKNOWN","params":{}}]}',
        'aura.context':
          '{"mode":"PROD","fwuid":"QPQi8lbYE8YujG6og6Dqgw","app":"siteforce:loginApp2","loaded":{"APPLICATION@markup://siteforce:loginApp2":"SzXgejmF9-yxZZjm-2nuZQ"},"dn":[],"globals":{},"uad":false}',
        'aura.pageURI': '/s/login/?language=en_NZ',
        'aura.token': 'null',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'x-sfdc-page-scope-id': '491ce930-b3cb-4155-bc46-ded4dc340e5d',
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.post(
      'https://in.hotjar.com/api/v2/client/sites/2216500/visit-data?sv=6',
      '{"r_value":1,"is_vpv":false,"session_only":false,"rec_value":1,"user_id":"e325c836-73c9-5f75-850d-749356cb6e87"}',
      {
        headers: {
          'content-type': 'text/plain; charset=UTF-8',
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )
    sleep(8)

    response = http.post(
      'https://sf-uat.digitalboost.co.nz/s/sfsites/aura?r=3&aura.ApexAction.execute=1',
      {
        message:
          '{"actions":[{"id":"73;a","descriptor":"aura://ApexActionController/ACTION$execute","callingDescriptor":"UNKNOWN","params":{"namespace":"","classname":"db_AuthenticationController","method":"login","params":{"theUser":{"email":"Bob+testing01@mailinator.com","password":"P@ssw@rd1"},"settings":{}},"cacheable":false,"isContinuation":false}}]}',
        'aura.context':
          '{"mode":"PROD","fwuid":"QPQi8lbYE8YujG6og6Dqgw","app":"siteforce:loginApp2","loaded":{"APPLICATION@markup://siteforce:loginApp2":"SzXgejmF9-yxZZjm-2nuZQ"},"dn":[],"globals":{},"uad":false}',
        'aura.pageURI': '/s/login/?language=en_NZ',
        'aura.token': 'null',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'x-sfdc-page-scope-id': '491ce930-b3cb-4155-bc46-ded4dc340e5d',
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )
    sleep(0.5)
  })

  group(
    'page_3 - https://sf-uat.digitalboost.co.nz/secur/frontdoor.jsp?allp=1&apv=1&cshc=w000003tz08w0000000u7h&refURL=https%3A%2F%2Fsf-uat.digitalboost.co.nz%2Fsecur%2Ffrontdoor.jsp&retURL=%2Fapex%2FCommunitiesLanding&sid=00D0w0000000u7h%21AQYAQNi_L6XlQJ6AxVY6pYoUR4t8l0kcYSOBa7ebL.wIFcxCPnOGGxnnuyullQWOyETGV9ohRCtochgcL5fuRjr_haqKnTJF&untethered=',
    function () {
      response = http.get(
        'https://sf-uat.digitalboost.co.nz/secur/frontdoor.jsp?allp=1&apv=1&cshc=w000003tz08w0000000u7h&refURL=https%3A%2F%2Fsf-uat.digitalboost.co.nz%2Fsecur%2Ffrontdoor.jsp&retURL=%2Fapex%2FCommunitiesLanding&sid=00D0w0000000u7h%21AQYAQNi_L6XlQJ6AxVY6pYoUR4t8l0kcYSOBa7ebL.wIFcxCPnOGGxnnuyullQWOyETGV9ohRCtochgcL5fuRjr_haqKnTJF&untethered=',
        {
          headers: {
            'upgrade-insecure-requests': '1',
            'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
          },
        }
      )
      sleep(0.9)
      response = http.get(
        'https://fonts.googleapis.com/css?family=Open+Sans:400,600&subset=cyrillic',
        {
          headers: {
            'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
          },
        }
      )
      sleep(0.5)
    }
  )

  group('page_4 - https://sf-uat.digitalboost.co.nz/apex/CommunitiesLanding', function () {
    response = http.get('https://sf-uat.digitalboost.co.nz/apex/CommunitiesLanding', {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })
    sleep(1.9)
  })

  group('page_5 - https://sf-uat.digitalboost.co.nz/s/', function () {
    response = http.get('https://sf-uat.digitalboost.co.nz/s/', {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })
    sleep(0.8)

    response = http.get('https://www.googletagmanager.com/gtm.js?id=GTM-WJHGD6T', {
      headers: {
        'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })

    response = http.get('https://snap.licdn.com/li.lms-analytics/insight.min.js', {
      headers: {
        'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })

    response = http.get('https://munchkin.marketo.net/munchkin.js', {
      headers: {
        'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })

    response = http.get('https://munchkin.marketo.net/161/munchkin.js', {
      headers: {
        'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })

    response = http.get(
      'https://www.googletagmanager.com/gtag/js?id=G-F6RSJKSH3D&l=dataLayer&cx=c',
      {
        headers: {
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.post(
      'https://354-zfw-077.mktoresp.com/webevents/visitWebPage?_mchNc=1657100908675&_mchCn=&_mchId=354-ZFW-077&_mchTk=_mch-digitalboost.co.nz-1657097811094-76840&_mchHo=sf-uat.digitalboost.co.nz&_mchPo=&_mchRu=%2Fs%2F&_mchPc=https%3A&_mchVr=161&_mchEcid=&_mchHa=&_mchRe=https%3A%2F%2Fsf-uat.digitalboost.co.nz%2Fapex%2FCommunitiesLanding&_mchQp=',
      null,
      {
        headers: {
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )
    sleep(2.5)

    response = http.post(
      'https://sf-uat.digitalboost.co.nz/s/sfsites/aura?r=0&ui-comm-runtime-components-aura-components-siteforce-controller.PubliclyCacheableComponentLoader.getPageComponent=1',
      {
        message:
          '{"actions":[{"id":"2;a","descriptor":"serviceComponent://ui.comm.runtime.components.aura.components.siteforce.controller.PubliclyCacheableComponentLoaderController/ACTION$getPageComponent","callingDescriptor":"UNKNOWN","params":{"attributes":{"viewId":"17345060-71dd-4a97-8493-4869f063b490","routeType":"home","themeLayoutType":"wJL7CB9WdL0fo4dhjB4kpIaAJ1BVzf","params":{"viewid":"2822bae0-7702-4d39-9fb7-0e2fe32929ce","view_uddid":"","entity_name":"","audience_name":"","picasso_id":"","routeId":""},"hasAttrVaringCmps":false,"pageLoadType":"STANDARD_PAGE_CONTENT","includeLayout":true},"publishedChangelistNum":165,"brandingSetId":"a9f924c5-b136-4e62-be0a-8772934234ce"}}]}',
        'aura.context':
          '{"mode":"PROD","fwuid":"QPQi8lbYE8YujG6og6Dqgw","app":"siteforce:communityApp","loaded":{"APPLICATION@markup://siteforce:communityApp":"0DbugOKt-DnBZOgYmuPNFg"},"dn":[],"globals":{},"uad":false}',
        'aura.pageURI': '/s/',
        'aura.token':
          'eyJub25jZSI6Im5PdU1SUWxHTEhzaFVhY3Rmc0dZS3BJYWJBQUI1b0ZhQ2xuWDctMFoyTWNcdTAwM2QiLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImtpZCI6IntcInRcIjpcIjAwRDB3MDAwMDAwOGI0YlwiLFwidlwiOlwiMDJHMHcwMDAwMDAwWXFjXCIsXCJhXCI6XCJjYWltYW5zaWduZXJcIn0iLCJjcml0IjpbImlhdCJdLCJpYXQiOjE2NTcxMDA5MDc4NzEsImV4cCI6MH0=..Y2XRo_Diq2hBNMqBN7asLukqOU3JTaprGjgsBv_zx88=',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'x-sfdc-page-scope-id': '74bc52c3-9e56-4deb-9e69-c634f02826a2',
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.post(
      'https://sf-uat.digitalboost.co.nz/s/sfsites/aura?r=1&ui-comm-runtime-components-aura-components-siteforce-controller.PubliclyCacheableComponentLoader.getAudienceTargetedPageComponent=1',
      {
        message:
          '{"actions":[{"id":"3;a","descriptor":"serviceComponent://ui.comm.runtime.components.aura.components.siteforce.controller.PubliclyCacheableComponentLoaderController/ACTION$getAudienceTargetedPageComponent","callingDescriptor":"UNKNOWN","params":{"attributes":{"viewId":"17345060-71dd-4a97-8493-4869f063b490","routeType":"home","themeLayoutType":"wJL7CB9WdL0fo4dhjB4kpIaAJ1BVzf","params":{"viewid":"2822bae0-7702-4d39-9fb7-0e2fe32929ce","view_uddid":"","entity_name":"","audience_name":"","picasso_id":"","routeId":""},"hasAttrVaringCmps":false,"pageLoadType":"AUDIENCE_TARGETED_PAGE_CONTENT"},"publishedChangelistNum":165,"brandingSetId":"a9f924c5-b136-4e62-be0a-8772934234ce"}}]}',
        'aura.context':
          '{"mode":"PROD","fwuid":"QPQi8lbYE8YujG6og6Dqgw","app":"siteforce:communityApp","loaded":{"APPLICATION@markup://siteforce:communityApp":"0DbugOKt-DnBZOgYmuPNFg"},"dn":[],"globals":{},"uad":false}',
        'aura.pageURI': '/s/',
        'aura.token':
          'eyJub25jZSI6Im5PdU1SUWxHTEhzaFVhY3Rmc0dZS3BJYWJBQUI1b0ZhQ2xuWDctMFoyTWNcdTAwM2QiLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImtpZCI6IntcInRcIjpcIjAwRDB3MDAwMDAwOGI0YlwiLFwidlwiOlwiMDJHMHcwMDAwMDAwWXFjXCIsXCJhXCI6XCJjYWltYW5zaWduZXJcIn0iLCJjcml0IjpbImlhdCJdLCJpYXQiOjE2NTcxMDA5MDc4NzEsImV4cCI6MH0=..Y2XRo_Diq2hBNMqBN7asLukqOU3JTaprGjgsBv_zx88=',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'x-sfdc-page-scope-id': '74bc52c3-9e56-4deb-9e69-c634f02826a2',
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.post(
      'https://sf-uat.digitalboost.co.nz/s/sfsites/aura?r=2&aura.RecordUi.getRecordWithFields=1',
      {
        message:
          '{"actions":[{"id":"61;a","descriptor":"aura://RecordUiController/ACTION$getRecordWithFields","callingDescriptor":"UNKNOWN","params":{"recordId":"0050w000003tz08AAA","fields":["User.Contact.Digital_Assessment_Complete__c"]}}]}',
        'aura.context':
          '{"mode":"PROD","fwuid":"QPQi8lbYE8YujG6og6Dqgw","app":"siteforce:communityApp","loaded":{"APPLICATION@markup://siteforce:communityApp":"0DbugOKt-DnBZOgYmuPNFg"},"dn":[],"globals":{},"uad":false}',
        'aura.pageURI': '/s/',
        'aura.token':
          'eyJub25jZSI6Im5PdU1SUWxHTEhzaFVhY3Rmc0dZS3BJYWJBQUI1b0ZhQ2xuWDctMFoyTWNcdTAwM2QiLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImtpZCI6IntcInRcIjpcIjAwRDB3MDAwMDAwOGI0YlwiLFwidlwiOlwiMDJHMHcwMDAwMDAwWXFjXCIsXCJhXCI6XCJjYWltYW5zaWduZXJcIn0iLCJjcml0IjpbImlhdCJdLCJpYXQiOjE2NTcxMDA5MDc4NzEsImV4cCI6MH0=..Y2XRo_Diq2hBNMqBN7asLukqOU3JTaprGjgsBv_zx88=',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'x-sfdc-page-cache': 'eb0d0f8eb1bdcac8',
          'x-sfdc-page-scope-id': '74bc52c3-9e56-4deb-9e69-c634f02826a2',
          'x-sfdc-request-id': '3637100000c37d41f8',
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.post(
      'https://sf-uat.digitalboost.co.nz/s/sfsites/aura?r=3&aura.RecordUi.getRecordWithFields=1',
      {
        message:
          '{"actions":[{"id":"64;a","descriptor":"aura://RecordUiController/ACTION$getRecordWithFields","callingDescriptor":"UNKNOWN","params":{"recordId":"0050w000003tz08AAA","fields":["User.FirstName"]}}]}',
        'aura.context':
          '{"mode":"PROD","fwuid":"QPQi8lbYE8YujG6og6Dqgw","app":"siteforce:communityApp","loaded":{"APPLICATION@markup://siteforce:communityApp":"0DbugOKt-DnBZOgYmuPNFg"},"dn":[],"globals":{},"uad":false}',
        'aura.pageURI': '/s/',
        'aura.token':
          'eyJub25jZSI6Im5PdU1SUWxHTEhzaFVhY3Rmc0dZS3BJYWJBQUI1b0ZhQ2xuWDctMFoyTWNcdTAwM2QiLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImtpZCI6IntcInRcIjpcIjAwRDB3MDAwMDAwOGI0YlwiLFwidlwiOlwiMDJHMHcwMDAwMDAwWXFjXCIsXCJhXCI6XCJjYWltYW5zaWduZXJcIn0iLCJjcml0IjpbImlhdCJdLCJpYXQiOjE2NTcxMDA5MDc4NzEsImV4cCI6MH0=..Y2XRo_Diq2hBNMqBN7asLukqOU3JTaprGjgsBv_zx88=',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'x-sfdc-page-cache': 'eb0d0f8eb1bdcac8',
          'x-sfdc-page-scope-id': '74bc52c3-9e56-4deb-9e69-c634f02826a2',
          'x-sfdc-request-id': '364400000066d0db32',
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.post(
      'https://sf-uat.digitalboost.co.nz/s/sfsites/aura?r=4&aura.Component.getComponentDef=1',
      {
        message:
          '{"actions":[{"id":"66;a","descriptor":"aura://ComponentController/ACTION$getComponentDef","callingDescriptor":"UNKNOWN","params":{"name":"lightning:iconSvgTemplatesUtility"}}]}',
        'aura.context':
          '{"mode":"PROD","fwuid":"QPQi8lbYE8YujG6og6Dqgw","app":"siteforce:communityApp","loaded":{"APPLICATION@markup://siteforce:communityApp":"0DbugOKt-DnBZOgYmuPNFg"},"dn":[],"globals":{},"uad":false}',
        'aura.pageURI': '/s/',
        'aura.token':
          'eyJub25jZSI6Im5PdU1SUWxHTEhzaFVhY3Rmc0dZS3BJYWJBQUI1b0ZhQ2xuWDctMFoyTWNcdTAwM2QiLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImtpZCI6IntcInRcIjpcIjAwRDB3MDAwMDAwOGI0YlwiLFwidlwiOlwiMDJHMHcwMDAwMDAwWXFjXCIsXCJhXCI6XCJjYWltYW5zaWduZXJcIn0iLCJjcml0IjpbImlhdCJdLCJpYXQiOjE2NTcxMDA5MDc4NzEsImV4cCI6MH0=..Y2XRo_Diq2hBNMqBN7asLukqOU3JTaprGjgsBv_zx88=',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'x-sfdc-page-cache': 'eb0d0f8eb1bdcac8',
          'x-sfdc-page-scope-id': '74bc52c3-9e56-4deb-9e69-c634f02826a2',
          'x-sfdc-request-id': '3654390000c035ff96',
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.post(
      'https://sf-uat.digitalboost.co.nz/s/sfsites/aura?r=5&aura.ApexAction.execute=3&aura.Component.getComponent=1&ui-chatter-components-messages.Messages.getMessagingPermAndPref=1&ui-communities-components-aura-components-forceCommunity-richText.RichText.getParsedRichTextValue=1&ui-force-components-controllers-hostConfig.HostConfig.getConfigData=1',
      {
        message:
          '{"actions":[{"id":"28;a","descriptor":"aura://ComponentController/ACTION$getComponent","callingDescriptor":"UNKNOWN","params":{"name":"markup://instrumentation:o11yCoreCollector","attributes":{"aura:id":"o11yCoreCollector","accessible":true}}},{"id":"32;a","descriptor":"serviceComponent://ui.chatter.components.messages.MessagesController/ACTION$getMessagingPermAndPref","callingDescriptor":"UNKNOWN","params":{},"storable":true},{"id":"43;a","descriptor":"serviceComponent://ui.communities.components.aura.components.forceCommunity.richText.RichTextController/ACTION$getParsedRichTextValue","callingDescriptor":"markup://forceCommunity:richText","params":{"html":"<div class=\\"slds-text-align_center footer-brand\\">\\n    <h1 class=\\"footer-title slds-m-bottom_large\\">Got questions? We\'re happy to help.</h1>\\n    <p class=\\"footer-content slds-m-bottom_xx-large\\">To learn more about how Digital Boost can help you, get in touch today</p>\\n    <a class=\\"dg-btn dg-btn-brand\\" href=\\"/s/help\\">\\n        <span class=\\"icon-media_xx-small\\"></span>\\n        <span>GET IN TOUCH</span>\\n    </a> \\n    <div class=\\"slds-m-vertical_xx-large footer-logos\\">\\n        <ul class=\\"slds-p-vertical_large dg-list dg-list_inline slds-grid slds-grid_align-spread\\" style=\\"max-width: 320px; margin: 0 auto;\\">\\n    \\t\\t<li><a href=\\"https://www.facebook.com/DigitalBoostNZ/\\" target=\\"_blank\\"><img src=\\"{!contentAsset.footer_facebook.1}\\" width=\\"32\\" /></a></li>\\n            <li><a href=\\"https://nz.linkedin.com/company/digitalboostnz\\" target=\\"_blank\\"><img src=\\"{!contentAsset.footer_linkedin.1}\\" width=\\"32\\" /></a></li>\\n            <li><a href=\\"https://www.instagram.com/digitalboostnz/\\" target=\\"_blank\\"><img src=\\"{!contentAsset.footer_instagram.1}\\" width=\\"32\\" /></a></li>\\n            <li><a href=\\"https://www.youtube.com/c/digitalboost\\" target=\\"_blank\\"><img src=\\"{!contentAsset.footer_youtube.1}\\" width=\\"32\\" /></a></li>\\t\\n\\t\\t</ul>\\n        <ul class=\\"slds-p-vertical_medium dg-list dg-list_inline slds-grid slds-grid_align-spread slds-wrap\\" style=\\"max-width: 600px; margin: 0 auto; align-items: center;\\">\\n            <span class=\\"footer-broughtby\\"><b>Brought to you by</b></span>\\n            <li class=\\"footer-mbie\\"><a href=\\"https://www.business.govt.nz/\\" target=\\"_blank\\"><img src=\\"{!contentAsset.footer_mbie.1}\\" width=\\"130\\"/></a></li>\\n    \\t\\t<li class=\\"footer-tml\\"><a href=\\"https://themindlab.com\\" target=\\"_blank\\"><img src=\\"{!contentAsset.footer_tml.1}\\" width=\\"130\\" /></a></li> \\n\\t\\t</ul>\\n        <ul class=\\"slds-p-vertical_medium dg-list dg-list_inline slds-grid slds-grid_align-spread slds-grid_vertical-align-center slds-wrap footer-terms\\" style=\\"margin: 0 auto;\\">\\n            <li class=\\"footer-google\\"><a href=\\"https://play.google.com/store/apps/details?id=nz.co.digitalboost.live\\" target=\\"_blank\\"><img src=\\"{!contentAsset.footer_googleplay2.1}\\" style=\\"height: 28px\\"/></a></li>\\n            <li class=\\"footer-ios\\"><a href=\\"https://apps.apple.com/al/app/digital-boost-live/id1580326501\\" target=\\"_blank\\"><img src=\\"{!contentAsset.footer_iosapp.1}\\" style=\\"height: 28px\\"/></a></li>\\n            <li><a href=\\"/s/terms\\" target=\\"_blank\\">Terms & Conditions</a></li>\\n            <li><a href=\\"/s/privacy\\" target=\\"_blank\\">Privacy Policy</a></li>\\n            <li><a href=\\"/s/help\\" target=\\"_blank\\">Contact</a></li>\\n            <li class=\\"footer-content_dark\\">©2022 BUSINESS.GOVT.NZ</li>\\n        </ul>\\n    </div>\\n</div>"},"version":"55.0","storable":true},{"id":"59;a","descriptor":"serviceComponent://ui.force.components.controllers.hostConfig.HostConfigController/ACTION$getConfigData","callingDescriptor":"UNKNOWN","params":{},"storable":true},{"id":"62;a","descriptor":"aura://ApexActionController/ACTION$execute","callingDescriptor":"UNKNOWN","params":{"namespace":"","classname":"db_HeaderConfig","method":"isEnableGlobalSearch","cacheable":false,"isContinuation":false}},{"id":"63;a","descriptor":"aura://ApexActionController/ACTION$execute","callingDescriptor":"UNKNOWN","params":{"namespace":"","classname":"db_LangSwitcherController","method":"getAvailableLanguages","cacheable":true,"isContinuation":false}},{"id":"65;a","descriptor":"aura://ApexActionController/ACTION$execute","callingDescriptor":"UNKNOWN","params":{"namespace":"","classname":"db_NavigationMenuController","method":"getConnectNavigationItems","params":{"menuName":"Digital_Boost_Navigation","communityId":"0DB0K000000NsuM","communityBasePath":"/s"},"cacheable":false,"isContinuation":false}}]}',
        'aura.context':
          '{"mode":"PROD","fwuid":"QPQi8lbYE8YujG6og6Dqgw","app":"siteforce:communityApp","loaded":{"APPLICATION@markup://siteforce:communityApp":"0DbugOKt-DnBZOgYmuPNFg"},"dn":[],"globals":{},"uad":false}',
        'aura.pageURI': '/s/',
        'aura.token':
          'eyJub25jZSI6Im5PdU1SUWxHTEhzaFVhY3Rmc0dZS3BJYWJBQUI1b0ZhQ2xuWDctMFoyTWNcdTAwM2QiLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImtpZCI6IntcInRcIjpcIjAwRDB3MDAwMDAwOGI0YlwiLFwidlwiOlwiMDJHMHcwMDAwMDAwWXFjXCIsXCJhXCI6XCJjYWltYW5zaWduZXJcIn0iLCJjcml0IjpbImlhdCJdLCJpYXQiOjE2NTcxMDA5MDc4NzEsImV4cCI6MH0=..Y2XRo_Diq2hBNMqBN7asLukqOU3JTaprGjgsBv_zx88=',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'x-sfdc-page-cache': 'eb0d0f8eb1bdcac8',
          'x-sfdc-page-scope-id': '74bc52c3-9e56-4deb-9e69-c634f02826a2',
          'x-sfdc-request-id': '36853000005a5ceaae',
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get(
      'https://fonts.googleapis.com/css?family=Open+Sans:400,600&subset=cyrillic',
      {
        headers: {
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )
    sleep(0.7)

    response = http.post(
      'https://sf-uat.digitalboost.co.nz/s/sfsites/aura?r=6&ui-communities-components-aura-components-forceCommunity-managedContent.ManagedContentComponent.getRenderDataFromCollectionNames=1&ui-communities-components-aura-components-forceCommunity-richText.RichText.getParsedRichTextValue=10',
      {
        message:
          '{"actions":[{"id":"107;a","descriptor":"serviceComponent://ui.communities.components.aura.components.forceCommunity.managedContent.ManagedContentComponentController/ACTION$getRenderDataFromCollectionNames","callingDescriptor":"markup://forceCommunity:managedContentCollectionDataProvider","params":{"collectionApiName":"Project_Plan_Categories","offset":0,"count":18,"componentsToLoad":["forceCommunity:dynamicCollectionGrid","forceCommunity:flexTileLayout"]},"version":"55.0","storable":true},{"id":"117;a","descriptor":"serviceComponent://ui.communities.components.aura.components.forceCommunity.richText.RichTextController/ACTION$getParsedRichTextValue","callingDescriptor":"markup://forceCommunity:richText","params":{"html":"<p style=\\"text-align: center;\\"><img class=\\"sfdcCbImage\\" src=\\"{!contentAsset.DBApp_icon.1}\\"></p>"},"version":"55.0","storable":true},{"id":"120;a","descriptor":"serviceComponent://ui.communities.components.aura.components.forceCommunity.richText.RichTextController/ACTION$getParsedRichTextValue","callingDescriptor":"markup://forceCommunity:richText","params":{"html":"<p style=\\"text-align:center;\\"><b>Digital Boost Live for IOS</b></p>    \\n<p style=\\"text-align:center;\\">Download our IOS app from the App Store to access exclusive mobile-only features and learn on the go.</p>"},"version":"55.0","storable":true},{"id":"123;a","descriptor":"serviceComponent://ui.communities.components.aura.components.forceCommunity.richText.RichTextController/ACTION$getParsedRichTextValue","callingDescriptor":"markup://forceCommunity:richText","params":{"html":"<p style=\\"text-align:center;\\" class=\\"slds-p-bottom_large\\">\\n    <a class=\\"dg-btn dg-btn-brand\\" href=\\"https://apps.apple.com/al/app/digital-boost-live/id1580326501\\">Apple Store</a>\\n</p>"},"version":"55.0","storable":true},{"id":"129;a","descriptor":"serviceComponent://ui.communities.components.aura.components.forceCommunity.richText.RichTextController/ACTION$getParsedRichTextValue","callingDescriptor":"markup://forceCommunity:richText","params":{"html":"<p style=\\"text-align:center;\\"><b>Digital Boost Live for Android</b></p>\\n<p style=\\"text-align:center;\\">Download our Android app from the Google Play Store to access exclusive mobile-only features and learn on the go.</p>"},"version":"55.0","storable":true},{"id":"132;a","descriptor":"serviceComponent://ui.communities.components.aura.components.forceCommunity.richText.RichTextController/ACTION$getParsedRichTextValue","callingDescriptor":"markup://forceCommunity:richText","params":{"html":"<p style=\\"text-align:center;\\" class=\\"slds-p-bottom_large\\">\\n    <a class=\\"dg-btn dg-btn-brand\\" href=\\"https://play.google.com/store/apps/details?id=nz.co.digitalboost.live\\">Google Play</a>\\n</p>"},"version":"55.0","storable":true},{"id":"135;a","descriptor":"serviceComponent://ui.communities.components.aura.components.forceCommunity.richText.RichTextController/ACTION$getParsedRichTextValue","callingDescriptor":"markup://forceCommunity:richText","params":{"html":"<p style=\\"text-align: center;\\"><img class=\\"sfdcCbImage\\" src=\\"{!contentAsset.Clearhead_logo.2}\\"></p>"},"version":"55.0","storable":true},{"id":"138;a","descriptor":"serviceComponent://ui.communities.components.aura.components.forceCommunity.richText.RichTextController/ACTION$getParsedRichTextValue","callingDescriptor":"markup://forceCommunity:richText","params":{"html":"<p style=\\"text-align:center;\\"><b>Clearhead</b></p>\\n<p style=\\"text-align:center;\\">Download Clearhead mental wellbeing app to learn how to reduce stress, handle anxiety, manage your emotions and sleep better.</p>"},"version":"55.0","storable":true},{"id":"141;a","descriptor":"serviceComponent://ui.communities.components.aura.components.forceCommunity.richText.RichTextController/ACTION$getParsedRichTextValue","callingDescriptor":"markup://forceCommunity:richText","params":{"html":"<p style=\\"text-align:center;\\" class=\\"slds-p-bottom_large\\">\\n    <a class=\\"dg-btn dg-btn-brand\\" href=\\"https://digitalboost.clearhead.org.nz/\\">Clearhead</a>\\n</p>"},"version":"55.0","storable":true},{"id":"152;a","descriptor":"serviceComponent://ui.communities.components.aura.components.forceCommunity.richText.RichTextController/ACTION$getParsedRichTextValue","callingDescriptor":"markup://forceCommunity:richText","params":{"html":"<div style=\\"filter: drop-shadow(0px 0px 0px rgba(0, 0, 0, 0.11));\\"> \\n <div class=\\"sneak-peek-title slds-text-align_center slds-p-top_x-large\\"> \\n  <img src=\\"{!contentAsset.alliance_logo.1}\\" width=\\"300\\" alt=\\"Digital Boost Alliance Aotearoa\\" class=\\"sfdcCbImage\\" /> \\n </div>\\n</div>"},"version":"55.0","storable":true},{"id":"155;a","descriptor":"serviceComponent://ui.communities.components.aura.components.forceCommunity.richText.RichTextController/ACTION$getParsedRichTextValue","callingDescriptor":"markup://forceCommunity:richText","params":{"html":"<center>The Alliance will collectively support small businesses, individuals and communities across Aotearoa with unique product and service offers, ongoing research and digital skills training.</center>    \\n<center><a href=\\"https://digitalboostalliance.nz/\\" target=\\"_blank\\">Find out more about the Digital Boost Alliance Aotearoa</a></center>"},"version":"55.0","storable":true}]}',
        'aura.context':
          '{"mode":"PROD","fwuid":"QPQi8lbYE8YujG6og6Dqgw","app":"siteforce:communityApp","loaded":{"APPLICATION@markup://siteforce:communityApp":"0DbugOKt-DnBZOgYmuPNFg"},"dn":[],"globals":{},"uad":false}',
        'aura.pageURI': '/s/',
        'aura.token':
          'eyJub25jZSI6Im5PdU1SUWxHTEhzaFVhY3Rmc0dZS3BJYWJBQUI1b0ZhQ2xuWDctMFoyTWNcdTAwM2QiLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImtpZCI6IntcInRcIjpcIjAwRDB3MDAwMDAwOGI0YlwiLFwidlwiOlwiMDJHMHcwMDAwMDAwWXFjXCIsXCJhXCI6XCJjYWltYW5zaWduZXJcIn0iLCJjcml0IjpbImlhdCJdLCJpYXQiOjE2NTcxMDA5MDc4NzEsImV4cCI6MH0=..Y2XRo_Diq2hBNMqBN7asLukqOU3JTaprGjgsBv_zx88=',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'x-sfdc-page-cache': 'eb0d0f8eb1bdcac8',
          'x-sfdc-page-scope-id': '74bc52c3-9e56-4deb-9e69-c634f02826a2',
          'x-sfdc-request-id': '4409890000f7af2181',
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.post(
      'https://sf-uat.digitalboost.co.nz/s/sfsites/aura?r=7&aura.ApexAction.execute=4',
      {
        message:
          '{"actions":[{"id":"170;a","descriptor":"aura://ApexActionController/ACTION$execute","callingDescriptor":"UNKNOWN","params":{"namespace":"","classname":"db_WhatsNextController","method":"getWhatsNext","cacheable":false,"isContinuation":false}},{"id":"171;a","descriptor":"aura://ApexActionController/ACTION$execute","callingDescriptor":"UNKNOWN","params":{"namespace":"","classname":"db_ContentController","method":"getContentForIndustryByContentType","params":{"contentType":"Industry Playlist","language":"en-NZ"},"cacheable":false,"isContinuation":false}},{"id":"172;a","descriptor":"aura://ApexActionController/ACTION$execute","callingDescriptor":"UNKNOWN","params":{"namespace":"","classname":"db_EventsController","method":"getTopEvents","params":{"recordLimit":4,"language":"en-NZ"},"cacheable":false,"isContinuation":false}},{"id":"173;a","descriptor":"aura://ApexActionController/ACTION$execute","callingDescriptor":"UNKNOWN","params":{"namespace":"","classname":"db_EventsController","method":"getTopPreviousEvents","params":{"recordLimit":4,"language":"en-NZ"},"cacheable":false,"isContinuation":false}}]}',
        'aura.context':
          '{"mode":"PROD","fwuid":"QPQi8lbYE8YujG6og6Dqgw","app":"siteforce:communityApp","loaded":{"APPLICATION@markup://siteforce:communityApp":"0DbugOKt-DnBZOgYmuPNFg"},"dn":[],"globals":{},"uad":false}',
        'aura.pageURI': '/s/',
        'aura.token':
          'eyJub25jZSI6Im5PdU1SUWxHTEhzaFVhY3Rmc0dZS3BJYWJBQUI1b0ZhQ2xuWDctMFoyTWNcdTAwM2QiLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImtpZCI6IntcInRcIjpcIjAwRDB3MDAwMDAwOGI0YlwiLFwidlwiOlwiMDJHMHcwMDAwMDAwWXFjXCIsXCJhXCI6XCJjYWltYW5zaWduZXJcIn0iLCJjcml0IjpbImlhdCJdLCJpYXQiOjE2NTcxMDA5MDc4NzEsImV4cCI6MH0=..Y2XRo_Diq2hBNMqBN7asLukqOU3JTaprGjgsBv_zx88=',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'x-sfdc-page-cache': 'eb0d0f8eb1bdcac8',
          'x-sfdc-page-scope-id': '74bc52c3-9e56-4deb-9e69-c634f02826a2',
          'x-sfdc-request-id': '448420000037ae4cea',
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.post(
      'https://sf-uat.digitalboost.co.nz/s/sfsites/aura?r=8&aura.RecordUi.getRecordWithFields=1',
      {
        message:
          '{"actions":[{"id":"179;a","descriptor":"aura://RecordUiController/ACTION$getRecordWithFields","callingDescriptor":"UNKNOWN","params":{"recordId":"0050w000003tz08AAA","fields":["User.Contact.Account.Name","User.Contact.Login_Counter__c","User.ContactId","User.FirstName"],"optionalFields":["User.CommunityNickname","User.Contact.Digital_Assessment_Complete__c","User.Contact.Id"]}}]}',
        'aura.context':
          '{"mode":"PROD","fwuid":"QPQi8lbYE8YujG6og6Dqgw","app":"siteforce:communityApp","loaded":{"APPLICATION@markup://siteforce:communityApp":"0DbugOKt-DnBZOgYmuPNFg"},"dn":[],"globals":{},"uad":false}',
        'aura.pageURI': '/s/',
        'aura.token':
          'eyJub25jZSI6Im5PdU1SUWxHTEhzaFVhY3Rmc0dZS3BJYWJBQUI1b0ZhQ2xuWDctMFoyTWNcdTAwM2QiLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImtpZCI6IntcInRcIjpcIjAwRDB3MDAwMDAwOGI0YlwiLFwidlwiOlwiMDJHMHcwMDAwMDAwWXFjXCIsXCJhXCI6XCJjYWltYW5zaWduZXJcIn0iLCJjcml0IjpbImlhdCJdLCJpYXQiOjE2NTcxMDA5MDc4NzEsImV4cCI6MH0=..Y2XRo_Diq2hBNMqBN7asLukqOU3JTaprGjgsBv_zx88=',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'x-sfdc-page-cache': 'eb0d0f8eb1bdcac8',
          'x-sfdc-page-scope-id': '74bc52c3-9e56-4deb-9e69-c634f02826a2',
          'x-sfdc-request-id': '4486800000399bc166',
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get('https://sf-uat.digitalboost.co.nz/s/undefined', {
      headers: {
        'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })

    response = http.get('https://sf-uat.digitalboost.co.nz/s/', {
      headers: {
        'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })
    sleep(3.1)

    response = http.post(
      'https://sf-uat.digitalboost.co.nz/s/sfsites/aura?r=9&ui-instrumentation-components-beacon.InstrumentationBeacon.sendData=1',
      {
        message:
          '{"actions":[{"id":"388;a","descriptor":"serviceComponent://ui.instrumentation.components.beacon.InstrumentationBeaconController/ACTION$sendData","callingDescriptor":"UNKNOWN","params":{"batch":[{"topic":"ailtn","schemaType":"LightningInteraction","payload":"{\\"id\\":\\"ltng:interaction\\",\\"ts\\":3659.6,\\"pageStartTime\\":1657100907615,\\"owner\\":\\"siteforce:communityApp\\",\\"unixTS\\":false,\\"eventType\\":\\"user\\",\\"eventSource\\":\\"synthetic-communitynavigation\\",\\"attributes\\":{\\"pageViewCounter\\":1,\\"cdnEnabled\\":false,\\"uriDefsEnabled\\":false,\\"gates\\":{}},\\"locator\\":{\\"target\\":\\"link\\",\\"scope\\":\\"communitynavigation\\",\\"context\\":{\\"unifiedEventType\\":\\"COMMUNITY_PAGE_NAVIGATION\\",\\"referrer\\":\\"/s/\\",\\"requestURI\\":\\"/s/\\",\\"entityId\\":null}},\\"sequence\\":1,\\"page\\":{\\"context\\":\\"home\\",\\"attributes\\":{\\"url\\":\\"/s/\\"}}}"},{"topic":"ailtn","schemaType":"LightningPerformance","payload":"{\\"id\\":\\"ltng:performance\\",\\"ts\\":3697.3,\\"duration\\":0,\\"pageStartTime\\":1657100907615,\\"marks\\":{},\\"owner\\":null,\\"unixTS\\":false,\\"eventType\\":\\"performance\\",\\"eventSource\\":\\"cryptoStorage-keymismatch\\",\\"attributes\\":{\\"cdnEnabled\\":false,\\"uriDefsEnabled\\":false,\\"gates\\":{}}}"},{"topic":"ailtn","schemaType":"LightningPerformance","payload":"{\\"id\\":\\"ltng:performance\\",\\"ts\\":3697.89,\\"duration\\":0,\\"pageStartTime\\":1657100907615,\\"marks\\":{},\\"owner\\":null,\\"unixTS\\":false,\\"eventType\\":\\"performance\\",\\"eventSource\\":\\"cryptoStorage-keymismatch\\",\\"attributes\\":{\\"cdnEnabled\\":false,\\"uriDefsEnabled\\":false,\\"gates\\":{}}}"},{"topic":"ailtn","schemaType":"LightningPerformance","payload":"{\\"id\\":\\"ltng:performance\\",\\"ts\\":3698.7,\\"duration\\":0,\\"pageStartTime\\":1657100907615,\\"marks\\":{},\\"owner\\":null,\\"unixTS\\":false,\\"eventType\\":\\"performance\\",\\"eventSource\\":\\"cryptoStorage-keymismatch\\",\\"attributes\\":{\\"cdnEnabled\\":false,\\"uriDefsEnabled\\":false,\\"gates\\":{}}}"},{"topic":"ailtn","schemaType":"LightningPerformance","payload":"{\\"id\\":\\"ltng:performance\\",\\"ts\\":3698.8,\\"duration\\":0,\\"pageStartTime\\":1657100907615,\\"marks\\":{},\\"owner\\":null,\\"unixTS\\":false,\\"eventType\\":\\"performance\\",\\"eventSource\\":\\"cryptoStorage-keymismatch\\",\\"attributes\\":{\\"cdnEnabled\\":false,\\"uriDefsEnabled\\":false,\\"gates\\":{}}}"},{"topic":"ailtn","schemaType":"LightningInteraction","payload":"{\\"id\\":\\"ltng:interaction\\",\\"ts\\":4001.1,\\"pageStartTime\\":1657100907615,\\"owner\\":null,\\"unixTS\\":false,\\"eventType\\":\\"crud\\",\\"eventSource\\":\\"read\\",\\"attributes\\":{\\"recordId\\":\\"0050w000003tz08AAA\\",\\"recordType\\":\\"User\\",\\"state\\":\\"SUCCESS\\",\\"pageViewCounter\\":1,\\"cdnEnabled\\":false,\\"uriDefsEnabled\\":false,\\"gates\\":{}},\\"locator\\":{\\"target\\":\\"read\\",\\"scope\\":\\"force_record\\",\\"context\\":null},\\"sequence\\":2,\\"page\\":{\\"context\\":\\"home\\",\\"attributes\\":{\\"url\\":\\"/s/\\"}}}"},{"topic":"ailtn","schemaType":"LightningPerformance","payload":"{\\"id\\":\\"ltng:newDefs\\",\\"ts\\":4006.6,\\"duration\\":0,\\"pageStartTime\\":1657100907615,\\"marks\\":{},\\"owner\\":\\"siteforce:routerInitializer\\",\\"unixTS\\":false,\\"eventType\\":\\"performance\\",\\"eventSource\\":\\"newDefs\\",\\"attributes\\":{\\"componentDefs\\":[\\"layout://siteforce-generatedpage-2822bae0-7702-4d39-9fb7-0e2fe32929ce.c1657100911270\\",\\"markup://siteforce:runtimeComponent\\"],\\"cdnEnabled\\":false,\\"uriDefsEnabled\\":false,\\"gates\\":{}}}"},{"topic":"ailtn","schemaType":"LightningPerformance","payload":"{\\"id\\":\\"ltng:performance\\",\\"ts\\":4008.2,\\"duration\\":7,\\"pageStartTime\\":1657100907615,\\"marks\\":{\\"component\\":[{\\"totalCreateTime\\":null,\\"slowestCreates\\":[{\\"name\\":\\"siteforce-generatedpage-2822bae0-7702-4d39-9fb7-0e2fe32929ce.c1657100911270\\",\\"createCount\\":1,\\"createTimeTotal\\":null}]}]},\\"owner\\":\\"siteforce:routerInitializer\\",\\"unixTS\\":false,\\"eventType\\":\\"performance\\",\\"eventSource\\":\\"Audience-pageLoaderCreate\\",\\"attributes\\":{\\"cdnEnabled\\":false,\\"uriDefsEnabled\\":false,\\"gates\\":{}}}"},{"topic":"ailtn","schemaType":"LightningInteraction","payload":"{\\"id\\":\\"ltng:interaction\\",\\"ts\\":4281.3,\\"pageStartTime\\":1657100907615,\\"owner\\":null,\\"unixTS\\":false,\\"eventType\\":\\"crud\\",\\"eventSource\\":\\"read\\",\\"attributes\\":{\\"recordId\\":\\"0050w000003tz08AAA\\",\\"recordType\\":\\"User\\",\\"state\\":\\"SUCCESS\\",\\"pageViewCounter\\":1,\\"cdnEnabled\\":false,\\"uriDefsEnabled\\":false,\\"gates\\":{}},\\"locator\\":{\\"target\\":\\"read\\",\\"scope\\":\\"force_record\\",\\"context\\":null},\\"sequence\\":3,\\"page\\":{\\"context\\":\\"home\\",\\"attributes\\":{\\"url\\":\\"/s/\\"}}}"},{"topic":"ailtn","schemaType":"LightningPerformance","payload":"{\\"id\\":\\"ltng:newDefs\\",\\"ts\\":4333.2,\\"duration\\":0,\\"pageStartTime\\":1657100907615,\\"marks\\":{},\\"owner\\":\\"siteforce:routerInitializer\\",\\"unixTS\\":false,\\"eventType\\":\\"performance\\",\\"eventSource\\":\\"newDefs\\",\\"attributes\\":{\\"componentDefs\\":[\\"markup://siteforce:hiddenRegion\\",\\"markup://siteforce:dynamicLayout\\",\\"markup://forceCommunity:dynamicCollectionBaseDataProvider\\",\\"markup://forceCommunity:htmlBlock\\",\\"markup://forceCommunity:managedContentCollectionDataProvider\\",\\"layout://siteforce-generatedpage-2822bae0-7702-4d39-9fb7-0e2fe32929ce.c165\\",\\"markup://forceCommunity:richTextInline\\",\\"markup://forceCommunity:outputRichText\\",\\"markup://forceCommunity:section\\",\\"markup://siteforce:baseInvalidComponent\\",\\"markup://siteforce:runtimeComponent\\",\\"markup://forceCommunity:dynamicCollection\\",\\"markup://siteforce:runtimeRegion\\",\\"markup://force:pageInfo\\",\\"markup://forceCommunity:richText\\",\\"markup://siteforce:warningComponent\\",\\"markup://siteforce:placeholderComponent\\",\\"markup://ui:outputRichText\\",\\"markup://forceCommunity:seoAssistant\\",\\"markup://force:record\\"],\\"eventDefs\\":[\\"markup://force:onLoadError\\",\\"markup://force:recordUpdated\\"],\\"cdnEnabled\\":false,\\"uriDefsEnabled\\":false,\\"gates\\":{}}}"},{"topic":"ailtn","schemaType":"LightningPerformance","payload":"{\\"id\\":\\"ltng:performance\\",\\"ts\\":4408.89,\\"duration\\":0,\\"pageStartTime\\":1657100907615,\\"marks\\":{},\\"owner\\":\\"siteforce:routerInitializer\\",\\"unixTS\\":false,\\"eventType\\":\\"performance\\",\\"eventSource\\":\\"synthetic-communityembarcadero\\",\\"attributes\\":{\\"methodName\\":\\"resolveUrl\\",\\"pageType\\":\\"comm__namedPage\\",\\"pageAttributes\\":{\\"name\\":\\"Home\\"},\\"success\\":true,\\"cdnEnabled\\":false,\\"uriDefsEnabled\\":false,\\"gates\\":{}}}"},{"topic":"ailtn","schemaType":"LightningInteraction","payload":"{\\"id\\":\\"ltng:interaction\\",\\"ts\\":4862.39,\\"pageStartTime\\":1657100907615,\\"owner\\":null,\\"unixTS\\":false,\\"eventType\\":\\"crud\\",\\"eventSource\\":\\"read\\",\\"attributes\\":{\\"recordId\\":\\"0050w000003tz08AAA\\",\\"recordType\\":\\"User\\",\\"state\\":\\"SUCCESS\\",\\"pageViewCounter\\":1,\\"cdnEnabled\\":false,\\"uriDefsEnabled\\":false,\\"gates\\":{}},\\"locator\\":{\\"target\\":\\"read\\",\\"scope\\":\\"force_record\\",\\"context\\":null},\\"sequence\\":4,\\"page\\":{\\"context\\":\\"home\\",\\"attributes\\":{\\"url\\":\\"/s/\\"}}}"},{"topic":"ailtn","schemaType":"LightningPerformance","payload":"{\\"id\\":\\"ltng:newDefs\\",\\"ts\\":5492.1,\\"duration\\":0,\\"pageStartTime\\":1657100907615,\\"marks\\":{},\\"owner\\":\\"siteforce:routerInitializer\\",\\"unixTS\\":false,\\"eventType\\":\\"performance\\",\\"eventSource\\":\\"newDefs\\",\\"attributes\\":{\\"componentDefs\\":[\\"markup://ui:outputDate\\",\\"markup://lightning:button\\",\\"markup://forceCommunity:dynamicCollectionGrid\\",\\"markup://ui:outputDateTime\\",\\"markup://forceCommunity:flexTileLayout\\",\\"markup://forceCommunity:tileLayout\\"],\\"cdnEnabled\\":false,\\"uriDefsEnabled\\":false,\\"gates\\":{}}}"},{"topic":"ailtn","schemaType":"LightningPerformance","payload":"{\\"id\\":\\"ltng:performance\\",\\"ts\\":5620.39,\\"duration\\":2,\\"pageStartTime\\":1657100907615,\\"marks\\":{},\\"owner\\":\\"siteforce:navigationProvider\\",\\"unixTS\\":false,\\"eventType\\":\\"performance\\",\\"eventSource\\":\\"synthetic-communityembarcadero\\",\\"attributes\\":{\\"methodName\\":\\"generateUrl\\",\\"pageType\\":\\"standard__managedContentPage\\",\\"pageAttributes\\":{\\"contentKey\\":\\"digital-starter-MCMT3N5REX7FHRLODQOZ76X6V3I4\\",\\"contentTypeName\\":\\"Project_Plan_Tile\\"},\\"success\\":false,\\"cdnEnabled\\":false,\\"uriDefsEnabled\\":false,\\"gates\\":{}}}"},{"topic":"ailtn","schemaType":"LightningPerformance","payload":"{\\"id\\":\\"ltng:performance\\",\\"ts\\":5657.89,\\"duration\\":0,\\"pageStartTime\\":1657100907615,\\"marks\\":{},\\"owner\\":null,\\"unixTS\\":false,\\"eventType\\":\\"performance\\",\\"eventSource\\":\\"cryptoStorage-keymismatch\\",\\"attributes\\":{\\"cdnEnabled\\":false,\\"uriDefsEnabled\\":false,\\"gates\\":{}}}"},{"topic":"ailtn","schemaType":"LightningPerformance","payload":"{\\"id\\":\\"ltng:performance\\",\\"ts\\":5682,\\"duration\\":0,\\"pageStartTime\\":1657100907615,\\"marks\\":{},\\"owner\\":null,\\"unixTS\\":false,\\"eventType\\":\\"performance\\",\\"eventSource\\":\\"cryptoStorage-keymismatch\\",\\"attributes\\":{\\"cdnEnabled\\":false,\\"uriDefsEnabled\\":false,\\"gates\\":{}}}"},{"topic":"ailtn","schemaType":"LightningPerformance","payload":"{\\"id\\":\\"ltng:newDefs\\",\\"ts\\":7113.5,\\"duration\\":0,\\"pageStartTime\\":1657100907615,\\"marks\\":{},\\"owner\\":\\"siteforce:communityApp\\",\\"unixTS\\":false,\\"eventType\\":\\"performance\\",\\"eventSource\\":\\"newDefs\\",\\"attributes\\":{\\"componentDefs\\":[\\"markup://instrumentation:o11yCoreCollector\\"],\\"cdnEnabled\\":false,\\"uriDefsEnabled\\":false,\\"gates\\":{}}}"},{"topic":"ailtn","schemaType":"LightningPerformance","payload":"{\\"id\\":\\"ltng:performance\\",\\"ts\\":7569.6,\\"duration\\":0,\\"pageStartTime\\":1657100907615,\\"marks\\":{},\\"owner\\":null,\\"unixTS\\":false,\\"eventType\\":\\"performance\\",\\"eventSource\\":\\"bandwidthUsage\\",\\"attributes\\":{\\"txTotalSize\\":24412,\\"txInstrSize\\":0,\\"txTotalCount\\":7,\\"txInstrCount\\":0,\\"rxTotalSize\\":1616829,\\"rxInstrSize\\":0,\\"rxTotalCount\\":9,\\"rxInstrCount\\":0,\\"pageId\\":1,\\"url\\":\\"/s/\\",\\"cdnEnabled\\":false,\\"uriDefsEnabled\\":false,\\"gates\\":{}}}"},{"topic":"ailtn","schemaType":"LightningPageView","payload":"{\\"id\\":\\"ltng:pageView\\",\\"ts\\":3543.3,\\"duration\\":4033,\\"pageStartTime\\":1657100907615,\\"marks\\":{\\"transport\\":[{\\"ts\\":3644,\\"context\\":{\\"auraXHRId\\":3,\\"requestLength\\":989,\\"background\\":false,\\"actionDefs\\":[\\"64;a\\"],\\"requestId\\":\\"364400000066d0db32\\",\\"status\\":200,\\"statusText\\":\\"OK\\",\\"responseLength\\":1593,\\"xhrDuration\\":352,\\"xhrStall\\":3,\\"startTime\\":3644,\\"fetchStart\\":3644,\\"requestStart\\":3647,\\"dns\\":0,\\"tcp\\":0,\\"ttfb\\":351,\\"transfer\\":1,\\"transferSize\\":1132,\\"nextHopProtocol\\":\\"http/1.1\\",\\"serverTime\\":64,\\"xhrDelay\\":4},\\"duration\\":356},{\\"ts\\":3544.6,\\"context\\":{\\"auraXHRId\\":1,\\"requestLength\\":1612,\\"background\\":false,\\"actionDefs\\":[\\"3;a\\"],\\"status\\":200,\\"statusText\\":\\"OK\\",\\"responseLength\\":19380,\\"xhrDuration\\":455,\\"xhrStall\\":1,\\"startTime\\":3544,\\"fetchStart\\":3544,\\"requestStart\\":3546,\\"dns\\":0,\\"tcp\\":0,\\"ttfb\\":455,\\"transfer\\":0,\\"transferSize\\":5688,\\"nextHopProtocol\\":\\"http/1.1\\",\\"serverTime\\":164,\\"xhrDelay\\":6},\\"duration\\":461},{\\"ts\\":3637.2,\\"context\\":{\\"auraXHRId\\":2,\\"requestLength\\":1018,\\"background\\":false,\\"actionDefs\\":[\\"61;a\\"],\\"requestId\\":\\"3637100000c37d41f8\\",\\"status\\":200,\\"statusText\\":\\"OK\\",\\"responseLength\\":2240,\\"xhrDuration\\":640,\\"xhrStall\\":4,\\"startTime\\":3637,\\"fetchStart\\":3637,\\"requestStart\\":3641,\\"dns\\":0,\\"tcp\\":0,\\"ttfb\\":638,\\"transfer\\":1,\\"transferSize\\":1311,\\"nextHopProtocol\\":\\"http/1.1\\",\\"serverTime\\":99,\\"xhrDelay\\":3},\\"duration\\":643},{\\"ts\\":4486.8,\\"context\\":{\\"auraXHRId\\":8,\\"requestLength\\":1221,\\"background\\":false,\\"actionDefs\\":[\\"179;a\\"],\\"requestId\\":\\"4486800000399bc166\\",\\"status\\":200,\\"statusText\\":\\"OK\\",\\"responseLength\\":3022,\\"xhrDuration\\":372,\\"xhrStall\\":6,\\"startTime\\":4487,\\"fetchStart\\":4487,\\"requestStart\\":4493,\\"dns\\":0,\\"tcp\\":0,\\"ttfb\\":371,\\"transfer\\":0,\\"transferSize\\":1449,\\"nextHopProtocol\\":\\"http/1.1\\",\\"serverTime\\":80,\\"xhrDelay\\":3},\\"duration\\":375},{\\"ts\\":4410,\\"context\\":{\\"auraXHRId\\":6,\\"requestLength\\":8196,\\"background\\":false,\\"actionDefs\\":[\\"107;a\\",\\"117;a\\",\\"120;a\\",\\"123;a\\",\\"129;a\\",\\"132;a\\",\\"135;a\\",\\"138;a\\",\\"141;a\\",\\"152;a\\",\\"155;a\\"],\\"requestId\\":\\"4409890000f7af2181\\",\\"status\\":200,\\"statusText\\":\\"OK\\",\\"responseLength\\":170492,\\"xhrDuration\\":1069,\\"xhrStall\\":5,\\"startTime\\":4411,\\"fetchStart\\":4411,\\"requestStart\\":4416,\\"dns\\":0,\\"tcp\\":0,\\"ttfb\\":1068,\\"transfer\\":1,\\"transferSize\\":30558,\\"nextHopProtocol\\":\\"http/1.1\\",\\"serverTime\\":735,\\"xhrDelay\\":5},\\"duration\\":1074},{\\"ts\\":3654.5,\\"context\\":{\\"auraXHRId\\":4,\\"requestLength\\":955,\\"background\\":false,\\"actionDefs\\":[\\"66;a\\"],\\"requestId\\":\\"3654390000c035ff96\\",\\"status\\":200,\\"statusText\\":\\"OK\\",\\"responseLength\\":951928,\\"xhrDuration\\":2488,\\"xhrStall\\":2,\\"startTime\\":3654,\\"fetchStart\\":3654,\\"requestStart\\":3657,\\"dns\\":0,\\"tcp\\":0,\\"ttfb\\":1110,\\"transfer\\":1377,\\"transferSize\\":243348,\\"nextHopProtocol\\":\\"http/1.1\\",\\"serverTime\\":67,\\"xhrDelay\\":1},\\"duration\\":2489},{\\"ts\\":3685.3,\\"context\\":{\\"auraXHRId\\":5,\\"requestLength\\":7908,\\"background\\":false,\\"actionDefs\\":[\\"28;a\\",\\"32;a\\",\\"43;a\\",\\"59;a\\",\\"62;a\\",\\"63;a\\",\\"65;a\\"],\\"requestId\\":\\"36853000005a5ceaae\\",\\"status\\":200,\\"statusText\\":\\"OK\\",\\"responseLength\\":93544,\\"xhrDuration\\":3424,\\"xhrStall\\":310,\\"startTime\\":3686,\\"fetchStart\\":3686,\\"requestStart\\":3997,\\"dns\\":0,\\"tcp\\":0,\\"ttfb\\":3228,\\"transfer\\":196,\\"transferSize\\":27554,\\"nextHopProtocol\\":\\"http/1.1\\",\\"serverTime\\":2595,\\"xhrDelay\\":3},\\"duration\\":3427},{\\"ts\\":4484.2,\\"context\\":{\\"auraXHRId\\":7,\\"requestLength\\":2370,\\"background\\":false,\\"actionDefs\\":[\\"170;a\\",\\"171;a\\",\\"172;a\\",\\"173;a\\"],\\"requestId\\":\\"448420000037ae4cea\\",\\"status\\":200,\\"statusText\\":\\"OK\\",\\"responseLength\\":11682,\\"xhrDuration\\":3007,\\"xhrStall\\":3,\\"startTime\\":4484,\\"fetchStart\\":4484,\\"requestStart\\":4487,\\"dns\\":0,\\"tcp\\":0,\\"ttfb\\":3007,\\"transfer\\":0,\\"transferSize\\":3079,\\"nextHopProtocol\\":\\"http/1.1\\",\\"serverTime\\":2008,\\"xhrDelay\\":3},\\"duration\\":3010}],\\"actions\\":[{\\"ts\\":3643.89,\\"context\\":{\\"id\\":\\"64;a\\",\\"abortable\\":false,\\"storable\\":false,\\"background\\":false,\\"cmp\\":\\"none\\",\\"def\\":\\"aura://RecordUiController/ACTION$getRecordWithFields\\",\\"state\\":\\"SUCCESS\\",\\"cache\\":false},\\"xhrWait\\":0,\\"enqueueWait\\":0,\\"serverTime\\":{\\"total\\":35,\\"db\\":3,\\"xhrServerTime\\":63,\\"boxCarCount\\":1},\\"callbackTime\\":0,\\"duration\\":356},{\\"ts\\":3544.5,\\"context\\":{\\"id\\":\\"3;a\\",\\"abortable\\":false,\\"storable\\":false,\\"background\\":true,\\"cmp\\":\\"siteforce:publiclyCacheableComponentLoader\\",\\"def\\":\\"serviceComponent://ui.comm.runtime.components.aura.components.siteforce.controller.PubliclyCacheableComponentLoaderController/ACTION$getAudienceTargetedPageComponent\\",\\"state\\":\\"SUCCESS\\",\\"cache\\":false},\\"xhrWait\\":0,\\"enqueueWait\\":0,\\"serverTime\\":{\\"total\\":130,\\"db\\":8,\\"xhrServerTime\\":164,\\"boxCarCount\\":1},\\"callbackTime\\":7,\\"duration\\":471},{\\"ts\\":3636.8,\\"context\\":{\\"id\\":\\"61;a\\",\\"abortable\\":false,\\"storable\\":false,\\"background\\":false,\\"cmp\\":\\"none\\",\\"def\\":\\"aura://RecordUiController/ACTION$getRecordWithFields\\",\\"state\\":\\"SUCCESS\\",\\"cache\\":false},\\"xhrWait\\":0,\\"enqueueWait\\":0,\\"serverTime\\":{\\"total\\":67,\\"db\\":4,\\"xhrServerTime\\":99,\\"boxCarCount\\":1},\\"callbackTime\\":0,\\"duration\\":644},{\\"ts\\":3543.8,\\"context\\":{\\"id\\":\\"2;a\\",\\"abortable\\":false,\\"storable\\":false,\\"background\\":false,\\"cmp\\":\\"siteforce:publiclyCacheableComponentLoader\\",\\"def\\":\\"serviceComponent://ui.comm.runtime.components.aura.components.siteforce.controller.PubliclyCacheableComponentLoaderController/ACTION$getPageComponent\\",\\"state\\":\\"SUCCESS\\",\\"cache\\":false},\\"xhrWait\\":0,\\"enqueueWait\\":0,\\"serverTime\\":{\\"total\\":194,\\"db\\":8,\\"xhrServerTime\\":252,\\"boxCarCount\\":1},\\"callbackTime\\":74,\\"duration\\":865},{\\"ts\\":4486.6,\\"context\\":{\\"id\\":\\"179;a\\",\\"abortable\\":false,\\"storable\\":false,\\"background\\":false,\\"cmp\\":\\"none\\",\\"def\\":\\"aura://RecordUiController/ACTION$getRecordWithFields\\",\\"state\\":\\"SUCCESS\\",\\"cache\\":false},\\"xhrWait\\":0,\\"enqueueWait\\":0,\\"serverTime\\":{\\"total\\":55,\\"db\\":5,\\"xhrServerTime\\":79,\\"boxCarCount\\":1},\\"callbackTime\\":0,\\"duration\\":375},{\\"ts\\":4387.1,\\"context\\":{\\"id\\":\\"107;a\\",\\"abortable\\":true,\\"storable\\":true,\\"background\\":false,\\"cmp\\":\\"forceCommunity:managedContentCollectionDataProvider\\",\\"def\\":\\"serviceComponent://ui.communities.components.aura.components.forceCommunity.managedContent.ManagedContentComponentController/ACTION$getRenderDataFromCollectionNames\\",\\"state\\":\\"SUCCESS\\",\\"cache\\":false},\\"xhrWait\\":1,\\"enqueueWait\\":22,\\"serverTime\\":{\\"total\\":698,\\"db\\":126,\\"xhrServerTime\\":733,\\"boxCarCount\\":11},\\"callbackTime\\":62,\\"duration\\":1168},{\\"ts\\":4392.5,\\"context\\":{\\"id\\":\\"117;a\\",\\"abortable\\":true,\\"storable\\":true,\\"background\\":false,\\"cmp\\":\\"forceCommunity:richText\\",\\"def\\":\\"serviceComponent://ui.communities.components.aura.components.forceCommunity.richText.RichTextController/ACTION$getParsedRichTextValue\\",\\"state\\":\\"SUCCESS\\",\\"cache\\":false},\\"xhrWait\\":1,\\"enqueueWait\\":17,\\"serverTime\\":{\\"total\\":0,\\"db\\":0,\\"xhrServerTime\\":733,\\"boxCarCount\\":11},\\"callbackTime\\":0,\\"duration\\":1162},{\\"ts\\":4394.6,\\"context\\":{\\"id\\":\\"126;a\\",\\"abortable\\":true,\\"storable\\":true,\\"background\\":false,\\"cmp\\":\\"forceCommunity:richText\\",\\"def\\":\\"serviceComponent://ui.communities.components.aura.components.forceCommunity.richText.RichTextController/ACTION$getParsedRichTextValue\\",\\"state\\":\\"SUCCESS\\",\\"cache\\":false},\\"xhrWait\\":1,\\"enqueueWait\\":15,\\"callbackTime\\":0,\\"duration\\":1160},{\\"ts\\":4393.1,\\"context\\":{\\"id\\":\\"120;a\\",\\"abortable\\":true,\\"storable\\":true,\\"background\\":false,\\"cmp\\":\\"forceCommunity:richText\\",\\"def\\":\\"serviceComponent://ui.communities.components.aura.components.forceCommunity.richText.RichTextController/ACTION$getParsedRichTextValue\\",\\"state\\":\\"SUCCESS\\",\\"cache\\":false},\\"xhrWait\\":1,\\"enqueueWait\\":16,\\"serverTime\\":{\\"total\\":0,\\"db\\":0,\\"xhrServerTime\\":733,\\"boxCarCount\\":11},\\"callbackTime\\":0,\\"duration\\":1162},{\\"ts\\":4393.89,\\"context\\":{\\"id\\":\\"123;a\\",\\"abortable\\":true,\\"storable\\":true,\\"background\\":false,\\"cmp\\":\\"forceCommunity:richText\\",\\"def\\":\\"serviceComponent://ui.communities.components.aura.components.forceCommunity.richText.RichTextController/ACTION$getParsedRichTextValue\\",\\"state\\":\\"SUCCESS\\",\\"cache\\":false},\\"xhrWait\\":1,\\"enqueueWait\\":15,\\"serverTime\\":{\\"total\\":0,\\"db\\":0,\\"xhrServerTime\\":733,\\"boxCarCount\\":11},\\"callbackTime\\":0,\\"duration\\":1161},{\\"ts\\":4395,\\"context\\":{\\"id\\":\\"129;a\\",\\"abortable\\":true,\\"storable\\":true,\\"background\\":false,\\"cmp\\":\\"forceCommunity:richText\\",\\"def\\":\\"serviceComponent://ui.communities.components.aura.components.forceCommunity.richText.RichTextController/ACTION$getParsedRichTextValue\\",\\"state\\":\\"SUCCESS\\",\\"cache\\":false},\\"xhrWait\\":1,\\"enqueueWait\\":14,\\"serverTime\\":{\\"total\\":0,\\"db\\":0,\\"xhrServerTime\\":733,\\"boxCarCount\\":11},\\"callbackTime\\":0,\\"duration\\":1160},{\\"ts\\":4395.5,\\"context\\":{\\"id\\":\\"132;a\\",\\"abortable\\":true,\\"storable\\":true,\\"background\\":false,\\"cmp\\":\\"forceCommunity:richText\\",\\"def\\":\\"serviceComponent://ui.communities.components.aura.components.forceCommunity.richText.RichTextController/ACTION$getParsedRichTextValue\\",\\"state\\":\\"SUCCESS\\",\\"cache\\":false},\\"xhrWait\\":1,\\"enqueueWait\\":14,\\"serverTime\\":{\\"total\\":0,\\"db\\":0,\\"xhrServerTime\\":733,\\"boxCarCount\\":11},\\"callbackTime\\":0,\\"duration\\":1160},{\\"ts\\":4396.2,\\"context\\":{\\"id\\":\\"135;a\\",\\"abortable\\":true,\\"storable\\":true,\\"background\\":false,\\"cmp\\":\\"forceCommunity:richText\\",\\"def\\":\\"serviceComponent://ui.communities.components.aura.components.forceCommunity.richText.RichTextController/ACTION$getParsedRichTextValue\\",\\"state\\":\\"SUCCESS\\",\\"cache\\":false},\\"xhrWait\\":1,\\"enqueueWait\\":13,\\"serverTime\\":{\\"total\\":0,\\"db\\":0,\\"xhrServerTime\\":733,\\"boxCarCount\\":11},\\"callbackTime\\":0,\\"duration\\":1159},{\\"ts\\":4396.8,\\"context\\":{\\"id\\":\\"138;a\\",\\"abortable\\":true,\\"storable\\":true,\\"background\\":false,\\"cmp\\":\\"forceCommunity:richText\\",\\"def\\":\\"serviceComponent://ui.communities.components.aura.components.forceCommunity.richText.RichTextController/ACTION$getParsedRichTextValue\\",\\"state\\":\\"SUCCESS\\",\\"cache\\":false},\\"xhrWait\\":1,\\"enqueueWait\\":12,\\"serverTime\\":{\\"total\\":0,\\"db\\":0,\\"xhrServerTime\\":733,\\"boxCarCount\\":11},\\"callbackTime\\":0,\\"duration\\":1158},{\\"ts\\":4397.39,\\"context\\":{\\"id\\":\\"141;a\\",\\"abortable\\":true,\\"storable\\":true,\\"background\\":false,\\"cmp\\":\\"forceCommunity:richText\\",\\"def\\":\\"serviceComponent://ui.communities.components.aura.components.forceCommunity.richText.RichTextController/ACTION$getParsedRichTextValue\\",\\"state\\":\\"SUCCESS\\",\\"cache\\":false},\\"xhrWait\\":1,\\"enqueueWait\\":12,\\"serverTime\\":{\\"total\\":0,\\"db\\":0,\\"xhrServerTime\\":733,\\"boxCarCount\\":11},\\"callbackTime\\":0,\\"duration\\":1158},{\\"ts\\":4401.8,\\"context\\":{\\"id\\":\\"152;a\\",\\"abortable\\":true,\\"storable\\":true,\\"background\\":false,\\"cmp\\":\\"forceCommunity:richText\\",\\"def\\":\\"serviceComponent://ui.communities.components.aura.components.forceCommunity.richText.RichTextController/ACTION$getParsedRichTextValue\\",\\"state\\":\\"SUCCESS\\",\\"cache\\":false},\\"xhrWait\\":1,\\"enqueueWait\\":8,\\"serverTime\\":{\\"total\\":0,\\"db\\":0,\\"xhrServerTime\\":733,\\"boxCarCount\\":11},\\"callbackTime\\":0,\\"duration\\":1153},{\\"ts\\":4403,\\"context\\":{\\"id\\":\\"155;a\\",\\"abortable\\":true,\\"storable\\":true,\\"background\\":false,\\"cmp\\":\\"forceCommunity:richText\\",\\"def\\":\\"serviceComponent://ui.communities.components.aura.components.forceCommunity.richText.RichTextController/ACTION$getParsedRichTextValue\\",\\"state\\":\\"SUCCESS\\",\\"cache\\":false},\\"xhrWait\\":1,\\"enqueueWait\\":6,\\"serverTime\\":{\\"total\\":0,\\"db\\":0,\\"xhrServerTime\\":733,\\"boxCarCount\\":11},\\"callbackTime\\":0,\\"duration\\":1152},{\\"ts\\":3654.39,\\"context\\":{\\"id\\":\\"66;a\\",\\"abortable\\":false,\\"storable\\":false,\\"background\\":false,\\"cmp\\":\\"none\\",\\"def\\":\\"aura://ComponentController/ACTION$getComponentDef\\",\\"state\\":\\"SUCCESS\\",\\"cache\\":false},\\"params\\":{\\"name\\":\\"lightning:iconSvgTemplatesUtility\\"},\\"xhrWait\\":0,\\"enqueueWait\\":0,\\"serverTime\\":{\\"total\\":0,\\"db\\":0,\\"xhrServerTime\\":67,\\"boxCarCount\\":1},\\"callbackTime\\":14,\\"duration\\":2508},{\\"ts\\":3583.39,\\"context\\":{\\"id\\":\\"28;a\\",\\"abortable\\":true,\\"storable\\":false,\\"background\\":false,\\"cmp\\":\\"none\\",\\"def\\":\\"aura://ComponentController/ACTION$getComponent\\",\\"state\\":\\"SUCCESS\\",\\"cache\\":false},\\"params\\":{\\"name\\":\\"markup://instrumentation:o11yCoreCollector\\"},\\"xhrWait\\":25,\\"enqueueWait\\":76,\\"serverTime\\":{\\"total\\":3,\\"db\\":0,\\"xhrServerTime\\":2594,\\"boxCarCount\\":7},\\"callbackTime\\":10,\\"duration\\":3541},{\\"ts\\":3586.2,\\"context\\":{\\"id\\":\\"32;a\\",\\"abortable\\":true,\\"storable\\":true,\\"background\\":false,\\"cmp\\":\\"forceChatter:messagesManager\\",\\"def\\":\\"serviceComponent://ui.chatter.components.messages.MessagesController/ACTION$getMessagingPermAndPref\\",\\"state\\":\\"SUCCESS\\",\\"cache\\":false},\\"xhrWait\\":0,\\"enqueueWait\\":99,\\"serverTime\\":{\\"total\\":12,\\"db\\":2,\\"xhrServerTime\\":2594,\\"boxCarCount\\":7},\\"callbackTime\\":0,\\"duration\\":3539},{\\"ts\\":3591.8,\\"context\\":{\\"id\\":\\"43;a\\",\\"abortable\\":true,\\"storable\\":true,\\"background\\":false,\\"cmp\\":\\"forceCommunity:richText\\",\\"def\\":\\"serviceComponent://ui.communities.components.aura.components.forceCommunity.richText.RichTextController/ACTION$getParsedRichTextValue\\",\\"state\\":\\"SUCCESS\\",\\"cache\\":false},\\"xhrWait\\":0,\\"enqueueWait\\":93,\\"serverTime\\":{\\"total\\":0,\\"db\\":0,\\"xhrServerTime\\":2594,\\"boxCarCount\\":7},\\"callbackTime\\":0,\\"duration\\":3533},{\\"ts\\":3627.7,\\"context\\":{\\"id\\":\\"59;a\\",\\"abortable\\":true,\\"storable\\":true,\\"background\\":false,\\"cmp\\":\\"force:hostConfig\\",\\"def\\":\\"serviceComponent://ui.force.components.controllers.hostConfig.HostConfigController/ACTION$getConfigData\\",\\"state\\":\\"SUCCESS\\",\\"cache\\":false},\\"xhrWait\\":0,\\"enqueueWait\\":57,\\"serverTime\\":{\\"total\\":3,\\"db\\":1,\\"xhrServerTime\\":2594,\\"boxCarCount\\":7},\\"callbackTime\\":0,\\"duration\\":3498},{\\"ts\\":3639.39,\\"context\\":{\\"id\\":\\"62;a\\",\\"abortable\\":false,\\"storable\\":false,\\"background\\":false,\\"cmp\\":\\"none\\",\\"def\\":\\"aura://ApexActionController/ACTION$execute\\",\\"state\\":\\"SUCCESS\\",\\"cache\\":false},\\"xhrWait\\":25,\\"enqueueWait\\":20,\\"serverTime\\":{\\"total\\":10,\\"db\\":1,\\"xhrServerTime\\":2594,\\"boxCarCount\\":7},\\"callbackTime\\":0,\\"duration\\":3486},{\\"ts\\":3642.8,\\"context\\":{\\"id\\":\\"63;a\\",\\"abortable\\":false,\\"storable\\":false,\\"background\\":false,\\"cmp\\":\\"none\\",\\"def\\":\\"aura://ApexActionController/ACTION$execute\\",\\"state\\":\\"SUCCESS\\",\\"cache\\":false},\\"xhrWait\\":25,\\"enqueueWait\\":17,\\"serverTime\\":{\\"total\\":12,\\"db\\":0,\\"xhrServerTime\\":2594,\\"boxCarCount\\":7},\\"callbackTime\\":0,\\"duration\\":3483},{\\"ts\\":3648.3,\\"context\\":{\\"id\\":\\"65;a\\",\\"abortable\\":false,\\"storable\\":false,\\"background\\":false,\\"cmp\\":\\"none\\",\\"def\\":\\"aura://ApexActionController/ACTION$execute\\",\\"state\\":\\"SUCCESS\\",\\"cache\\":false},\\"xhrWait\\":25,\\"enqueueWait\\":12,\\"serverTime\\":{\\"total\\":2510,\\"db\\":88,\\"xhrServerTime\\":2594,\\"boxCarCount\\":7},\\"callbackTime\\":0,\\"duration\\":3477},{\\"ts\\":4465.6,\\"context\\":{\\"id\\":\\"170;a\\",\\"abortable\\":false,\\"storable\\":false,\\"background\\":false,\\"cmp\\":\\"none\\",\\"def\\":\\"aura://ApexActionController/ACTION$execute\\",\\"state\\":\\"ERROR\\",\\"cache\\":false},\\"xhrWait\\":0,\\"enqueueWait\\":18,\\"serverTime\\":{\\"total\\":1552,\\"db\\":186,\\"xhrServerTime\\":2008,\\"boxCarCount\\":4},\\"callbackTime\\":0,\\"duration\\":3029},{\\"ts\\":4467.89,\\"context\\":{\\"id\\":\\"171;a\\",\\"abortable\\":false,\\"storable\\":false,\\"background\\":false,\\"cmp\\":\\"none\\",\\"def\\":\\"aura://ApexActionController/ACTION$execute\\",\\"state\\":\\"SUCCESS\\",\\"cache\\":false},\\"xhrWait\\":0,\\"enqueueWait\\":16,\\"serverTime\\":{\\"total\\":100,\\"db\\":12,\\"xhrServerTime\\":2008,\\"boxCarCount\\":4},\\"callbackTime\\":0,\\"duration\\":3027},{\\"ts\\":4473.5,\\"context\\":{\\"id\\":\\"172;a\\",\\"abortable\\":false,\\"storable\\":false,\\"background\\":false,\\"cmp\\":\\"none\\",\\"def\\":\\"aura://ApexActionController/ACTION$execute\\",\\"state\\":\\"SUCCESS\\",\\"cache\\":false},\\"xhrWait\\":0,\\"enqueueWait\\":10,\\"serverTime\\":{\\"total\\":270,\\"db\\":4,\\"xhrServerTime\\":2008,\\"boxCarCount\\":4},\\"callbackTime\\":0,\\"duration\\":3021},{\\"ts\\":4474.5,\\"context\\":{\\"id\\":\\"173;a\\",\\"abortable\\":false,\\"storable\\":false,\\"background\\":false,\\"cmp\\":\\"none\\",\\"def\\":\\"aura://ApexActionController/ACTION$execute\\",\\"state\\":\\"SUCCESS\\",\\"cache\\":false},\\"xhrWait\\":0,\\"enqueueWait\\":9,\\"serverTime\\":{\\"total\\":45,\\"db\\":9,\\"xhrServerTime\\":2008,\\"boxCarCount\\":4},\\"callbackTime\\":0,\\"duration\\":3021}],\\"component\\":[{\\"totalCreateTime\\":155.66,\\"slowestCreates\\":[{\\"name\\":\\"siteforce-generatedpage-2822bae0-7702-4d39-9fb7-0e2fe32929ce.c1657100911270\\",\\"createCount\\":1,\\"createTimeTotal\\":6.58},{\\"name\\":\\"siteforce-generatedpage-2822bae0-7702-4d39-9fb7-0e2fe32929ce.c165\\",\\"createCount\\":1,\\"createTimeTotal\\":74.28},{\\"name\\":\\"force:recordGlobalValueProvider\\",\\"createCount\\":1,\\"createTimeTotal\\":3.78},{\\"name\\":\\"forceCommunity:dynamicCollectionGrid\\",\\"createCount\\":1,\\"createTimeTotal\\":60.39},{\\"name\\":\\"instrumentation:o11yCoreCollector\\",\\"createCount\\":1,\\"createTimeTotal\\":10.6}]}]},\\"owner\\":\\"siteforce:routerInitializer\\",\\"unixTS\\":false,\\"ept\\":4026,\\"previousPage\\":{\\"context\\":\\"unknown\\",\\"attributes\\":{}},\\"attributes\\":{\\"designTime\\":false,\\"domain\\":\\"https://sf-uat.digitalboost.co.nz\\",\\"template\\":\\"Starter Template\\",\\"priorityDuration\\":{\\"Audience_duration\\":7,\\"Audience_creation_complete\\":472},\\"longTaskTotal\\":0,\\"longestTask\\":0,\\"network\\":{\\"rtt\\":100,\\"downlink\\":4.05,\\"maxAllowedParallelXHRs\\":6},\\"cores\\":8,\\"eptDeviation\\":false,\\"density\\":\\"UNKNOWN\\",\\"totalEpt\\":7569.3,\\"bootstrapType\\":\\"UNKNOWN\\",\\"defaultCmp\\":[],\\"gates\\":{\\"lds.useNewTrackedFieldBehavior\\":false,\\"scenarioTrackerEnabled.instrumentation.ltng\\":true,\\"scenarioTrackerMarksEnabled.instrumentation.ltng\\":false,\\"ui.services.PageScopedCache.enabled\\":true,\\"browserIdleTime.instrumentation.ltng\\":false,\\"clientTelemetry.instrumentation.ltng\\":true,\\"componentProfiler.instrumentation.ltng\\":false,\\"o11yAuraActionsEnabled.instrumentation.ltng\\":false,\\"o11yEnabled.instrumentation.ltng\\":true,\\"forceRecordMarksEnabled\\":false},\\"cdnEnabled\\":false,\\"uriDefsEnabled\\":false},\\"cacheStats\\":{\\"AuraStorage_actions\\":{\\"hits\\":8,\\"misses\\":5},\\"lds:Apex.getApex\\":{\\"hits\\":0,\\"misses\\":2},\\"lds:UiApi.getRecord\\":{\\"hits\\":1,\\"misses\\":3},\\"total\\":{\\"hits\\":9,\\"misses\\":10}},\\"complexity\\":null,\\"sequence\\":1,\\"page\\":{\\"context\\":\\"home\\",\\"attributes\\":{\\"url\\":\\"/s/\\"}}}"},{"topic":"ailtn","schemaType":"LightningInteraction","payload":"{\\"id\\":\\"ltng:interaction\\",\\"ts\\":7578.2,\\"pageStartTime\\":1657100907615,\\"owner\\":null,\\"unixTS\\":false,\\"eventType\\":\\"system\\",\\"eventSource\\":\\"defsUsage\\",\\"attributes\\":{\\"defs\\":[\\"markup://aura:application\\",\\"markup://siteforce:baseApp\\",\\"markup://siteforce:communityApp\\",\\"markup://aura:component\\",\\"markup://siteforce:routerInitializer\\",\\"markup://siteforce:publiclyCacheableComponentLoader\\",\\"markup://ui:asyncComponentManager\\",\\"markup://force:toastManager\\",\\"markup://aura:html\\",\\"markup://force:visualMessageQueue\\",\\"markup://aura:iteration\\",\\"markup://aura:expression\\",\\"markup://aura:if\\",\\"markup://force:hoverPrototypeManager\\",\\"markup://force:hoverPrototype\\",\\"markup://one:actionsManager\\",\\"markup://force:targetInteractionHandler\\",\\"markup://siteforce:conditional\\",\\"markup://force:massErrorsManager\\",\\"markup://siteforce:panelsContainer\\",\\"markup://siteforce:spinnerManager\\",\\"markup://siteforce:loadingBalls\\",\\"markup://siteforce:panelManager\\",\\"markup://ui:panelManager2\\",\\"markup://one:panelManager\\",\\"markup://ui:containerManager\\",\\"markup://forceContent:filesManager\\",\\"markup://forceContent:modalPreviewManager\\",\\"markup://force:hostConfig\\",\\"markup://forceCommunity:signalCollector\\",\\"markup://forceSearch:searchGDP\\",\\"markup://forceSearch:searchGDPCache\\",\\"markup://forceSearch:searchGDPCacheActivity\\",\\"markup://forceSearch:searchGDPCacheMrus\\",\\"markup://forceSearch:searchGDPCachePermsAndPrefs\\",\\"markup://forceSearch:searchGDPCacheResultsFilters\\",\\"markup://forceSearch:searchGDPCacheScopes\\",\\"markup://search_lightning:store\\",\\"markup://siteforce:systemErrorHandler\\",\\"markup://siteforce:customerErrorHandler\\",\\"markup://force:alohaUrlService\\",\\"markup://siteforce:navigationProvider\\",\\"markup://siteforce:qb\\",\\"markup://instrumentation:beacon\\",\\"markup://force:quickActionManager\\",\\"markup://forceChatter:messagesManager\\",\\"markup://forceChatter:editManager\\",\\"markup://salesforceIdentity:sessionTimeoutWarn\\",\\"markup://salesforceIdentity:sessionTimeoutWatcher\\",\\"markup://force:logoutHandler\\",\\"markup://force:sessionLib\\",\\"markup://community_runtime:services\\",\\"markup://siteforce:pageLoader\\",\\"layout://siteforce-generatedpage-wJL7CB9WdL0fo4dhjB4kpIaAJ1BVzf.c165\\",\\"markup://siteforce:themeLayoutStarter\\",\\"markup://siteforce:contentArea\\",\\"markup://siteforce:runtimeRegion\\",\\"markup://siteforce:runtimeComponent\\",\\"markup://forceCommunity:richText\\",\\"markup://forceCommunity:htmlBlock\\",\\"markup://ui:outputRichText\\",\\"markup://forceCommunity:outputRichText\\",\\"markup://aura:unescapedHtml\\",\\"markup://c:digitalBoostHeader\\",\\"markup://force:skipLink\\",\\"markup://forceChatter:feedEventsProcessor\\",\\"markup://forceCommunity:psscFeedsProxy\\",\\"markup://siteforce:runtimeMode\\",\\"markup://aura:text\\",\\"layout://siteforce-generatedpage-2822bae0-7702-4d39-9fb7-0e2fe32929ce.c1657100911270\\",\\"markup://c:digitalBoostWhatsNextV2\\",\\"markup://c:digitalBoostSmallTile\\",\\"layout://siteforce-generatedpage-2822bae0-7702-4d39-9fb7-0e2fe32929ce.c165\\",\\"markup://siteforce:hiddenRegion\\",\\"markup://forceCommunity:seoAssistant\\",\\"markup://siteforce:dynamicLayout\\",\\"markup://forceCommunity:section\\",\\"markup://c:digitalBoostWelcomeV2\\",\\"markup://c:digitalBoostSmallIndustryTile\\",\\"markup://c:digitalBoostTitle\\",\\"markup://c:digitalBoostEvents\\",\\"markup://c:digitalBoostEventRecordings\\",\\"markup://forceCommunity:dynamicCollection\\",\\"markup://forceCommunity:dynamicCollectionBaseDataProvider\\",\\"markup://forceCommunity:managedContentCollectionDataProvider\\",\\"markup://forceCommunity:richTextInline\\",\\"markup://force:recordGlobalValueProvider\\",\\"markup://force:adsBridge\\",\\"markup://forceCommunity:dynamicCollectionGrid\\",\\"markup://forceCommunity:tileLayout\\",\\"markup://forceCommunity:flexTileLayout\\",\\"markup://lightning:navigation\\",\\"markup://sfdc_cms:videoPlayer\\",\\"markup://lightning:formattedRichText\\",\\"markup://lightning:iconSvgTemplatesUtility\\",\\"markup://instrumentation:o11yCoreCollector\\"],\\"pageCounter\\":1,\\"phase\\":\\"EPT\\",\\"pageViewCounter\\":1,\\"cdnEnabled\\":false,\\"uriDefsEnabled\\":false,\\"gates\\":{}},\\"locator\\":{\\"target\\":\\"defsUsage\\",\\"scope\\":\\"defsUsage\\"},\\"sequence\\":5,\\"page\\":{\\"context\\":\\"home\\",\\"attributes\\":{\\"url\\":\\"/s/\\"}}}"},{"topic":"ailtn","schemaType":"LightningInteraction","payload":"{\\"id\\":\\"ltng:interaction\\",\\"ts\\":7578.3,\\"pageStartTime\\":1657100907615,\\"owner\\":null,\\"unixTS\\":false,\\"eventType\\":\\"system\\",\\"eventSource\\":\\"locker-method-data\\",\\"attributes\\":{\\"document.querySelector\\":2,\\"pageViewCounter\\":1,\\"cdnEnabled\\":false,\\"uriDefsEnabled\\":false,\\"gates\\":{}},\\"locator\\":null,\\"sequence\\":6,\\"page\\":{\\"context\\":\\"home\\",\\"attributes\\":{\\"url\\":\\"/s/\\"}}}"}],"traces":"[]","metrics":"[{\\"owner\\":\\"LIGHTNING.lds.service\\",\\"name\\":\\"request.Apex.getApex\\",\\"type\\":\\"Counter\\",\\"ts\\":1657100911272,\\"value\\":2},{\\"owner\\":\\"LIGHTNING.lds.service\\",\\"name\\":\\"request\\",\\"type\\":\\"Counter\\",\\"ts\\":1657100914753,\\"value\\":8},{\\"owner\\":\\"LIGHTNING.lds.service\\",\\"name\\":\\"request.UiApi.getRecord\\",\\"type\\":\\"Counter\\",\\"ts\\":1657100914753,\\"value\\":6},{\\"owner\\":\\"Instrumentation\\",\\"name\\":\\"bwUsageReceived.beforeEpt.bytes\\",\\"type\\":\\"PercentileHistogram\\",\\"ts\\":1657100915184,\\"value\\":[1616829]},{\\"owner\\":\\"Instrumentation\\",\\"name\\":\\"bwUsageSent.beforeEpt.bytes\\",\\"type\\":\\"PercentileHistogram\\",\\"ts\\":1657100915184,\\"value\\":[24412]},{\\"owner\\":\\"Instrumentation\\",\\"name\\":\\"pageview.ept.ms\\",\\"type\\":\\"PercentileHistogram\\",\\"ts\\":1657100915193,\\"value\\":[4026]},{\\"owner\\":\\"LIGHTNING.lds.service\\",\\"name\\":\\"network-response.200\\",\\"type\\":\\"Counter\\",\\"ts\\":1657100912477,\\"value\\":3},{\\"owner\\":\\"lds\\",\\"name\\":\\"ads-bridge-evict-duration\\",\\"type\\":\\"PercentileHistogram\\",\\"ts\\":1657100913311,\\"value\\":[0]},{\\"name\\":\\"cache-policy-undefined\\",\\"owner\\":\\"lds\\",\\"type\\":\\"Counter\\",\\"ts\\":1657100914753,\\"value\\":8,\\"tags\\":{\\"status\\":\\"success\\"}},{\\"name\\":\\"cache-miss-count\\",\\"owner\\":\\"lds\\",\\"type\\":\\"Counter\\",\\"ts\\":1657100914757,\\"value\\":5,\\"tags\\":{\\"status\\":\\"success\\"}},{\\"name\\":\\"cache-miss-count.UiApi.getRecord\\",\\"owner\\":\\"lds\\",\\"type\\":\\"Counter\\",\\"ts\\":1657100912479,\\"value\\":3,\\"tags\\":{\\"status\\":\\"success\\"}},{\\"name\\":\\"cache-hit-count\\",\\"owner\\":\\"lds\\",\\"type\\":\\"Counter\\",\\"ts\\":1657100914753,\\"value\\":1,\\"tags\\":{\\"status\\":\\"success\\"}},{\\"name\\":\\"cache-hit-count.UiApi.getRecord\\",\\"owner\\":\\"lds\\",\\"type\\":\\"Counter\\",\\"ts\\":1657100914754,\\"value\\":1,\\"tags\\":{\\"status\\":\\"success\\"}},{\\"name\\":\\"cache-miss-count.Apex.getApex\\",\\"owner\\":\\"lds\\",\\"type\\":\\"Counter\\",\\"ts\\":1657100914757,\\"value\\":2,\\"tags\\":{\\"status\\":\\"success\\"}},{\\"name\\":\\"request.UiApi.getRecord\\",\\"owner\\":\\"LIGHTNING.lds.service\\",\\"type\\":\\"Counter\\",\\"ts\\":1657100914753,\\"value\\":6,\\"tags\\":{\\"status\\":\\"success\\"}},{\\"name\\":\\"request\\",\\"owner\\":\\"LIGHTNING.lds.service\\",\\"type\\":\\"Counter\\",\\"ts\\":1657100914753,\\"value\\":8,\\"tags\\":{\\"status\\":\\"success\\"}},{\\"name\\":\\"request.Apex.getApex\\",\\"owner\\":\\"LIGHTNING.lds.service\\",\\"type\\":\\"Counter\\",\\"ts\\":1657100911273,\\"value\\":2,\\"tags\\":{\\"status\\":\\"success\\"}},{\\"name\\":\\"record-conflicts-resolved\\",\\"owner\\":\\"lds\\",\\"type\\":\\"PercentileHistogram\\",\\"ts\\":1657100912478,\\"value\\":[1,1,1],\\"tags\\":{\\"status\\":\\"success\\"}},{\\"name\\":\\"store-ingest-duration\\",\\"owner\\":\\"lds\\",\\"type\\":\\"PercentileHistogram\\",\\"ts\\":1657100915111,\\"value\\":[1,1,1,0,0,0,0],\\"tags\\":{\\"status\\":\\"success\\"}},{\\"name\\":\\"store-lookup-duration\\",\\"owner\\":\\"lds\\",\\"type\\":\\"PercentileHistogram\\",\\"ts\\":1657100915111,\\"value\\":[1,1,0,0,0,0,0],\\"tags\\":{\\"status\\":\\"success\\"}},{\\"name\\":\\"store-size-count\\",\\"owner\\":\\"lds\\",\\"type\\":\\"PercentileHistogram\\",\\"ts\\":1657100915111,\\"value\\":[3,8,14,14,15,17],\\"tags\\":{\\"status\\":\\"success\\"}},{\\"name\\":\\"store-snapshot-subscriptions-count\\",\\"owner\\":\\"lds\\",\\"type\\":\\"PercentileHistogram\\",\\"ts\\":1657100915111,\\"value\\":[0,1,2,3,3,6],\\"tags\\":{\\"status\\":\\"success\\"}},{\\"name\\":\\"store-watch-subscriptions-count\\",\\"owner\\":\\"lds\\",\\"type\\":\\"PercentileHistogram\\",\\"ts\\":1657100915111,\\"value\\":[1,1,1,2,2,2],\\"tags\\":{\\"status\\":\\"success\\"}},{\\"name\\":\\"store-broadcast-duration\\",\\"owner\\":\\"lds\\",\\"type\\":\\"PercentileHistogram\\",\\"ts\\":1657100915111,\\"value\\":[0,0,0,0,0,0,0,0],\\"tags\\":{\\"status\\":\\"success\\"}},{\\"name\\":\\"cache-miss-duration.UiApi.getRecord\\",\\"owner\\":\\"lds\\",\\"type\\":\\"PercentileHistogram\\",\\"ts\\":1657100912479,\\"value\\":[360,649,378],\\"tags\\":{\\"status\\":\\"success\\"}},{\\"name\\":\\"cache-hit-duration.UiApi.getRecord\\",\\"owner\\":\\"lds\\",\\"type\\":\\"PercentileHistogram\\",\\"ts\\":1657100914754,\\"value\\":[0],\\"tags\\":{\\"status\\":\\"success\\"}},{\\"name\\":\\"cache-miss-duration.Apex.getApex\\",\\"owner\\":\\"lds\\",\\"type\\":\\"PercentileHistogram\\",\\"ts\\":1657100914757,\\"value\\":[3484,3500],\\"tags\\":{\\"status\\":\\"success\\"}}]","o11yLogs":"CiEKBG8xMXkRM6MflS4deEIYASAAKAAyCDIzOC4yNC4wOAASphAKG3NmLmluc3RydW1lbnRhdGlvbi5BY3Rpdml0eRKGAgnNrCmULh14QhJbChA4MWU3YzEwMzYyOGFkYjVhEg9VaUFwaS5nZXRSZWNvcmQZAADMzMx0dkAiKQoZc2YuaW5zdHJ1bWVudGF0aW9uLlNpbXBsZRIMCgpjYWNoZS1taXNzUABYABkAAABAM3esQCIgYmVmOWYxYzkyNmIyNjAxZGY5ODViYzYyNmMyMGQyMjQoATIDbGRzOjkKEnNmLmxleC5QYWdlUGF5bG9hZBIjCAAiD1BMQUNFSE9MREVSX1VSTDIOUExBQ0VIT0xERVJfSURCFnNpdGVmb3JjZTpjb21tdW5pdHlBcHBKAjRnUhUKEXNmLmxleC5BcHBQYXlsb2FkEgAShgIJMxMplC4deEISWwoQNDVlMWY3ZDUyNDAzN2Y4NxIPVWlBcGkuZ2V0UmVjb3JkGQAAAAAATIRAIikKGXNmLmluc3RydW1lbnRhdGlvbi5TaW1wbGUSDAoKY2FjaGUtbWlzc1AAWAAZAAAAAABkrEAiIGJlZjlmMWM5MjZiMjYwMWRmOTg1YmM2MjZjMjBkMjI0KAIyA2xkczo5ChJzZi5sZXguUGFnZVBheWxvYWQSIwgAIg9QTEFDRUhPTERFUl9VUkwyDlBMQUNFSE9MREVSX0lEQhZzaXRlZm9yY2U6Y29tbXVuaXR5QXBwSgI0Z1IVChFzZi5sZXguQXBwUGF5bG9hZBIAEoYCCc1EXpQuHXhCElsKEDdlMmJiNDJjZWMzMDAxMjcSD1VpQXBpLmdldFJlY29yZBkAAMzMzKR3QCIpChlzZi5pbnN0cnVtZW50YXRpb24uU2ltcGxlEgwKCmNhY2hlLW1pc3NQAFgAGQAAAKAZhbFAIiBiZWY5ZjFjOTI2YjI2MDFkZjk4NWJjNjI2YzIwZDIyNCgDMgNsZHM6OQoSc2YubGV4LlBhZ2VQYXlsb2FkEiMIACIPUExBQ0VIT0xERVJfVVJMMg5QTEFDRUhPTERFUl9JREIWc2l0ZWZvcmNlOmNvbW11bml0eUFwcEoCNGdSFQoRc2YubGV4LkFwcFBheWxvYWQSABKDAgkAiCqULh14QhJYChBkNWI3YTk4ZTMwN2VjMTFhEgxBcGV4LmdldEFwZXgZAEBmZmY4q0AiKQoZc2YuaW5zdHJ1bWVudGF0aW9uLlNpbXBsZRIMCgpjYWNoZS1taXNzUABYABkAAACgmZKsQCIgYmVmOWYxYzkyNmIyNjAxZGY5ODViYzYyNmMyMGQyMjQoBDIDbGRzOjkKEnNmLmxleC5QYWdlUGF5bG9hZBIjCAAiD1BMQUNFSE9MREVSX1VSTDIOUExBQ0VIT0xERVJfSURCFnNpdGVmb3JjZTpjb21tdW5pdHlBcHBKAjRnUhUKEXNmLmxleC5BcHBQYXlsb2FkEgASgwIJM5splC4deEISWAoQZTAxZmI1MDM0ZDRhOWUwMBIMQXBleC5nZXRBcGV4GQDAmZmZVqtAIikKGXNmLmluc3RydW1lbnRhdGlvbi5TaW1wbGUSDAoKY2FjaGUtbWlzc1AAWAAZAAAAAAB1rEAiIGJlZjlmMWM5MjZiMjYwMWRmOTg1YmM2MjZjMjBkMjI0KAUyA2xkczo5ChJzZi5sZXguUGFnZVBheWxvYWQSIwgAIg9QTEFDRUhPTERFUl9VUkwyDlBMQUNFSE9MREVSX0lEQhZzaXRlZm9yY2U6Y29tbXVuaXR5QXBwSgI0Z1IVChFzZi5sZXguQXBwUGF5bG9hZBIAEt8FCTPLJZQuHXhCEsIECiBiZWY5ZjFjOTI2YjI2MDFkZjk4NWJjNjI2YzIwZDIyNBIPTGV4Um9vdEFjdGl2aXR5GQDAzMzMKq9AIv0DChRzZi5sZXguUGFnZXZpZXdEcmFmdBLkAwgBEQAAAAAAdK9AKTAzMzMzK37AQQAAAAAAAAAASQAAAAAAAAAAaACYAQCiAQdVTktOT1dOsgErc2NlbmFyaW9UcmFja2VyRW5hYmxlZC5pbnN0cnVtZW50YXRpb24ubHRuZ7IBI3VpLnNlcnZpY2VzLlBhZ2VTY29wZWRDYWNoZS5lbmFibGVksgEkY2xpZW50VGVsZW1ldHJ5Lmluc3RydW1lbnRhdGlvbi5sdG5nsgEgbzExeUVuYWJsZWQuaW5zdHJ1bWVudGF0aW9uLmx0bme6AR5sZHMudXNlTmV3VHJhY2tlZEZpZWxkQmVoYXZpb3K6ATBzY2VuYXJpb1RyYWNrZXJNYXJrc0VuYWJsZWQuaW5zdHJ1bWVudGF0aW9uLmx0bme6ASRicm93c2VySWRsZVRpbWUuaW5zdHJ1bWVudGF0aW9uLmx0bme6ASZjb21wb25lbnRQcm9maWxlci5pbnN0cnVtZW50YXRpb24ubHRuZ7oBK28xMXlBdXJhQWN0aW9uc0VuYWJsZWQuaW5zdHJ1bWVudGF0aW9uLmx0bmfwAQiqAg9QTEFDRUhPTERFUl9VUky6Ag5QTEFDRUhPTERFUl9JRMgCAdgC6MfNFeAC2KaOH4kDAAAAAABwe0BAAVAAWAAZAAAAAAD7q0AoBjIWc2l0ZWZvcmNlOmNvbW11bml0eUFwcDo5ChJzZi5sZXguUGFnZVBheWxvYWQSIwgBIg9QTEFDRUhPTERFUl9VUkwyDlBMQUNFSE9MREVSX0lEQhZzaXRlZm9yY2U6Y29tbXVuaXR5QXBwSgI0Z1IVChFzZi5sZXguQXBwUGF5bG9hZBIAGgAiAA=="}}]}',
        'aura.context':
          '{"mode":"PROD","fwuid":"QPQi8lbYE8YujG6og6Dqgw","app":"siteforce:communityApp","loaded":{"APPLICATION@markup://siteforce:communityApp":"0DbugOKt-DnBZOgYmuPNFg","COMPONENT@markup://instrumentation:o11yCoreCollector":"8089lZkrpgraL8-V8KZXNw"},"dn":[],"globals":{},"uad":false}',
        'aura.pageURI': '/s/',
        'aura.token':
          'eyJub25jZSI6Im5PdU1SUWxHTEhzaFVhY3Rmc0dZS3BJYWJBQUI1b0ZhQ2xuWDctMFoyTWNcdTAwM2QiLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImtpZCI6IntcInRcIjpcIjAwRDB3MDAwMDAwOGI0YlwiLFwidlwiOlwiMDJHMHcwMDAwMDAwWXFjXCIsXCJhXCI6XCJjYWltYW5zaWduZXJcIn0iLCJjcml0IjpbImlhdCJdLCJpYXQiOjE2NTcxMDA5MDc4NzEsImV4cCI6MH0=..Y2XRo_Diq2hBNMqBN7asLukqOU3JTaprGjgsBv_zx88=',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'x-sfdc-page-cache': 'eb0d0f8eb1bdcac8',
          'x-sfdc-page-scope-id': '74bc52c3-9e56-4deb-9e69-c634f02826a2',
          'x-sfdc-request-id': '7581100000f49a70bb',
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get(
      'https://sf-uat.digitalboost.co.nz/_nc_external/system/security/session/SessionTimeServlet?buster=1657100915198',
      {
        headers: {
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.post(
      'https://sf-uat.digitalboost.co.nz/s/sfsites/aura?r=10&ui-identity-components-sessiontimeoutwarn.SessionTimeoutWarn.getSessionTimeoutConfig=1',
      {
        message:
          '{"actions":[{"id":"389;a","descriptor":"serviceComponent://ui.identity.components.sessiontimeoutwarn.SessionTimeoutWarnController/ACTION$getSessionTimeoutConfig","callingDescriptor":"UNKNOWN","params":{}}]}',
        'aura.context':
          '{"mode":"PROD","fwuid":"QPQi8lbYE8YujG6og6Dqgw","app":"siteforce:communityApp","loaded":{"APPLICATION@markup://siteforce:communityApp":"0DbugOKt-DnBZOgYmuPNFg","COMPONENT@markup://instrumentation:o11yCoreCollector":"8089lZkrpgraL8-V8KZXNw"},"dn":[],"globals":{},"uad":false}',
        'aura.pageURI': '/s/',
        'aura.token':
          'eyJub25jZSI6Im5PdU1SUWxHTEhzaFVhY3Rmc0dZS3BJYWJBQUI1b0ZhQ2xuWDctMFoyTWNcdTAwM2QiLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImtpZCI6IntcInRcIjpcIjAwRDB3MDAwMDAwOGI0YlwiLFwidlwiOlwiMDJHMHcwMDAwMDAwWXFjXCIsXCJhXCI6XCJjYWltYW5zaWduZXJcIn0iLCJjcml0IjpbImlhdCJdLCJpYXQiOjE2NTcxMDA5MDc4NzEsImV4cCI6MH0=..Y2XRo_Diq2hBNMqBN7asLukqOU3JTaprGjgsBv_zx88=',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'x-sfdc-page-cache': 'eb0d0f8eb1bdcac8',
          'x-sfdc-page-scope-id': '74bc52c3-9e56-4deb-9e69-c634f02826a2',
          'x-sfdc-request-id': '75832000005767dcb1',
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )
    sleep(11.6)
  })

  group('page_6 - https://navigator-front-figro5woaa-ts.a.run.app/salesforce/login', function () {
    response = http.get('https://navigator-front-figro5woaa-ts.a.run.app/salesforce/login', {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })
    sleep(2.7)
    response = http.get('https://apigee-uat.digitalboost.co.nz/salesforce/login-url', {
      headers: {
        accept: 'application/json, text/plain, */*',
        'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })
    response = http.get(
      'https://fonts.googleapis.com/css?family=Open+Sans:400,600&subset=cyrillic',
      {
        headers: {
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )
    sleep(1.4)
  })

  group(
    'page_7 - https://sf-uat.digitalboost.co.nz/idp/endpoint/HttpRedirect?SAMLRequest=pZJLb4MwEIT%2FCvIdcEkCiQVUaaOqkfqIkrSHXiqDl9QS2NS7pI9fX0hSqadcel19uzOecXr52dTeHhxqazJ2EXB2mafzjt7MGt47QPJ6wGDGOmeElahRGNkACirFZn5%2FJ6KAi9ZZsqWt2REWKJv6%2FIZEBEe9JvOef8X7OfOWi4y9TmequohHvJhVVZJMVCFjWSST6QRGiYQoHqtkzKNEKdUvIHawNEjSUH%2BDR5HPE5%2FHWz4T46mY8CCejV%2BYt%2Bjfoo2kg9QbUYsiDLHyO0mB0jtNsi6sRQpKG5jvUKs2BKNaqw2Ftz2%2BBqUdlMS8%2Ba%2F3a2uwa8BtwO11CU%2Fru39eXp1yvNJGabM7H2FxhFDcbrcrf%2FW42TLvxroSDu1lrJI1AsvToQxxSMnlJzu%2BkXu9k2TdYDIN%2FyLpQ6%2B0XKxsrcuv4WAj6byRYaKVXx1Q0Q51IoEZkqpr%2B3HtQBJkjFwHLMzT8O%2Fvyn8A',
    function () {
      response = http.get(
        'https://sf-uat.digitalboost.co.nz/idp/endpoint/HttpRedirect?SAMLRequest=pZJLb4MwEIT%2FCvIdcEkCiQVUaaOqkfqIkrSHXiqDl9QS2NS7pI9fX0hSqadcel19uzOecXr52dTeHhxqazJ2EXB2mafzjt7MGt47QPJ6wGDGOmeElahRGNkACirFZn5%2FJ6KAi9ZZsqWt2REWKJv6%2FIZEBEe9JvOef8X7OfOWi4y9TmequohHvJhVVZJMVCFjWSST6QRGiYQoHqtkzKNEKdUvIHawNEjSUH%2BDR5HPE5%2FHWz4T46mY8CCejV%2BYt%2Bjfoo2kg9QbUYsiDLHyO0mB0jtNsi6sRQpKG5jvUKs2BKNaqw2Ftz2%2BBqUdlMS8%2Ba%2F3a2uwa8BtwO11CU%2Fru39eXp1yvNJGabM7H2FxhFDcbrcrf%2FW42TLvxroSDu1lrJI1AsvToQxxSMnlJzu%2BkXu9k2TdYDIN%2FyLpQ6%2B0XKxsrcuv4WAj6byRYaKVXx1Q0Q51IoEZkqpr%2B3HtQBJkjFwHLMzT8O%2Fvyn8A',
        {
          headers: {
            'upgrade-insecure-requests': '1',
            'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
          },
        }
      )
      sleep(1)
    }
  )

  group(
    'page_8 - https://navigator-front-figro5woaa-ts.a.run.app/salesforce/validate',
    function () {
      response = http.post(
        'https://navigator-front-figro5woaa-ts.a.run.app/salesforce/validate',
        {
          SAMLResponse:
            'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c2FtbHA6UmVzcG9uc2UgeG1sbnM6c2FtbHA9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDpwcm90b2NvbCIgRGVzdGluYXRpb249Imh0dHBzOi8vbmF2aWdhdG9yLWZyb250LWZpZ3JvNXdvYWEtdHMuYS5ydW4uYXBwL3NhbGVzZm9yY2UvdmFsaWRhdGUiIElEPSJfODc1MDI0NjEwYTE1NmQ5N2ZkOTgzMjVlM2M0MDAxZjAxNjU3MTAwOTMxNDI2IiBJblJlc3BvbnNlVG89Il84OWRmMTYzMGI5ZmY3NzVkYmE2YWI3NTg1ZTM3YWUyNjRkNzQwMjdkZGQiIElzc3VlSW5zdGFudD0iMjAyMi0wNy0wNlQwOTo0ODo1MS40MjZaIiBWZXJzaW9uPSIyLjAiPjxzYW1sOklzc3VlciB4bWxuczpzYW1sPSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6YXNzZXJ0aW9uIiBGb3JtYXQ9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDpuYW1laWQtZm9ybWF0OmVudGl0eSI+aHR0cHM6Ly90aGVtaW5kbGFiLm15LnNhbGVzZm9yY2UuY29tPC9zYW1sOklzc3Vlcj48ZHM6U2lnbmF0dXJlIHhtbG5zOmRzPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwLzA5L3htbGRzaWcjIj48ZHM6U2lnbmVkSW5mbz48ZHM6Q2Fub25pY2FsaXphdGlvbk1ldGhvZCBBbGdvcml0aG09Imh0dHA6Ly93d3cudzMub3JnLzIwMDEvMTAveG1sLWV4Yy1jMTRuIyIvPjxkczpTaWduYXR1cmVNZXRob2QgQWxnb3JpdGhtPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNyc2Etc2hhMjU2Ii8+PGRzOlJlZmVyZW5jZSBVUkk9IiNfODc1MDI0NjEwYTE1NmQ5N2ZkOTgzMjVlM2M0MDAxZjAxNjU3MTAwOTMxNDI2Ij48ZHM6VHJhbnNmb3Jtcz48ZHM6VHJhbnNmb3JtIEFsZ29yaXRobT0iaHR0cDovL3d3dy53My5vcmcvMjAwMC8wOS94bWxkc2lnI2VudmVsb3BlZC1zaWduYXR1cmUiLz48ZHM6VHJhbnNmb3JtIEFsZ29yaXRobT0iaHR0cDovL3d3dy53My5vcmcvMjAwMS8xMC94bWwtZXhjLWMxNG4jIj48ZWM6SW5jbHVzaXZlTmFtZXNwYWNlcyB4bWxuczplYz0iaHR0cDovL3d3dy53My5vcmcvMjAwMS8xMC94bWwtZXhjLWMxNG4jIiBQcmVmaXhMaXN0PSJkcyBzYW1sIHNhbWxwIHhzIHhzaSIvPjwvZHM6VHJhbnNmb3JtPjwvZHM6VHJhbnNmb3Jtcz48ZHM6RGlnZXN0TWV0aG9kIEFsZ29yaXRobT0iaHR0cDovL3d3dy53My5vcmcvMjAwMS8wNC94bWxlbmMjc2hhMjU2Ii8+PGRzOkRpZ2VzdFZhbHVlPlpMZVVpZWdpYitKSDlacnJoNExkSTBHZ3hOdkxCRWNQNWpsOTAzRW5LT009PC9kczpEaWdlc3RWYWx1ZT48L2RzOlJlZmVyZW5jZT48L2RzOlNpZ25lZEluZm8+PGRzOlNpZ25hdHVyZVZhbHVlPlpEc1pRTmNwcWk2Z1JYVUZ2cmdTM2VaUkd0cklIMjF1d2x1UnU1Qm9IS1RURERqUTNJRU54aWVkTG9SdEFTOUwxcmtBU25CV1dmOFFWbmxlbWJVWHNFT3BrZGlIcjZzS01ObGF3WDQwV25SVUgxUU1JTGFvcXRsbUEyY1JqbkszSXhmNW9CRy9tdWRGeDhZS1NNVVB2SXdNZ2hCNTJsRVpxZjhJbzMxY1FNeVY4YXNWRTJuakFlUjJWZWxxWHVXVXU0UmFOeFpXb3lydEhXUDRjMlNibVFVaU04Z3VPaFN0NmhlRmN1bkFJYmZHTC82RDVBcGZuK09EdURKZE9yRE1EVG1EV09KblJxQmRlYkFQTnhDb0tnZkFHWTF6b3pmMFI3MjdpRnVuZ3lxNGF1bm83SjlWY2tFZUppeEhwM2lLdEd6SGY2VnZ3THhDbGFqUXpWam1lZz09PC9kczpTaWduYXR1cmVWYWx1ZT48ZHM6S2V5SW5mbz48ZHM6WDUwOURhdGE+PGRzOlg1MDlDZXJ0aWZpY2F0ZT5NSUlFckRDQ0E1U2dBd0lCQWdJT0FWWnhWRHZZQUFBQUFBN1YwQk13RFFZSktvWklodmNOQVFFTEJRQXdnWkF4S0RBbUJnTlZCQU1NCkgxTmxiR1pUYVdkdVpXUkRaWEowWHpBNVFYVm5NakF4Tmw4eU1qQXlOREF4R0RBV0JnTlZCQXNNRHpBd1JESTRNREF3TURBeFNrRlcKTnpFWE1CVUdBMVVFQ2d3T1UyRnNaWE5tYjNKalpTNWpiMjB4RmpBVUJnTlZCQWNNRFZOaGJpQkdjbUZ1WTJselkyOHhDekFKQmdOVgpCQWdNQWtOQk1Rd3dDZ1lEVlFRR0V3TlZVMEV3SGhjTk1UWXdPREE1TWpJd01qUXdXaGNOTVRjd09EQTVNVEl3TURBd1dqQ0JrREVvCk1DWUdBMVVFQXd3ZlUyVnNabE5wWjI1bFpFTmxjblJmTURsQmRXY3lNREUyWHpJeU1ESTBNREVZTUJZR0ExVUVDd3dQTURCRU1qZ3cKTURBd01ERktRVlkzTVJjd0ZRWURWUVFLREE1VFlXeGxjMlp2Y21ObExtTnZiVEVXTUJRR0ExVUVCd3dOVTJGdUlFWnlZVzVqYVhOagpiekVMTUFrR0ExVUVDQXdDUTBFeEREQUtCZ05WQkFZVEExVlRRVENDQVNJd0RRWUpLb1pJaHZjTkFRRUJCUUFEZ2dFUEFEQ0NBUW9DCmdnRUJBTGczTU5vU3ZjanJ4bi9nTEZCaTBNaGRkT1U2LzFMUzRYQ3NsaTUrZDF1cVJaNmZuR0swUmh2NHFBUENhZTBqeUlGT0dQZGQKbXZTVDRtSzh5czFkaHo0aFdSaWwvR2s2QUhxUzlSWUM5Qm83WU1RMjErSVJaN2c0S1VRSmE2YXlxc2dRV3ZxWXNOcEo2cjdaa2lsdAoxeW5iRGw5NjZzR0NlSWtwa0dmN3ppc1NKWkVUaVhFRmYvdWtpS05NWXhCclB1T1o5eXNNS0JmVnd5QkV0VGoyVDVRWUMzNmdWRm9uCmFERWR2eE5ScTVqdWVEYUpvZ3B0MG16WlQxWkZWZW1QZkdZcVVPZkFCOWZjbzhNME01clIydll2ZlgzTmdjQlVUVWdyT1ZyL1hYQU8KOTBHcjYwVk1qcXQySlMyK0lob08rdFkzVEV0RDh6Y3RWclUrMy92U1RVVUNBd0VBQWFPQ0FRQXdnZjB3SFFZRFZSME9CQllFRkFDQQpPN3dZUmlHY1prSkhkdGg2VDFlY21Ka2NNQThHQTFVZEV3RUIvd1FGTUFNQkFmOHdnY29HQTFVZEl3U0J3akNCdjRBVUFJQTd2QmhHCklaeG1Ra2QyMkhwUFY1eVltUnloZ1pha2daTXdnWkF4S0RBbUJnTlZCQU1NSDFObGJHWlRhV2R1WldSRFpYSjBYekE1UVhWbk1qQXgKTmw4eU1qQXlOREF4R0RBV0JnTlZCQXNNRHpBd1JESTRNREF3TURBeFNrRldOekVYTUJVR0ExVUVDZ3dPVTJGc1pYTm1iM0pqWlM1agpiMjB4RmpBVUJnTlZCQWNNRFZOaGJpQkdjbUZ1WTJselkyOHhDekFKQmdOVkJBZ01Ba05CTVF3d0NnWURWUVFHRXdOVlUwR0NEZ0ZXCmNWUTcyQUFBQUFBTzFkQVRNQTBHQ1NxR1NJYjNEUUVCQ3dVQUE0SUJBUUNIcWx1YkUrYW9YaGRlMXFjdForL2gzUHc2WWFQS2lrZ1AKbFVlUVphNEJ3bFpwUlVTMGNYS2ovY2pKSTF3YWhHQTNHZ1hxOGpVcDBiV0gwVFh1UWExaHBLWnQ4VXY2UEhUa0h4WWlFdDhJcEg1dgpXWW5HVWNqK253YXpZcFhTOWsxaUtiUC80c3I3NjM2TTRqT09EdUFUZ0ZITTJERmF1ZGxZVXJrQWhIMlcySFhFM0Z1M1dZdWh1WlhjCndTU0g3YlIwSjBxOFpUSnFkY0xwaHlheTAwZHJaY1lHNzdlaUdYZ0sxS0VQcE83ZmdwSkhaWDVOcWN3M2tjVkRDQjFINGhTMjJ3MU8KWVVKZVh6cEdLeE80YW1MRmFpdnlla1JFUVVMa2YyVWg3aTA3SUIxWnowL0taZWc5UTY1cUd4MGpnRkRtY0hUVHRuUENWS0hBNFZFZQpmbHhyPC9kczpYNTA5Q2VydGlmaWNhdGU+PC9kczpYNTA5RGF0YT48L2RzOktleUluZm8+PC9kczpTaWduYXR1cmU+PHNhbWxwOlN0YXR1cz48c2FtbHA6U3RhdHVzQ29kZSBWYWx1ZT0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOnN0YXR1czpTdWNjZXNzIi8+PC9zYW1scDpTdGF0dXM+PHNhbWw6QXNzZXJ0aW9uIHhtbG5zOnNhbWw9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDphc3NlcnRpb24iIElEPSJfOTlkMWZmNzQ4NDA3MzA4OGVmMTBkNDIzMWE0YWI4NzMxNjU3MTAwOTMxNDI2IiBJc3N1ZUluc3RhbnQ9IjIwMjItMDctMDZUMDk6NDg6NTEuNDI2WiIgVmVyc2lvbj0iMi4wIj48c2FtbDpJc3N1ZXIgRm9ybWF0PSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6bmFtZWlkLWZvcm1hdDplbnRpdHkiPmh0dHBzOi8vdGhlbWluZGxhYi5teS5zYWxlc2ZvcmNlLmNvbTwvc2FtbDpJc3N1ZXI+PGRzOlNpZ25hdHVyZSB4bWxuczpkcz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC8wOS94bWxkc2lnIyI+PGRzOlNpZ25lZEluZm8+PGRzOkNhbm9uaWNhbGl6YXRpb25NZXRob2QgQWxnb3JpdGhtPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzEwL3htbC1leGMtYzE0biMiLz48ZHM6U2lnbmF0dXJlTWV0aG9kIEFsZ29yaXRobT0iaHR0cDovL3d3dy53My5vcmcvMjAwMS8wNC94bWxkc2lnLW1vcmUjcnNhLXNoYTI1NiIvPjxkczpSZWZlcmVuY2UgVVJJPSIjXzk5ZDFmZjc0ODQwNzMwODhlZjEwZDQyMzFhNGFiODczMTY1NzEwMDkzMTQyNiI+PGRzOlRyYW5zZm9ybXM+PGRzOlRyYW5zZm9ybSBBbGdvcml0aG09Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvMDkveG1sZHNpZyNlbnZlbG9wZWQtc2lnbmF0dXJlIi8+PGRzOlRyYW5zZm9ybSBBbGdvcml0aG09Imh0dHA6Ly93d3cudzMub3JnLzIwMDEvMTAveG1sLWV4Yy1jMTRuIyI+PGVjOkluY2x1c2l2ZU5hbWVzcGFjZXMgeG1sbnM6ZWM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDEvMTAveG1sLWV4Yy1jMTRuIyIgUHJlZml4TGlzdD0iZHMgc2FtbCB4cyB4c2kiLz48L2RzOlRyYW5zZm9ybT48L2RzOlRyYW5zZm9ybXM+PGRzOkRpZ2VzdE1ldGhvZCBBbGdvcml0aG09Imh0dHA6Ly93d3cudzMub3JnLzIwMDEvMDQveG1sZW5jI3NoYTI1NiIvPjxkczpEaWdlc3RWYWx1ZT4wRUxJb3BOZHJmektRVDFYc25wQnRHUU9WTnFScGhralVDUHczd0VkNzA0PTwvZHM6RGlnZXN0VmFsdWU+PC9kczpSZWZlcmVuY2U+PC9kczpTaWduZWRJbmZvPjxkczpTaWduYXR1cmVWYWx1ZT5WRTk4T0pWVFVCbUlXMXJYOE1qMzdVcXhsTWxyREtFckF2dnJoc0x0d3BpdUNiREhOZnRuajBkQy9ERWd2QjVmdm1BMC9qVU1VUFZERklNZEc0c2h3Y0wzUE4xeW9DT0pDcTcxY1QraVRpUDFtM1cxdkVtSGJYY3ZqMWtoU011NTBRQi9Sbkl6SWZZOC9IaFpzYm1HQ0pZNDJwK3ZrTGo2UDlMd09vaHdtdU5MWnlsT0FOOXRITDJLczg4bC8rSUZpS0NxeC9XbnducEduUVl2THFQYkdNYXRnTG40cUV0d3BTUUdrbWNWYjFSRm1wa3QzRnlGcTFOUUNCUjNWcEtCNy9vOExXYzZMTG1OeW5zU1VUdTRoaVpSYVRRVmtxVUVLcThldE9mTHBqRVowWTNKNmoxSjRjTE80MHM4TW1lTTlPT0srMlVXL3J6d0Y4d1Iwc1NnckE9PTwvZHM6U2lnbmF0dXJlVmFsdWU+PGRzOktleUluZm8+PGRzOlg1MDlEYXRhPjxkczpYNTA5Q2VydGlmaWNhdGU+TUlJRXJEQ0NBNVNnQXdJQkFnSU9BVlp4VkR2WUFBQUFBQTdWMEJNd0RRWUpLb1pJaHZjTkFRRUxCUUF3Z1pBeEtEQW1CZ05WQkFNTQpIMU5sYkdaVGFXZHVaV1JEWlhKMFh6QTVRWFZuTWpBeE5sOHlNakF5TkRBeEdEQVdCZ05WQkFzTUR6QXdSREk0TURBd01EQXhTa0ZXCk56RVhNQlVHQTFVRUNnd09VMkZzWlhObWIzSmpaUzVqYjIweEZqQVVCZ05WQkFjTURWTmhiaUJHY21GdVkybHpZMjh4Q3pBSkJnTlYKQkFnTUFrTkJNUXd3Q2dZRFZRUUdFd05WVTBFd0hoY05NVFl3T0RBNU1qSXdNalF3V2hjTk1UY3dPREE1TVRJd01EQXdXakNCa0RFbwpNQ1lHQTFVRUF3d2ZVMlZzWmxOcFoyNWxaRU5sY25SZk1EbEJkV2N5TURFMlh6SXlNREkwTURFWU1CWUdBMVVFQ3d3UE1EQkVNamd3Ck1EQXdNREZLUVZZM01SY3dGUVlEVlFRS0RBNVRZV3hsYzJadmNtTmxMbU52YlRFV01CUUdBMVVFQnd3TlUyRnVJRVp5WVc1amFYTmoKYnpFTE1Ba0dBMVVFQ0F3Q1EwRXhEREFLQmdOVkJBWVRBMVZUUVRDQ0FTSXdEUVlKS29aSWh2Y05BUUVCQlFBRGdnRVBBRENDQVFvQwpnZ0VCQUxnM01Ob1N2Y2pyeG4vZ0xGQmkwTWhkZE9VNi8xTFM0WENzbGk1K2QxdXFSWjZmbkdLMFJodjRxQVBDYWUwanlJRk9HUGRkCm12U1Q0bUs4eXMxZGh6NGhXUmlsL0drNkFIcVM5UllDOUJvN1lNUTIxK0lSWjdnNEtVUUphNmF5cXNnUVd2cVlzTnBKNnI3WmtpbHQKMXluYkRsOTY2c0dDZUlrcGtHZjd6aXNTSlpFVGlYRUZmL3VraUtOTVl4QnJQdU9aOXlzTUtCZlZ3eUJFdFRqMlQ1UVlDMzZnVkZvbgphREVkdnhOUnE1anVlRGFKb2dwdDBtelpUMVpGVmVtUGZHWXFVT2ZBQjlmY284TTBNNXJSMnZZdmZYM05nY0JVVFVnck9Wci9YWEFPCjkwR3I2MFZNanF0MkpTMitJaG9PK3RZM1RFdEQ4emN0VnJVKzMvdlNUVVVDQXdFQUFhT0NBUUF3Z2Ywd0hRWURWUjBPQkJZRUZBQ0EKTzd3WVJpR2Naa0pIZHRoNlQxZWNtSmtjTUE4R0ExVWRFd0VCL3dRRk1BTUJBZjh3Z2NvR0ExVWRJd1NCd2pDQnY0QVVBSUE3dkJoRwpJWnhtUWtkMjJIcFBWNXlZbVJ5aGdaYWtnWk13Z1pBeEtEQW1CZ05WQkFNTUgxTmxiR1pUYVdkdVpXUkRaWEowWHpBNVFYVm5NakF4Ck5sOHlNakF5TkRBeEdEQVdCZ05WQkFzTUR6QXdSREk0TURBd01EQXhTa0ZXTnpFWE1CVUdBMVVFQ2d3T1UyRnNaWE5tYjNKalpTNWoKYjIweEZqQVVCZ05WQkFjTURWTmhiaUJHY21GdVkybHpZMjh4Q3pBSkJnTlZCQWdNQWtOQk1Rd3dDZ1lEVlFRR0V3TlZVMEdDRGdGVwpjVlE3MkFBQUFBQU8xZEFUTUEwR0NTcUdTSWIzRFFFQkN3VUFBNElCQVFDSHFsdWJFK2FvWGhkZTFxY3RaKy9oM1B3NllhUEtpa2dQCmxVZVFaYTRCd2xacFJVUzBjWEtqL2NqSkkxd2FoR0EzR2dYcThqVXAwYldIMFRYdVFhMWhwS1p0OFV2NlBIVGtIeFlpRXQ4SXBINXYKV1luR1Vjaitud2F6WXBYUzlrMWlLYlAvNHNyNzYzNk00ak9PRHVBVGdGSE0yREZhdWRsWVVya0FoSDJXMkhYRTNGdTNXWXVodVpYYwp3U1NIN2JSMEowcThaVEpxZGNMcGh5YXkwMGRyWmNZRzc3ZWlHWGdLMUtFUHBPN2ZncEpIWlg1TnFjdzNrY1ZEQ0IxSDRoUzIydzFPCllVSmVYenBHS3hPNGFtTEZhaXZ5ZWtSRVFVTGtmMlVoN2kwN0lCMVp6MC9LWmVnOVE2NXFHeDBqZ0ZEbWNIVFR0blBDVktIQTRWRWUKZmx4cjwvZHM6WDUwOUNlcnRpZmljYXRlPjwvZHM6WDUwOURhdGE+PC9kczpLZXlJbmZvPjwvZHM6U2lnbmF0dXJlPjxzYW1sOlN1YmplY3Q+PHNhbWw6TmFtZUlEIEZvcm1hdD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOm5hbWVpZC1mb3JtYXQ6cGVyc2lzdGVudCI+MDA1MHcwMDAwMDN0ejA4QUFBPC9zYW1sOk5hbWVJRD48c2FtbDpTdWJqZWN0Q29uZmlybWF0aW9uIE1ldGhvZD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmNtOmJlYXJlciI+PHNhbWw6U3ViamVjdENvbmZpcm1hdGlvbkRhdGEgSW5SZXNwb25zZVRvPSJfODlkZjE2MzBiOWZmNzc1ZGJhNmFiNzU4NWUzN2FlMjY0ZDc0MDI3ZGRkIiBOb3RPbk9yQWZ0ZXI9IjIwMjItMDctMDZUMDk6NTM6NTEuNDI2WiIgUmVjaXBpZW50PSJodHRwczovL25hdmlnYXRvci1mcm9udC1maWdybzV3b2FhLXRzLmEucnVuLmFwcC9zYWxlc2ZvcmNlL3ZhbGlkYXRlIi8+PC9zYW1sOlN1YmplY3RDb25maXJtYXRpb24+PC9zYW1sOlN1YmplY3Q+PHNhbWw6Q29uZGl0aW9ucyBOb3RCZWZvcmU9IjIwMjItMDctMDZUMDk6NDg6MjEuNDI2WiIgTm90T25PckFmdGVyPSIyMDIyLTA3LTA2VDA5OjUzOjUxLjQyNloiPjxzYW1sOkF1ZGllbmNlUmVzdHJpY3Rpb24+PHNhbWw6QXVkaWVuY2U+ZGlnaXRhbC1uYXZpZ2F0b3ItdWF0PC9zYW1sOkF1ZGllbmNlPjwvc2FtbDpBdWRpZW5jZVJlc3RyaWN0aW9uPjwvc2FtbDpDb25kaXRpb25zPjxzYW1sOkF1dGhuU3RhdGVtZW50IEF1dGhuSW5zdGFudD0iMjAyMi0wNy0wNlQwOTo0ODo1MS40MjZaIiBTZXNzaW9uSW5kZXg9IjAwRDB3MDAwMDAwMHU3aDBBazB3MDAwMDEwTTl3ZSI+PHNhbWw6QXV0aG5Db250ZXh0PjxzYW1sOkF1dGhuQ29udGV4dENsYXNzUmVmPnVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDphYzpjbGFzc2VzOnVuc3BlY2lmaWVkPC9zYW1sOkF1dGhuQ29udGV4dENsYXNzUmVmPjwvc2FtbDpBdXRobkNvbnRleHQ+PC9zYW1sOkF1dGhuU3RhdGVtZW50PjxzYW1sOkF0dHJpYnV0ZVN0YXRlbWVudD48c2FtbDpBdHRyaWJ1dGUgTmFtZT0idXNlcklkIiBOYW1lRm9ybWF0PSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6YXR0cm5hbWUtZm9ybWF0OnVuc3BlY2lmaWVkIj48c2FtbDpBdHRyaWJ1dGVWYWx1ZSB4bWxuczp4cz0iaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEiIHhtbG5zOnhzaT0iaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEtaW5zdGFuY2UiIHhzaTp0eXBlPSJ4czphbnlUeXBlIj4wMDUwdzAwMDAwM3R6MDg8L3NhbWw6QXR0cmlidXRlVmFsdWU+PC9zYW1sOkF0dHJpYnV0ZT48c2FtbDpBdHRyaWJ1dGUgTmFtZT0idXNlcm5hbWUiIE5hbWVGb3JtYXQ9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDphdHRybmFtZS1mb3JtYXQ6dW5zcGVjaWZpZWQiPjxzYW1sOkF0dHJpYnV0ZVZhbHVlIHhtbG5zOnhzPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYSIgeG1sbnM6eHNpPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYS1pbnN0YW5jZSIgeHNpOnR5cGU9InhzOmFueVR5cGUiPmJvYit0ZXN0aW5nMDFAbWFpbGluYXRvci5jb20uZGlnaXRhbGJvb3N0Lm9yZy5uei51YXQ8L3NhbWw6QXR0cmlidXRlVmFsdWU+PC9zYW1sOkF0dHJpYnV0ZT48c2FtbDpBdHRyaWJ1dGUgTmFtZT0iZW1haWwiIE5hbWVGb3JtYXQ9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDphdHRybmFtZS1mb3JtYXQ6dW5zcGVjaWZpZWQiPjxzYW1sOkF0dHJpYnV0ZVZhbHVlIHhtbG5zOnhzPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYSIgeG1sbnM6eHNpPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYS1pbnN0YW5jZSIgeHNpOnR5cGU9InhzOmFueVR5cGUiPmJvYit0ZXN0aW5nMDFAbWFpbGluYXRvci5jb208L3NhbWw6QXR0cmlidXRlVmFsdWU+PC9zYW1sOkF0dHJpYnV0ZT48c2FtbDpBdHRyaWJ1dGUgTmFtZT0iaXNfcG9ydGFsX3VzZXIiIE5hbWVGb3JtYXQ9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDphdHRybmFtZS1mb3JtYXQ6dW5zcGVjaWZpZWQiPjxzYW1sOkF0dHJpYnV0ZVZhbHVlIHhtbG5zOnhzPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYSIgeG1sbnM6eHNpPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYS1pbnN0YW5jZSIgeHNpOnR5cGU9InhzOmFueVR5cGUiPnRydWU8L3NhbWw6QXR0cmlidXRlVmFsdWU+PC9zYW1sOkF0dHJpYnV0ZT48L3NhbWw6QXR0cmlidXRlU3RhdGVtZW50Pjwvc2FtbDpBc3NlcnRpb24+PC9zYW1scDpSZXNwb25zZT4=',
        },
        {
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
            origin: 'https://sf-uat.digitalboost.co.nz',
            'upgrade-insecure-requests': '1',
            'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
          },
        }
      )

      response = http.get(
        'https://fonts.googleapis.com/css?family=Open+Sans:400,600&subset=cyrillic',
        {
          headers: {
            'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
          },
        }
      )
      sleep(2.1)

      response = http.get(
        'https://fonts.googleapis.com/css?family=Open+Sans:400,600&subset=cyrillic',
        {
          headers: {
            'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
          },
        }
      )

      response = http.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyDl_BdjzLBiU_9sAGEMdYQlVNGHC2LXL5c',
        '{"token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTY1NzEwMDkzMywiZXhwIjoxNjU3MTA0NTMzLCJpc3MiOiJmaXJlYmFzZS1wbGF0Zm9ybUB1YXQtbmF2aWdhdG9yLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwic3ViIjoiZmlyZWJhc2UtcGxhdGZvcm1AdWF0LW5hdmlnYXRvci5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInVpZCI6IjAwNTB3MDAwMDAzdHowOEFBQSIsImNsYWltcyI6eyJzZXNzaW9uSWQiOiIwMEQwdzAwMDAwMDB1N2gwQWswdzAwMDAxME05d2UiLCJleHBpcmVzQXQiOjE2NTcxMDgxMzN9fQ.b1Pj29tA23RTQ6DaXrSxWappu_AoBvbK17ZB3p0fpRppIW-W4trwFRxUx2S1zwDOtQC7a4wPbhv5r3hAx_OJ4I7LCClLUN7aajkp6NJD1y-WhFN3bblrVffFCi-zNFSQjqbRwrV4HgNSuGYMxbzI_nQFmxPC0JL5cDXBB8KhluFV4IemcWtzG7dCnnDvljJpIVCV2J0NcWmceRcKeKphegJQMuS0VI9nprLdzV4RIjXfVsXsV-rP5z_OtfRNgRgooBNNZ3bwdcHS4dFU8iwb2G6o0SXadZbiaap1zbJaCmJimF6UDoYJ2bx3QA139IsKyyW3RBHEpI4jGUcuRWD03g","returnSecureToken":true}',
        {
          headers: {
            'content-type': 'application/json',
            'x-client-version': 'Chrome/JsCore/9.6.5/FirebaseCore-web',
            'x-firebase-gmpid': '1:598264636609:web:d7b043d6955314d8b46040',
            'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
          },
        }
      )

      response = http.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDl_BdjzLBiU_9sAGEMdYQlVNGHC2LXL5c',
        '{"idToken":"eyJhbGciOiJSUzI1NiIsImtpZCI6IjUwYTdhYTlkNzg5MmI1MmE4YzgxMzkwMzIzYzVjMjJlMTkwMzI1ZDgiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQm9iIFRlc3R1c2VyIiwic2Vzc2lvbklkIjoiMDBEMHcwMDAwMDAwdTdoMEFrMHcwMDAwMTBNOXdlIiwiZXhwaXJlc0F0IjoxNjU3MTA4MTMzLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdWF0LW5hdmlnYXRvciIsImF1ZCI6InVhdC1uYXZpZ2F0b3IiLCJhdXRoX3RpbWUiOjE2NTcxMDA5MzQsInVzZXJfaWQiOiIwMDUwdzAwMDAwM3R6MDhBQUEiLCJzdWIiOiIwMDUwdzAwMDAwM3R6MDhBQUEiLCJpYXQiOjE2NTcxMDA5MzQsImV4cCI6MTY1NzEwNDUzNCwiZW1haWwiOiJib2IrdGVzdGluZzAxQG1haWxpbmF0b3IuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImJvYit0ZXN0aW5nMDFAbWFpbGluYXRvci5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJjdXN0b20ifX0.IEC1hG-PYIePnczvHc_nlOKExcdQn8ji6B2hGL7Atv35QAPn0BaFW7YvyfWbERh46nFE5GSnN8XvRGoM7mBotHebjuRR4oYv7u9DHqM5lGer4cRRdpQHz6u3ljKjV63y24DlgVXzOy9Q2TCP4G4ukBy6UL8JnzXwIyOWHz_BMcO6c9Bp_t5HCeLRJmhpIC0MeNukp6hzobE7Q6M---I2yCsXAKdVo3pBgo6g3ChfLRJIOLGfQD1-_v_S5Hs9Wlk0xZE_PKMshM4-M7RX17y3l4WibmggnpMg9PoZ3az5fY01Gzt01-b8YYxR4povwlcrIzk2DgPGvrROt_gN915oVA"}',
        {
          headers: {
            'content-type': 'application/json',
            'x-client-version': 'Chrome/JsCore/9.6.5/FirebaseCore-web',
            'x-firebase-gmpid': '1:598264636609:web:d7b043d6955314d8b46040',
            'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
          },
        }
      )
    }
  )

  group('page_9 - https://navigator-front-figro5woaa-ts.a.run.app/', function () {
    response = http.get('https://navigator-front-figro5woaa-ts.a.run.app/', {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })

    response = http.get('https://digitalnavigator-uat.clevva.com/widget/', {
      headers: {
        'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })
    sleep(1.8)

    response = http.get(
      'https://fonts.googleapis.com/css?family=Open+Sans:400,600&subset=cyrillic',
      {
        headers: {
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDl_BdjzLBiU_9sAGEMdYQlVNGHC2LXL5c',
      '{"idToken":"eyJhbGciOiJSUzI1NiIsImtpZCI6IjUwYTdhYTlkNzg5MmI1MmE4YzgxMzkwMzIzYzVjMjJlMTkwMzI1ZDgiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQm9iIFRlc3R1c2VyIiwic2Vzc2lvbklkIjoiMDBEMHcwMDAwMDAwdTdoMEFrMHcwMDAwMTBNOXdlIiwiZXhwaXJlc0F0IjoxNjU3MTA4MTMzLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdWF0LW5hdmlnYXRvciIsImF1ZCI6InVhdC1uYXZpZ2F0b3IiLCJhdXRoX3RpbWUiOjE2NTcxMDA5MzQsInVzZXJfaWQiOiIwMDUwdzAwMDAwM3R6MDhBQUEiLCJzdWIiOiIwMDUwdzAwMDAwM3R6MDhBQUEiLCJpYXQiOjE2NTcxMDA5MzQsImV4cCI6MTY1NzEwNDUzNCwiZW1haWwiOiJib2IrdGVzdGluZzAxQG1haWxpbmF0b3IuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImJvYit0ZXN0aW5nMDFAbWFpbGluYXRvci5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJjdXN0b20ifX0.IEC1hG-PYIePnczvHc_nlOKExcdQn8ji6B2hGL7Atv35QAPn0BaFW7YvyfWbERh46nFE5GSnN8XvRGoM7mBotHebjuRR4oYv7u9DHqM5lGer4cRRdpQHz6u3ljKjV63y24DlgVXzOy9Q2TCP4G4ukBy6UL8JnzXwIyOWHz_BMcO6c9Bp_t5HCeLRJmhpIC0MeNukp6hzobE7Q6M---I2yCsXAKdVo3pBgo6g3ChfLRJIOLGfQD1-_v_S5Hs9Wlk0xZE_PKMshM4-M7RX17y3l4WibmggnpMg9PoZ3az5fY01Gzt01-b8YYxR4povwlcrIzk2DgPGvrROt_gN915oVA"}',
      {
        headers: {
          'content-type': 'application/json',
          'x-client-version': 'Chrome/JsCore/9.6.5/FirebaseCore-web',
          'x-firebase-gmpid': '1:598264636609:web:d7b043d6955314d8b46040',
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.post(
      'https://firestore.googleapis.com/google.firestore.v1.Firestore/Listen/channel?database=projects%2Fuat-navigator%2Fdatabases%2F(default)&VER=8&RID=51438&CVER=22&X-HTTP-Session-Id=gsessionid&%24httpHeaders=X-Goog-Api-Client%3Agl-js%2F%20fire%2F9.6.5%0D%0AContent-Type%3Atext%2Fplain%0D%0AX-Firebase-GMPID%3A1%3A598264636609%3Aweb%3Ad7b043d6955314d8b46040%0D%0AAuthorization%3ABearer%20eyJhbGciOiJSUzI1NiIsImtpZCI6IjUwYTdhYTlkNzg5MmI1MmE4YzgxMzkwMzIzYzVjMjJlMTkwMzI1ZDgiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQm9iIFRlc3R1c2VyIiwic2Vzc2lvbklkIjoiMDBEMHcwMDAwMDAwdTdoMEFrMHcwMDAwMTBNOXdlIiwiZXhwaXJlc0F0IjoxNjU3MTA4MTMzLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdWF0LW5hdmlnYXRvciIsImF1ZCI6InVhdC1uYXZpZ2F0b3IiLCJhdXRoX3RpbWUiOjE2NTcxMDA5MzQsInVzZXJfaWQiOiIwMDUwdzAwMDAwM3R6MDhBQUEiLCJzdWIiOiIwMDUwdzAwMDAwM3R6MDhBQUEiLCJpYXQiOjE2NTcxMDA5MzQsImV4cCI6MTY1NzEwNDUzNCwiZW1haWwiOiJib2IrdGVzdGluZzAxQG1haWxpbmF0b3IuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImJvYit0ZXN0aW5nMDFAbWFpbGluYXRvci5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJjdXN0b20ifX0.IEC1hG-PYIePnczvHc_nlOKExcdQn8ji6B2hGL7Atv35QAPn0BaFW7YvyfWbERh46nFE5GSnN8XvRGoM7mBotHebjuRR4oYv7u9DHqM5lGer4cRRdpQHz6u3ljKjV63y24DlgVXzOy9Q2TCP4G4ukBy6UL8JnzXwIyOWHz_BMcO6c9Bp_t5HCeLRJmhpIC0MeNukp6hzobE7Q6M---I2yCsXAKdVo3pBgo6g3ChfLRJIOLGfQD1-_v_S5Hs9Wlk0xZE_PKMshM4-M7RX17y3l4WibmggnpMg9PoZ3az5fY01Gzt01-b8YYxR4povwlcrIzk2DgPGvrROt_gN915oVA%0D%0A&zx=nxx303o7yj62&t=1',
      {
        count: '2',
        ofs: '0',
        req0___data__:
          '{"database":"projects/uat-navigator/databases/(default)","addTarget":{"documents":{"documents":["projects/uat-navigator/databases/(default)/documents/sessions/0050w000003tz08AAA"]},"targetId":4}}',
        req1___data__:
          '{"database":"projects/uat-navigator/databases/(default)","addTarget":{"documents":{"documents":["projects/uat-navigator/databases/(default)/documents/users/0050w000003tz08AAA"]},"targetId":6}}',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )
    sleep(4.2)

    response = http.post(
      'https://firestore.googleapis.com/google.firestore.v1.Firestore/Listen/channel?database=projects%2Fuat-navigator%2Fdatabases%2F(default)&VER=8&gsessionid=4yI9R6QgF3Fqhcm3-1om-2kSSPr_8LXI&SID=z1PZcQSz7Ncy72L3heTFyg&RID=51439&AID=7&zx=cx17h3p8m1m2&t=1',
      {
        count: '1',
        ofs: '2',
        req0___data__:
          '{"database":"projects/uat-navigator/databases/(default)","addTarget":{"query":{"structuredQuery":{"from":[{"collectionId":"sites"}],"where":{"fieldFilter":{"field":{"fieldPath":"status"},"op":"EQUAL","value":{"stringValue":"process"}}},"orderBy":[{"field":{"fieldPath":"__name__"},"direction":"ASCENDING"}]},"parent":"projects/uat-navigator/databases/(default)/documents/users/0050w000003tz08AAA"},"targetId":8}}',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )
    sleep(0.5)

    response = http.post(
      'https://firestore.googleapis.com/google.firestore.v1.Firestore/Listen/channel?database=projects%2Fuat-navigator%2Fdatabases%2F(default)&VER=8&gsessionid=4yI9R6QgF3Fqhcm3-1om-2kSSPr_8LXI&SID=z1PZcQSz7Ncy72L3heTFyg&RID=51440&AID=11&zx=t18s822rm0sr&t=1',
      {
        count: '1',
        ofs: '3',
        req0___data__: '{"database":"projects/uat-navigator/databases/(default)","removeTarget":8}',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.post(
      'https://firestore.googleapis.com/google.firestore.v1.Firestore/Listen/channel?database=projects%2Fuat-navigator%2Fdatabases%2F(default)&VER=8&gsessionid=4yI9R6QgF3Fqhcm3-1om-2kSSPr_8LXI&SID=z1PZcQSz7Ncy72L3heTFyg&RID=51441&AID=11&zx=qo7k888a0gy6&t=1',
      {
        count: '1',
        ofs: '4',
        req0___data__:
          '{"database":"projects/uat-navigator/databases/(default)","addTarget":{"documents":{"documents":["projects/uat-navigator/databases/(default)/documents/users/0050w000003tz08AAA/sites/www.houseofchocolate.co.nz"]},"targetId":10}}',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )
    sleep(0.5)

    response = http.post(
      'https://firestore.googleapis.com/google.firestore.v1.Firestore/Listen/channel?database=projects%2Fuat-navigator%2Fdatabases%2F(default)&VER=8&gsessionid=4yI9R6QgF3Fqhcm3-1om-2kSSPr_8LXI&SID=z1PZcQSz7Ncy72L3heTFyg&RID=51442&AID=16&zx=5e8aew8rtoqa&t=1',
      {
        count: '1',
        ofs: '5',
        req0___data__:
          '{"database":"projects/uat-navigator/databases/(default)","removeTarget":10}',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.post(
      'https://firestore.googleapis.com/google.firestore.v1.Firestore/Listen/channel?database=projects%2Fuat-navigator%2Fdatabases%2F(default)&VER=8&gsessionid=4yI9R6QgF3Fqhcm3-1om-2kSSPr_8LXI&SID=z1PZcQSz7Ncy72L3heTFyg&RID=51443&AID=16&zx=timieq67k3fy&t=1',
      {
        count: '1',
        ofs: '6',
        req0___data__:
          '{"database":"projects/uat-navigator/databases/(default)","addTarget":{"documents":{"documents":["projects/uat-navigator/databases/(default)/documents/users/0050w000003tz08AAA/sites/www.houseofchocolate.co.nz"]},"targetId":12}}',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )
    sleep(0.6)

    response = http.get(
      'https://storage.googleapis.com/uat-db-api-storage/1920x1080-www.houseofchocolate.co.nz.png',
      {
        headers: {
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get(
      'https://storage.googleapis.com/uat-db-api-storage/384x832-www.houseofchocolate.co.nz.png',
      {
        headers: {
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.post(
      'https://firestore.googleapis.com/google.firestore.v1.Firestore/Listen/channel?database=projects%2Fuat-navigator%2Fdatabases%2F(default)&VER=8&gsessionid=4yI9R6QgF3Fqhcm3-1om-2kSSPr_8LXI&SID=z1PZcQSz7Ncy72L3heTFyg&RID=51444&AID=21&zx=26en3hz341g2&t=1',
      {
        count: '1',
        ofs: '7',
        req0___data__:
          '{"database":"projects/uat-navigator/databases/(default)","addTarget":{"documents":{"documents":["projects/uat-navigator/databases/(default)/documents/media/2611"]},"targetId":14}}',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.post(
      'https://firestore.googleapis.com/google.firestore.v1.Firestore/Listen/channel?database=projects%2Fuat-navigator%2Fdatabases%2F(default)&VER=8&gsessionid=4yI9R6QgF3Fqhcm3-1om-2kSSPr_8LXI&SID=z1PZcQSz7Ncy72L3heTFyg&RID=51445&AID=25&zx=sebq6dfdjrjc&t=1',
      {
        count: '1',
        ofs: '8',
        req0___data__:
          '{"database":"projects/uat-navigator/databases/(default)","removeTarget":14}',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.post(
      'https://firestore.googleapis.com/google.firestore.v1.Firestore/Listen/channel?database=projects%2Fuat-navigator%2Fdatabases%2F(default)&VER=8&gsessionid=4yI9R6QgF3Fqhcm3-1om-2kSSPr_8LXI&SID=z1PZcQSz7Ncy72L3heTFyg&RID=51446&AID=25&zx=3wag3t43tdw6&t=1',
      {
        count: '1',
        ofs: '9',
        req0___data__:
          '{"database":"projects/uat-navigator/databases/(default)","addTarget":{"documents":{"documents":["projects/uat-navigator/databases/(default)/documents/media/undefined"]},"targetId":16}}',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.post(
      'https://firestore.googleapis.com/google.firestore.v1.Firestore/Listen/channel?database=projects%2Fuat-navigator%2Fdatabases%2F(default)&VER=8&gsessionid=4yI9R6QgF3Fqhcm3-1om-2kSSPr_8LXI&SID=z1PZcQSz7Ncy72L3heTFyg&RID=51447&AID=30&zx=rrc1zzx8nm2j&t=1',
      {
        count: '1',
        ofs: '10',
        req0___data__:
          '{"database":"projects/uat-navigator/databases/(default)","removeTarget":16}',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.post(
      'https://firestore.googleapis.com/google.firestore.v1.Firestore/Listen/channel?database=projects%2Fuat-navigator%2Fdatabases%2F(default)&VER=8&gsessionid=4yI9R6QgF3Fqhcm3-1om-2kSSPr_8LXI&SID=z1PZcQSz7Ncy72L3heTFyg&RID=51448&AID=30&zx=wfunb9hz52te&t=1',
      {
        count: '1',
        ofs: '11',
        req0___data__:
          '{"database":"projects/uat-navigator/databases/(default)","addTarget":{"documents":{"documents":["projects/uat-navigator/databases/(default)/documents/media/2571"]},"targetId":18}}',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.post(
      'https://firestore.googleapis.com/google.firestore.v1.Firestore/Listen/channel?database=projects%2Fuat-navigator%2Fdatabases%2F(default)&VER=8&gsessionid=4yI9R6QgF3Fqhcm3-1om-2kSSPr_8LXI&SID=z1PZcQSz7Ncy72L3heTFyg&RID=51449&AID=35&zx=d5o50wgm32w1&t=1',
      {
        count: '1',
        ofs: '12',
        req0___data__:
          '{"database":"projects/uat-navigator/databases/(default)","removeTarget":18}',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.post(
      'https://firestore.googleapis.com/google.firestore.v1.Firestore/Listen/channel?database=projects%2Fuat-navigator%2Fdatabases%2F(default)&VER=8&gsessionid=4yI9R6QgF3Fqhcm3-1om-2kSSPr_8LXI&SID=z1PZcQSz7Ncy72L3heTFyg&RID=51450&AID=35&zx=47fqfhmrg5h8&t=1',
      {
        count: '1',
        ofs: '13',
        req0___data__:
          '{"database":"projects/uat-navigator/databases/(default)","addTarget":{"documents":{"documents":["projects/uat-navigator/databases/(default)/documents/media/undefined"]},"targetId":20}}',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.post(
      'https://firestore.googleapis.com/google.firestore.v1.Firestore/Listen/channel?database=projects%2Fuat-navigator%2Fdatabases%2F(default)&VER=8&gsessionid=4yI9R6QgF3Fqhcm3-1om-2kSSPr_8LXI&SID=z1PZcQSz7Ncy72L3heTFyg&RID=51451&AID=40&zx=63hh6gk2goyi&t=1',
      {
        count: '1',
        ofs: '14',
        req0___data__:
          '{"database":"projects/uat-navigator/databases/(default)","removeTarget":20}',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.post(
      'https://firestore.googleapis.com/google.firestore.v1.Firestore/Listen/channel?database=projects%2Fuat-navigator%2Fdatabases%2F(default)&VER=8&gsessionid=4yI9R6QgF3Fqhcm3-1om-2kSSPr_8LXI&SID=z1PZcQSz7Ncy72L3heTFyg&RID=51452&AID=40&zx=9nr2vxeo9h2s&t=1',
      {
        count: '1',
        ofs: '15',
        req0___data__:
          '{"database":"projects/uat-navigator/databases/(default)","addTarget":{"documents":{"documents":["projects/uat-navigator/databases/(default)/documents/media/2605"]},"targetId":22}}',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get('https://cdn.plyr.io/3.6.12/plyr.svg', {
      headers: {
        'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })

    response = http.get('https://cdn.plyr.io/static/blank.mp4', {
      headers: {
        'accept-encoding': 'identity;q=1, *;q=0',
        range: 'bytes=0-',
        'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })

    response = http.post(
      'https://firestore.googleapis.com/google.firestore.v1.Firestore/Listen/channel?database=projects%2Fuat-navigator%2Fdatabases%2F(default)&VER=8&gsessionid=4yI9R6QgF3Fqhcm3-1om-2kSSPr_8LXI&SID=z1PZcQSz7Ncy72L3heTFyg&RID=51453&AID=45&zx=og1j2u7i2v6o&t=1',
      {
        count: '1',
        ofs: '16',
        req0___data__:
          '{"database":"projects/uat-navigator/databases/(default)","removeTarget":22}',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.post(
      'https://firestore.googleapis.com/google.firestore.v1.Firestore/Listen/channel?database=projects%2Fuat-navigator%2Fdatabases%2F(default)&VER=8&gsessionid=4yI9R6QgF3Fqhcm3-1om-2kSSPr_8LXI&SID=z1PZcQSz7Ncy72L3heTFyg&RID=51454&AID=45&zx=nrxktsgu0eo4&t=1',
      {
        count: '1',
        ofs: '17',
        req0___data__:
          '{"database":"projects/uat-navigator/databases/(default)","addTarget":{"documents":{"documents":["projects/uat-navigator/databases/(default)/documents/media/undefined"]},"targetId":24}}',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.post(
      'https://firestore.googleapis.com/google.firestore.v1.Firestore/Listen/channel?database=projects%2Fuat-navigator%2Fdatabases%2F(default)&VER=8&gsessionid=4yI9R6QgF3Fqhcm3-1om-2kSSPr_8LXI&SID=z1PZcQSz7Ncy72L3heTFyg&RID=51455&AID=50&zx=2xge2x901xst&t=1',
      {
        count: '1',
        ofs: '18',
        req0___data__:
          '{"database":"projects/uat-navigator/databases/(default)","removeTarget":24}',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.post(
      'https://firestore.googleapis.com/google.firestore.v1.Firestore/Listen/channel?database=projects%2Fuat-navigator%2Fdatabases%2F(default)&VER=8&gsessionid=4yI9R6QgF3Fqhcm3-1om-2kSSPr_8LXI&SID=z1PZcQSz7Ncy72L3heTFyg&RID=51456&AID=50&zx=h1kz23uunrv4&t=1',
      {
        count: '1',
        ofs: '19',
        req0___data__:
          '{"database":"projects/uat-navigator/databases/(default)","addTarget":{"documents":{"documents":["projects/uat-navigator/databases/(default)/documents/media/2607"]},"targetId":26}}',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.post(
      'https://firestore.googleapis.com/google.firestore.v1.Firestore/Listen/channel?database=projects%2Fuat-navigator%2Fdatabases%2F(default)&VER=8&gsessionid=4yI9R6QgF3Fqhcm3-1om-2kSSPr_8LXI&SID=z1PZcQSz7Ncy72L3heTFyg&RID=51457&AID=55&zx=wwq2c17zup07&t=1',
      {
        count: '1',
        ofs: '20',
        req0___data__:
          '{"database":"projects/uat-navigator/databases/(default)","removeTarget":26}',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.post(
      'https://firestore.googleapis.com/google.firestore.v1.Firestore/Listen/channel?database=projects%2Fuat-navigator%2Fdatabases%2F(default)&VER=8&gsessionid=4yI9R6QgF3Fqhcm3-1om-2kSSPr_8LXI&SID=z1PZcQSz7Ncy72L3heTFyg&RID=51458&AID=55&zx=lgmcb7cg60j1&t=1',
      {
        count: '1',
        ofs: '21',
        req0___data__:
          '{"database":"projects/uat-navigator/databases/(default)","addTarget":{"documents":{"documents":["projects/uat-navigator/databases/(default)/documents/media/undefined"]},"targetId":28}}',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.post(
      'https://firestore.googleapis.com/google.firestore.v1.Firestore/Listen/channel?database=projects%2Fuat-navigator%2Fdatabases%2F(default)&VER=8&gsessionid=4yI9R6QgF3Fqhcm3-1om-2kSSPr_8LXI&SID=z1PZcQSz7Ncy72L3heTFyg&RID=51459&AID=60&zx=ezucqpnf0esm&t=1',
      {
        count: '1',
        ofs: '22',
        req0___data__:
          '{"database":"projects/uat-navigator/databases/(default)","removeTarget":28}',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.post(
      'https://firestore.googleapis.com/google.firestore.v1.Firestore/Listen/channel?database=projects%2Fuat-navigator%2Fdatabases%2F(default)&VER=8&gsessionid=4yI9R6QgF3Fqhcm3-1om-2kSSPr_8LXI&SID=z1PZcQSz7Ncy72L3heTFyg&RID=51460&AID=60&zx=sir1eogub3b0&t=1',
      {
        count: '1',
        ofs: '23',
        req0___data__:
          '{"database":"projects/uat-navigator/databases/(default)","addTarget":{"documents":{"documents":["projects/uat-navigator/databases/(default)/documents/media/2582"]},"targetId":30}}',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.post(
      'https://firestore.googleapis.com/google.firestore.v1.Firestore/Listen/channel?database=projects%2Fuat-navigator%2Fdatabases%2F(default)&VER=8&gsessionid=4yI9R6QgF3Fqhcm3-1om-2kSSPr_8LXI&SID=z1PZcQSz7Ncy72L3heTFyg&RID=51461&AID=65&zx=s61fye126y3c&t=1',
      {
        count: '1',
        ofs: '24',
        req0___data__:
          '{"database":"projects/uat-navigator/databases/(default)","removeTarget":30}',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.post(
      'https://firestore.googleapis.com/google.firestore.v1.Firestore/Listen/channel?database=projects%2Fuat-navigator%2Fdatabases%2F(default)&VER=8&gsessionid=4yI9R6QgF3Fqhcm3-1om-2kSSPr_8LXI&SID=z1PZcQSz7Ncy72L3heTFyg&RID=51462&AID=65&zx=dyy80l1duxqi&t=1',
      {
        count: '1',
        ofs: '25',
        req0___data__:
          '{"database":"projects/uat-navigator/databases/(default)","addTarget":{"documents":{"documents":["projects/uat-navigator/databases/(default)/documents/media/undefined"]},"targetId":32}}',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.post(
      'https://firestore.googleapis.com/google.firestore.v1.Firestore/Listen/channel?database=projects%2Fuat-navigator%2Fdatabases%2F(default)&VER=8&gsessionid=4yI9R6QgF3Fqhcm3-1om-2kSSPr_8LXI&SID=z1PZcQSz7Ncy72L3heTFyg&RID=51463&AID=70&zx=hvyzlgviepat&t=1',
      {
        count: '1',
        ofs: '26',
        req0___data__:
          '{"database":"projects/uat-navigator/databases/(default)","removeTarget":32}',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.post(
      'https://firestore.googleapis.com/google.firestore.v1.Firestore/Listen/channel?database=projects%2Fuat-navigator%2Fdatabases%2F(default)&VER=8&gsessionid=4yI9R6QgF3Fqhcm3-1om-2kSSPr_8LXI&SID=z1PZcQSz7Ncy72L3heTFyg&RID=51464&AID=70&zx=4qehenmoqq6w&t=1',
      {
        count: '1',
        ofs: '27',
        req0___data__:
          '{"database":"projects/uat-navigator/databases/(default)","addTarget":{"documents":{"documents":["projects/uat-navigator/databases/(default)/documents/media/2571"]},"targetId":34}}',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.post(
      'https://firestore.googleapis.com/google.firestore.v1.Firestore/Listen/channel?database=projects%2Fuat-navigator%2Fdatabases%2F(default)&VER=8&gsessionid=4yI9R6QgF3Fqhcm3-1om-2kSSPr_8LXI&SID=z1PZcQSz7Ncy72L3heTFyg&RID=51465&AID=75&zx=37n2bcf7fbt6&t=1',
      {
        count: '1',
        ofs: '28',
        req0___data__:
          '{"database":"projects/uat-navigator/databases/(default)","removeTarget":34}',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.post(
      'https://firestore.googleapis.com/google.firestore.v1.Firestore/Listen/channel?database=projects%2Fuat-navigator%2Fdatabases%2F(default)&VER=8&gsessionid=4yI9R6QgF3Fqhcm3-1om-2kSSPr_8LXI&SID=z1PZcQSz7Ncy72L3heTFyg&RID=51466&AID=75&zx=auym991ev1it&t=1',
      {
        count: '1',
        ofs: '29',
        req0___data__:
          '{"database":"projects/uat-navigator/databases/(default)","addTarget":{"documents":{"documents":["projects/uat-navigator/databases/(default)/documents/media/undefined"]},"targetId":36}}',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.post(
      'https://firestore.googleapis.com/google.firestore.v1.Firestore/Listen/channel?database=projects%2Fuat-navigator%2Fdatabases%2F(default)&VER=8&gsessionid=4yI9R6QgF3Fqhcm3-1om-2kSSPr_8LXI&SID=z1PZcQSz7Ncy72L3heTFyg&RID=51467&AID=80&zx=ta5panz1b9qn&t=1',
      {
        count: '1',
        ofs: '30',
        req0___data__:
          '{"database":"projects/uat-navigator/databases/(default)","removeTarget":36}',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )
  })
}