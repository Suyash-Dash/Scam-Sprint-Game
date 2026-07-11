/* ============================================================
   Scam Sprint Ultimate Arcade V16 — FFlevels.js
   Purpose: all 657 V15 rounds preserved, with V16 metadata compatibility; no rounds removed.
   ============================================================ */

window.FF_SCAM_ARCADE_DATA = {
  "site": {
    "gameName": "Scam Sprint: FraudFront Ultimate Arcade by Suyash Dash",
    "tagline": "By Suyash Dash",
    "totalPlayableRounds": 657,
    "totalMechanics": 95,
    "arcadeRoundsBeforeBoss": 34,
    "version": "16.0"
  },
  "rounds": [
    {
      "seconds": 11,
      "difficulty": "easy",
      "id": "safe-bank-text-trap",
      "type": "safeChoice",
      "title": "Bank Text Trap",
      "category": "Bank Phishing",
      "command": "CHOOSE THE SAFEST ACTION",
      "directions": "Read the situation and choose the safest realistic next step.",
      "scenario": "A text says your bank account will lock unless you click a link.",
      "options": [
        [
          "Click the link",
          false
        ],
        [
          "Reply with password",
          false
        ],
        [
          "Open the official bank app separately",
          true
        ],
        [
          "Forward it to everyone",
          false
        ]
      ],
      "lesson": "Use official apps or typed URLs, not surprise links."
    },
    {
      "seconds": 11,
      "difficulty": "easy",
      "id": "safe-tech-support-pop-up",
      "type": "safeChoice",
      "title": "Tech Support Pop-Up",
      "category": "Tech Support",
      "command": "CHOOSE THE SAFEST ACTION",
      "directions": "Read the situation and choose the safest realistic next step.",
      "scenario": "A pop-up says your computer is infected and shows a support number.",
      "options": [
        [
          "Call the pop-up number",
          false
        ],
        [
          "Give remote access",
          false
        ],
        [
          "Close it and use trusted support",
          true
        ],
        [
          "Pay immediately",
          false
        ]
      ],
      "lesson": "Do not call numbers from pop-ups or grant remote access."
    },
    {
      "seconds": 11,
      "difficulty": "medium",
      "id": "safe-campus-password-expiring",
      "type": "safeChoice",
      "title": "Campus Password Expiring",
      "category": "University Phishing",
      "command": "CHOOSE THE SAFEST ACTION",
      "directions": "Read the situation and choose the safest realistic next step.",
      "scenario": "An email says your university password expires tonight and links to a login page.",
      "options": [
        [
          "Click the login link",
          false
        ],
        [
          "Reply with password",
          false
        ],
        [
          "Go to the official university portal separately",
          true
        ],
        [
          "Send the link to friends",
          false
        ]
      ],
      "lesson": "Password-expiration messages should be verified through the official portal."
    },
    {
      "seconds": 11,
      "difficulty": "medium",
      "id": "safe-pay-first-job-offer",
      "type": "safeChoice",
      "title": "Pay-First Job Offer",
      "category": "Job Scam",
      "command": "CHOOSE THE SAFEST ACTION",
      "directions": "Read the situation and choose the safest realistic next step.",
      "scenario": "A remote job offer says you must pay an equipment fee before the interview.",
      "options": [
        [
          "Pay the fee",
          false
        ],
        [
          "Call the email number",
          false
        ],
        [
          "Verify through the official careers page",
          true
        ],
        [
          "Send bank info",
          false
        ]
      ],
      "lesson": "Real employers do not require upfront fees before interviews."
    },
    {
      "seconds": 11,
      "difficulty": "medium",
      "id": "safe-video-codec-trap",
      "type": "safeChoice",
      "title": "Video Codec Trap",
      "category": "Streaming Malware",
      "command": "CHOOSE THE SAFEST ACTION",
      "directions": "Read the situation and choose the safest realistic next step.",
      "scenario": "A video page says buffering will stop only if you download a special player.",
      "options": [
        [
          "Download the player",
          false
        ],
        [
          "Allow notifications",
          false
        ],
        [
          "Close the page",
          true
        ],
        [
          "Enter card for HD mode",
          false
        ]
      ],
      "lesson": "Fake players and codecs are common malware traps."
    },
    {
      "seconds": 9,
      "difficulty": "hard",
      "id": "safe-voice-clone-emergency",
      "type": "safeChoice",
      "title": "Voice Clone Emergency",
      "category": "AI Voice Scam",
      "command": "CHOOSE THE SAFEST ACTION",
      "directions": "Read the situation and choose the safest realistic next step.",
      "scenario": "A familiar voice asks for emergency money from an unknown number.",
      "options": [
        [
          "Send money now",
          false
        ],
        [
          "Call a saved number or trusted relative",
          true
        ],
        [
          "Keep it secret",
          false
        ],
        [
          "Ask for a payment link",
          false
        ]
      ],
      "lesson": "A familiar voice is not enough; verify through known contacts."
    },
    {
      "seconds": 9,
      "difficulty": "hard",
      "id": "safe-crypto-countdown",
      "type": "safeChoice",
      "title": "Crypto Countdown",
      "category": "Investment Scam",
      "command": "CHOOSE THE SAFEST ACTION",
      "directions": "Read the situation and choose the safest realistic next step.",
      "scenario": "An online advisor promises guaranteed returns if you invest tonight.",
      "options": [
        [
          "Invest tonight",
          false
        ],
        [
          "Borrow money to invest",
          false
        ],
        [
          "Research and talk to a licensed advisor",
          true
        ],
        [
          "Invite family quickly",
          false
        ]
      ],
      "lesson": "Guaranteed returns and urgency are major scam signals."
    },
    {
      "seconds": 11,
      "difficulty": "medium",
      "id": "safe-qr-parking-trap",
      "type": "safeChoice",
      "title": "QR Parking Trap",
      "category": "QR Scam",
      "command": "CHOOSE THE SAFEST ACTION",
      "directions": "Read the situation and choose the safest realistic next step.",
      "scenario": "A parking QR sticker opens a payment page that does not look official.",
      "options": [
        [
          "Pay through sticker QR",
          false
        ],
        [
          "Use official parking app or city website",
          true
        ],
        [
          "Enter bank login",
          false
        ],
        [
          "Save card on unknown page",
          false
        ]
      ],
      "lesson": "Random QR stickers can hide fake payment pages."
    },
    {
      "seconds": 11,
      "difficulty": "easy",
      "id": "safe-package-fee-text",
      "type": "safeChoice",
      "title": "Package Fee Text",
      "category": "Package Scam",
      "command": "CHOOSE THE SAFEST ACTION",
      "directions": "Read the situation and choose the safest realistic next step.",
      "scenario": "A text says your package is delayed and asks for a $1.50 redelivery fee through a strange link.",
      "options": [
        [
          "Pay quickly",
          false
        ],
        [
          "Type the carrier website yourself",
          true
        ],
        [
          "Reply with card info",
          false
        ],
        [
          "Send your address again",
          false
        ]
      ],
      "lesson": "Tiny fees can be bait for stealing card details."
    },
    {
      "seconds": 11,
      "difficulty": "medium",
      "id": "safe-gift-card-boss",
      "type": "safeChoice",
      "title": "Gift Card Boss",
      "category": "Gift Card Scam",
      "command": "CHOOSE THE SAFEST ACTION",
      "directions": "Read the situation and choose the safest realistic next step.",
      "scenario": "A person claiming to be your boss asks for gift cards and says not to tell anyone.",
      "options": [
        [
          "Buy the cards",
          false
        ],
        [
          "Send the codes",
          false
        ],
        [
          "Verify through a known work channel",
          true
        ],
        [
          "Apologize and hurry",
          false
        ]
      ],
      "lesson": "Secrecy plus gift cards is a classic scam pattern."
    },
    {
      "seconds": 11,
      "difficulty": "medium",
      "id": "safe-fake-charity-urgency",
      "type": "safeChoice",
      "title": "Fake Charity Urgency",
      "category": "Charity Scam",
      "command": "CHOOSE THE SAFEST ACTION",
      "directions": "Read the situation and choose the safest realistic next step.",
      "scenario": "A donation page appears after a disaster and pressures you to donate in crypto immediately.",
      "options": [
        [
          "Donate now",
          false
        ],
        [
          "Research the charity independently",
          true
        ],
        [
          "Send crypto",
          false
        ],
        [
          "Share the page without checking",
          false
        ]
      ],
      "lesson": "Real charities can be checked through trusted sources."
    },
    {
      "seconds": 9,
      "difficulty": "hard",
      "id": "safe-rental-deposit-rush",
      "type": "safeChoice",
      "title": "Rental Deposit Rush",
      "category": "Rental Scam",
      "command": "CHOOSE THE SAFEST ACTION",
      "directions": "Read the situation and choose the safest realistic next step.",
      "scenario": "A landlord refuses a tour but wants a deposit through a payment app before anyone else gets the apartment.",
      "options": [
        [
          "Pay deposit",
          false
        ],
        [
          "Ask to tour and verify ownership",
          true
        ],
        [
          "Send ID",
          false
        ],
        [
          "Ignore red flags because it is cheap",
          false
        ]
      ],
      "lesson": "No tour, urgent deposit, and off-platform payment are big rental scam signs."
    },
    {
      "seconds": 12,
      "difficulty": "easy",
      "id": "web-fake-bank-lockdown",
      "type": "dangerWebsite",
      "title": "Fake Bank Lockdown",
      "category": "Bank Phishing",
      "command": "ESCAPE THE TRAP PAGE",
      "directions": "Choose the safe exit or official-source action before time runs out.",
      "url": "secure-bank-verify.co/login",
      "headline": "Account locked in 30 minutes",
      "body": "Enter username, password, and text code to prevent closure",
      "options": [
        [
          "Continue to login",
          false
        ],
        [
          "Enter text code",
          false
        ],
        [
          "Close page and open official app",
          true
        ],
        [
          "Download security tool",
          false
        ]
      ],
      "lesson": "Use official apps or typed URLs."
    },
    {
      "seconds": 12,
      "difficulty": "medium",
      "id": "web-medicare-card-trap",
      "type": "dangerWebsite",
      "title": "Medicare Card Trap",
      "category": "Health Fraud",
      "command": "ESCAPE THE TRAP PAGE",
      "directions": "Choose the safe exit or official-source action before time runs out.",
      "url": "medicare-card-update-now.info",
      "headline": "Coverage may stop today",
      "body": "Confirm Medicare number and SSN to receive a new card",
      "options": [
        [
          "Enter Medicare number",
          false
        ],
        [
          "Enter SSN",
          false
        ],
        [
          "Leave and use official source",
          true
        ],
        [
          "Call number on page",
          false
        ]
      ],
      "lesson": "Verify health-benefit requests officially."
    },
    {
      "seconds": 12,
      "difficulty": "medium",
      "id": "web-campus-password-portal",
      "type": "dangerWebsite",
      "title": "Campus Password Portal",
      "category": "University Phishing",
      "command": "ESCAPE THE TRAP PAGE",
      "directions": "Choose the safe exit or official-source action before time runs out.",
      "url": "campus-password-renewal.com",
      "headline": "Password expires tonight",
      "body": "Sign in immediately or your account will be disabled",
      "options": [
        [
          "Sign in here",
          false
        ],
        [
          "Enter old password",
          false
        ],
        [
          "Open official portal separately",
          true
        ],
        [
          "Forward link",
          false
        ]
      ],
      "lesson": "Lookalike school portals steal credentials."
    },
    {
      "seconds": 10,
      "difficulty": "hard",
      "id": "web-ai-tool-unlocker",
      "type": "dangerWebsite",
      "title": "AI Tool Unlocker",
      "category": "AI Malware",
      "command": "ESCAPE THE TRAP PAGE",
      "directions": "Choose the safe exit or official-source action before time runs out.",
      "url": "free-ai-pro-unlocker.net",
      "headline": "Unlock premium AI tools",
      "body": "Install this unlocker for free paid AI features",
      "options": [
        [
          "Install unlocker",
          false
        ],
        [
          "Disable antivirus",
          false
        ],
        [
          "Close page",
          true
        ],
        [
          "Connect account",
          false
        ]
      ],
      "lesson": "Cracked tools are malware risks."
    },
    {
      "seconds": 12,
      "difficulty": "medium",
      "id": "web-refund-desk-trap",
      "type": "dangerWebsite",
      "title": "Refund Desk Trap",
      "category": "Refund Scam",
      "command": "ESCAPE THE TRAP PAGE",
      "directions": "Choose the safe exit or official-source action before time runs out.",
      "url": "refund-security-helpdesk.net",
      "headline": "You were charged $499",
      "body": "Call the refund desk now; do not contact your bank",
      "options": [
        [
          "Call refund desk",
          false
        ],
        [
          "Install screen-share app",
          false
        ],
        [
          "Check real bank account separately",
          true
        ],
        [
          "Enter card",
          false
        ]
      ],
      "lesson": "Refund scams push fake support calls."
    },
    {
      "seconds": 12,
      "difficulty": "easy",
      "id": "web-prize-claim-portal",
      "type": "dangerWebsite",
      "title": "Prize Claim Portal",
      "category": "Prize Scam",
      "command": "ESCAPE THE TRAP PAGE",
      "directions": "Choose the safe exit or official-source action before time runs out.",
      "url": "winner-claim-fast.biz",
      "headline": "You won a gift card",
      "body": "Pay a small processing fee and upload ID",
      "options": [
        [
          "Pay fee",
          false
        ],
        [
          "Upload ID",
          false
        ],
        [
          "Close page",
          true
        ],
        [
          "Enter card",
          false
        ]
      ],
      "lesson": "Real prizes do not require surprise fees."
    },
    {
      "seconds": 12,
      "difficulty": "medium",
      "id": "web-streaming-movie-mirror",
      "type": "dangerWebsite",
      "title": "Streaming Movie Mirror",
      "category": "Streaming Malware",
      "command": "ESCAPE THE TRAP PAGE",
      "directions": "Choose the safe exit or official-source action before time runs out.",
      "url": "free-hd-movie-player.co",
      "headline": "HD player required",
      "body": "Download the player to continue watching",
      "options": [
        [
          "Download player",
          false
        ],
        [
          "Allow browser alerts",
          false
        ],
        [
          "Exit the site",
          true
        ],
        [
          "Enter card for age check",
          false
        ]
      ],
      "lesson": "Fake streaming pages often push malware or card theft."
    },
    {
      "seconds": 10,
      "difficulty": "hard",
      "id": "web-fake-government-form",
      "type": "dangerWebsite",
      "title": "Fake Government Form",
      "category": "Government Impersonation",
      "command": "ESCAPE THE TRAP PAGE",
      "directions": "Choose the safe exit or official-source action before time runs out.",
      "url": "gov-benefit-renewal.info",
      "headline": "Benefit renewal deadline",
      "body": "Submit SSN and banking details today",
      "options": [
        [
          "Submit SSN",
          false
        ],
        [
          "Pay processing fee",
          false
        ],
        [
          "Go to the official government site",
          true
        ],
        [
          "Upload passport",
          false
        ]
      ],
      "lesson": "Government services should be verified through official domains."
    },
    {
      "seconds": 12,
      "difficulty": "easy",
      "id": "web-free-robux-portal",
      "type": "dangerWebsite",
      "title": "Free Robux Portal",
      "category": "Gaming Scam",
      "command": "ESCAPE THE TRAP PAGE",
      "directions": "Choose the safe exit or official-source action before time runs out.",
      "url": "game-prize-fast.net",
      "headline": "Free coins unlocked",
      "body": "Log in to claim rare items before midnight",
      "options": [
        [
          "Log in",
          false
        ],
        [
          "Share password",
          false
        ],
        [
          "Close the page",
          true
        ],
        [
          "Invite friends",
          false
        ]
      ],
      "lesson": "Free item sites steal game accounts."
    },
    {
      "seconds": 12,
      "difficulty": "medium",
      "id": "web-fake-shopping-checkout",
      "type": "dangerWebsite",
      "title": "Fake Shopping Checkout",
      "category": "Shopping Scam",
      "command": "ESCAPE THE TRAP PAGE",
      "directions": "Choose the safe exit or official-source action before time runs out.",
      "url": "clearance-brand-outlet.shop",
      "headline": "90% off final sale",
      "body": "Checkout now; no returns; pay by transfer",
      "options": [
        [
          "Pay by transfer",
          false
        ],
        [
          "Save card",
          false
        ],
        [
          "Leave and buy from a trusted store",
          true
        ],
        [
          "Ignore missing contact info",
          false
        ]
      ],
      "lesson": "Too-good-to-be-true stores often steal payments."
    },
    {
      "seconds": 10,
      "difficulty": "hard",
      "id": "web-romance-shipping-fee",
      "type": "dangerWebsite",
      "title": "Romance Shipping Fee",
      "category": "Romance Scam",
      "command": "ESCAPE THE TRAP PAGE",
      "directions": "Choose the safe exit or official-source action before time runs out.",
      "url": "love-package-release.net",
      "headline": "Package held for your sweetheart",
      "body": "Pay customs fee so your online partner can visit",
      "options": [
        [
          "Pay fee",
          false
        ],
        [
          "Send gift cards",
          false
        ],
        [
          "Close and verify the story",
          true
        ],
        [
          "Upload ID",
          false
        ]
      ],
      "lesson": "Romance scams often add fake travel, package, or emergency fees."
    },
    {
      "seconds": 12,
      "difficulty": "medium",
      "id": "web-mock-scholarship-site",
      "type": "dangerWebsite",
      "title": "Mock Scholarship Site",
      "category": "Student Scam",
      "command": "ESCAPE THE TRAP PAGE",
      "directions": "Choose the safe exit or official-source action before time runs out.",
      "url": "purdue-scholarship-help.co",
      "headline": "Claim your award",
      "body": "Enter school login and bank info to receive your grant",
      "options": [
        [
          "Enter login",
          false
        ],
        [
          "Enter bank info",
          false
        ],
        [
          "Check the official school financial aid site",
          true
        ],
        [
          "Forward the link",
          false
        ]
      ],
      "lesson": "School scams copy branding but use lookalike domains."
    },
    {
      "seconds": 13,
      "difficulty": "medium",
      "id": "inspect-spot-fake-bank-red-flags",
      "type": "siteInspector",
      "title": "Spot Fake Bank Red Flags",
      "category": "Bank Phishing",
      "command": "CLICK 3 RED FLAGS",
      "directions": "Inspect the mock website and select only the scam warning signs.",
      "url": "bank-secure-update.co",
      "headline": "Account Locked",
      "flags": [
        [
          "Lookalike domain",
          true
        ],
        [
          "Urgent countdown",
          true
        ],
        [
          "Requests passcode",
          true
        ],
        [
          "Normal logo",
          false
        ],
        [
          "Friendly color",
          false
        ]
      ],
      "needed": 3,
      "lesson": "Find domain tricks, urgency, and credential/code requests."
    },
    {
      "seconds": 13,
      "difficulty": "medium",
      "id": "inspect-spot-fake-store-red-flags",
      "type": "siteInspector",
      "title": "Spot Fake Store Red Flags",
      "category": "Shopping Scam",
      "command": "CLICK 3 RED FLAGS",
      "directions": "Inspect the mock website and select only the scam warning signs.",
      "url": "mega-clearance-official.shop",
      "headline": "Luxury items 95% off",
      "flags": [
        [
          "Huge discount",
          true
        ],
        [
          "No return address",
          true
        ],
        [
          "Pay by wire",
          true
        ],
        [
          "Product photos",
          false
        ],
        [
          "Search bar",
          false
        ]
      ],
      "needed": 3,
      "lesson": "Fake stores often use extreme prices and unsafe payment methods."
    },
    {
      "seconds": 13,
      "difficulty": "medium",
      "id": "inspect-spot-fake-charity-red-flags",
      "type": "siteInspector",
      "title": "Spot Fake Charity Red Flags",
      "category": "Charity Scam",
      "command": "CLICK 3 RED FLAGS",
      "directions": "Inspect the mock website and select only the scam warning signs.",
      "url": "urgent-relief-crypto.net",
      "headline": "Donate before midnight",
      "flags": [
        [
          "Crypto-only donation",
          true
        ],
        [
          "No charity registration",
          true
        ],
        [
          "Pressure language",
          true
        ],
        [
          "Donation button",
          false
        ],
        [
          "Photo of volunteers",
          false
        ]
      ],
      "needed": 3,
      "lesson": "Real charities should be verifiable and not crypto-only under pressure."
    },
    {
      "seconds": 11,
      "difficulty": "hard",
      "id": "inspect-spot-fake-romance-travel-page",
      "type": "siteInspector",
      "title": "Spot Fake Romance Travel Page",
      "category": "Romance Scam",
      "command": "CLICK 3 RED FLAGS",
      "directions": "Inspect the mock website and select only the scam warning signs.",
      "url": "love-ticket-release.biz",
      "headline": "Release travel ticket",
      "flags": [
        [
          "Customs fee pressure",
          true
        ],
        [
          "Unknown payment page",
          true
        ],
        [
          "Partner says keep secret",
          true
        ],
        [
          "Heart icon",
          false
        ],
        [
          "Contact form",
          false
        ]
      ],
      "needed": 3,
      "lesson": "Romance scams invent travel fees, secret payments, and fake portals."
    },
    {
      "seconds": 11,
      "difficulty": "hard",
      "id": "inspect-spot-fake-ai-tool",
      "type": "siteInspector",
      "title": "Spot Fake AI Tool",
      "category": "AI Malware",
      "command": "CLICK 3 RED FLAGS",
      "directions": "Inspect the mock website and select only the scam warning signs.",
      "url": "pro-ai-unlocker-download.co",
      "headline": "Free premium unlocker",
      "flags": [
        [
          "Download unlocker",
          true
        ],
        [
          "Disable antivirus",
          true
        ],
        [
          "No real company info",
          true
        ],
        [
          "Gradient background",
          false
        ],
        [
          "FAQ title",
          false
        ]
      ],
      "needed": 3,
      "lesson": "Free unlockers often hide malware."
    },
    {
      "seconds": 22,
      "difficulty": "easy",
      "id": "romance-swipe-1",
      "type": "romanceSwipe",
      "title": "Romance Swipe 1",
      "category": "Romance Scam",
      "command": "LEFT = SCAM, RIGHT = OK",
      "directions": "Swipe/click left on scam profiles, right on safer interactions.",
      "profiles": [
        [
          "Ava",
          "Says they love you after one day and asks for a gift card to fix a travel emergency.",
          true,
          "Fast love plus money request is a romance scam signal."
        ],
        [
          "Jordan",
          "Keeps conversation on the app and suggests a public coffee meetup next week.",
          false,
          "Public plans and no money pressure are much safer."
        ],
        [
          "Mika",
          "Claims to be overseas, refuses video calls, and needs crypto for a passport fee.",
          true,
          "Refusing verification and asking for crypto is high risk."
        ]
      ],
      "lesson": "Romance scams use fast attachment, secrecy, isolation, links, and money pressure."
    },
    {
      "seconds": 22,
      "difficulty": "easy",
      "id": "romance-swipe-2",
      "type": "romanceSwipe",
      "title": "Romance Swipe 2",
      "category": "Romance Scam",
      "command": "LEFT = SCAM, RIGHT = OK",
      "directions": "Swipe/click left on scam profiles, right on safer interactions.",
      "profiles": [
        [
          "Jordan",
          "Keeps conversation on the app and suggests a public coffee meetup next week.",
          false,
          "Public plans and no money pressure are much safer."
        ],
        [
          "Mika",
          "Claims to be overseas, refuses video calls, and needs crypto for a passport fee.",
          true,
          "Refusing verification and asking for crypto is high risk."
        ],
        [
          "Sam",
          "Shares normal hobbies, does not ask for money, and respects boundaries.",
          false,
          "Healthy conversation does not pressure or isolate you."
        ]
      ],
      "lesson": "Romance scams use fast attachment, secrecy, isolation, links, and money pressure."
    },
    {
      "seconds": 22,
      "difficulty": "easy",
      "id": "romance-swipe-3",
      "type": "romanceSwipe",
      "title": "Romance Swipe 3",
      "category": "Romance Scam",
      "command": "LEFT = SCAM, RIGHT = OK",
      "directions": "Swipe/click left on scam profiles, right on safer interactions.",
      "profiles": [
        [
          "Mika",
          "Claims to be overseas, refuses video calls, and needs crypto for a passport fee.",
          true,
          "Refusing verification and asking for crypto is high risk."
        ],
        [
          "Sam",
          "Shares normal hobbies, does not ask for money, and respects boundaries.",
          false,
          "Healthy conversation does not pressure or isolate you."
        ],
        [
          "Noah",
          "Asks you to receive a package and forward it to another address.",
          true,
          "Package forwarding can involve stolen goods or money mule activity."
        ]
      ],
      "lesson": "Romance scams use fast attachment, secrecy, isolation, links, and money pressure."
    },
    {
      "seconds": 22,
      "difficulty": "medium",
      "id": "romance-swipe-4",
      "type": "romanceSwipe",
      "title": "Romance Swipe 4",
      "category": "Romance Scam",
      "command": "LEFT = SCAM, RIGHT = OK",
      "directions": "Swipe/click left on scam profiles, right on safer interactions.",
      "profiles": [
        [
          "Sam",
          "Shares normal hobbies, does not ask for money, and respects boundaries.",
          false,
          "Healthy conversation does not pressure or isolate you."
        ],
        [
          "Noah",
          "Asks you to receive a package and forward it to another address.",
          true,
          "Package forwarding can involve stolen goods or money mule activity."
        ],
        [
          "Riley",
          "Wants to move to encrypted chat immediately and asks you to keep the relationship secret.",
          true,
          "Secrecy and moving off-platform quickly can be manipulation."
        ]
      ],
      "lesson": "Romance scams use fast attachment, secrecy, isolation, links, and money pressure."
    },
    {
      "seconds": 22,
      "difficulty": "medium",
      "id": "romance-swipe-5",
      "type": "romanceSwipe",
      "title": "Romance Swipe 5",
      "category": "Romance Scam",
      "command": "LEFT = SCAM, RIGHT = OK",
      "directions": "Swipe/click left on scam profiles, right on safer interactions.",
      "profiles": [
        [
          "Noah",
          "Asks you to receive a package and forward it to another address.",
          true,
          "Package forwarding can involve stolen goods or money mule activity."
        ],
        [
          "Riley",
          "Wants to move to encrypted chat immediately and asks you to keep the relationship secret.",
          true,
          "Secrecy and moving off-platform quickly can be manipulation."
        ],
        [
          "Taylor",
          "Asks you to click a link to verify your dating profile.",
          true,
          "Dating verification links can steal credentials or card info."
        ]
      ],
      "lesson": "Romance scams use fast attachment, secrecy, isolation, links, and money pressure."
    },
    {
      "seconds": 22,
      "difficulty": "medium",
      "id": "romance-swipe-6",
      "type": "romanceSwipe",
      "title": "Romance Swipe 6",
      "category": "Romance Scam",
      "command": "LEFT = SCAM, RIGHT = OK",
      "directions": "Swipe/click left on scam profiles, right on safer interactions.",
      "profiles": [
        [
          "Riley",
          "Wants to move to encrypted chat immediately and asks you to keep the relationship secret.",
          true,
          "Secrecy and moving off-platform quickly can be manipulation."
        ],
        [
          "Taylor",
          "Asks you to click a link to verify your dating profile.",
          true,
          "Dating verification links can steal credentials or card info."
        ],
        [
          "Morgan",
          "Chats slowly, no emergency, no links, and no payment request.",
          false,
          "No urgency, money, or secrecy is a safer pattern."
        ]
      ],
      "lesson": "Romance scams use fast attachment, secrecy, isolation, links, and money pressure."
    },
    {
      "seconds": 18,
      "difficulty": "hard",
      "id": "romance-swipe-7",
      "type": "romanceSwipe",
      "title": "Romance Swipe 7",
      "category": "Romance Scam",
      "command": "LEFT = SCAM, RIGHT = OK",
      "directions": "Swipe/click left on scam profiles, right on safer interactions.",
      "profiles": [
        [
          "Taylor",
          "Asks you to click a link to verify your dating profile.",
          true,
          "Dating verification links can steal credentials or card info."
        ],
        [
          "Morgan",
          "Chats slowly, no emergency, no links, and no payment request.",
          false,
          "No urgency, money, or secrecy is a safer pattern."
        ],
        [
          "Casey",
          "Says their bank is frozen and asks you to buy prepaid cards.",
          true,
          "Gift card requests are never a safe romance step."
        ]
      ],
      "lesson": "Romance scams use fast attachment, secrecy, isolation, links, and money pressure."
    },
    {
      "seconds": 18,
      "difficulty": "hard",
      "id": "romance-swipe-8",
      "type": "romanceSwipe",
      "title": "Romance Swipe 8",
      "category": "Romance Scam",
      "command": "LEFT = SCAM, RIGHT = OK",
      "directions": "Swipe/click left on scam profiles, right on safer interactions.",
      "profiles": [
        [
          "Morgan",
          "Chats slowly, no emergency, no links, and no payment request.",
          false,
          "No urgency, money, or secrecy is a safer pattern."
        ],
        [
          "Casey",
          "Says their bank is frozen and asks you to buy prepaid cards.",
          true,
          "Gift card requests are never a safe romance step."
        ],
        [
          "Jamie",
          "Suggests a video call before making plans and does not ask for private info.",
          false,
          "Verification and consent are safer signs."
        ]
      ],
      "lesson": "Romance scams use fast attachment, secrecy, isolation, links, and money pressure."
    },
    {
      "seconds": 20,
      "difficulty": "easy",
      "id": "marketplace-match-1",
      "type": "marketplaceMatch",
      "title": "Marketplace Match 1",
      "category": "Marketplace",
      "command": "LEFT = SCAM, RIGHT = OK",
      "directions": "Swipe/click left on scams, right on safer marketplace interactions.",
      "profiles": [
        [
          "Buyer 1",
          "I overpaid. Refund the extra before payment clears.",
          true,
          "Overpayment refunds are common marketplace scams."
        ],
        [
          "Buyer 2",
          "Can I pay in cash at the police-station exchange zone?",
          false,
          "Public pickup and clear payment are safer."
        ],
        [
          "Buyer 3",
          "I will send movers. Please pay their fee first.",
          true,
          "Mover or courier fees are a scam warning sign."
        ]
      ],
      "lesson": "Marketplace scams often use overpayment, fake links, movers, and off-platform payments."
    },
    {
      "seconds": 20,
      "difficulty": "easy",
      "id": "marketplace-match-2",
      "type": "marketplaceMatch",
      "title": "Marketplace Match 2",
      "category": "Marketplace",
      "command": "LEFT = SCAM, RIGHT = OK",
      "directions": "Swipe/click left on scams, right on safer marketplace interactions.",
      "profiles": [
        [
          "Buyer 2",
          "Can I pay in cash at the police-station exchange zone?",
          false,
          "Public pickup and clear payment are safer."
        ],
        [
          "Buyer 3",
          "I will send movers. Please pay their fee first.",
          true,
          "Mover or courier fees are a scam warning sign."
        ],
        [
          "Buyer 4",
          "Can you ship after my payment shows as cleared in the official app?",
          false,
          "Waiting for official cleared payment is safer."
        ]
      ],
      "lesson": "Marketplace scams often use overpayment, fake links, movers, and off-platform payments."
    },
    {
      "seconds": 20,
      "difficulty": "medium",
      "id": "marketplace-match-3",
      "type": "marketplaceMatch",
      "title": "Marketplace Match 3",
      "category": "Marketplace",
      "command": "LEFT = SCAM, RIGHT = OK",
      "directions": "Swipe/click left on scams, right on safer marketplace interactions.",
      "profiles": [
        [
          "Buyer 3",
          "I will send movers. Please pay their fee first.",
          true,
          "Mover or courier fees are a scam warning sign."
        ],
        [
          "Buyer 4",
          "Can you ship after my payment shows as cleared in the official app?",
          false,
          "Waiting for official cleared payment is safer."
        ],
        [
          "Buyer 5",
          "Click this email link to accept my marketplace payment.",
          true,
          "Payment links can be fake credential traps."
        ]
      ],
      "lesson": "Marketplace scams often use overpayment, fake links, movers, and off-platform payments."
    },
    {
      "seconds": 20,
      "difficulty": "medium",
      "id": "marketplace-match-4",
      "type": "marketplaceMatch",
      "title": "Marketplace Match 4",
      "category": "Marketplace",
      "command": "LEFT = SCAM, RIGHT = OK",
      "directions": "Swipe/click left on scams, right on safer marketplace interactions.",
      "profiles": [
        [
          "Buyer 4",
          "Can you ship after my payment shows as cleared in the official app?",
          false,
          "Waiting for official cleared payment is safer."
        ],
        [
          "Buyer 5",
          "Click this email link to accept my marketplace payment.",
          true,
          "Payment links can be fake credential traps."
        ],
        [
          "Seller 1",
          "Pay outside the platform for a big discount.",
          true,
          "Off-platform payments remove protections."
        ]
      ],
      "lesson": "Marketplace scams often use overpayment, fake links, movers, and off-platform payments."
    },
    {
      "seconds": 20,
      "difficulty": "medium",
      "id": "marketplace-match-5",
      "type": "marketplaceMatch",
      "title": "Marketplace Match 5",
      "category": "Marketplace",
      "command": "LEFT = SCAM, RIGHT = OK",
      "directions": "Swipe/click left on scams, right on safer marketplace interactions.",
      "profiles": [
        [
          "Buyer 5",
          "Click this email link to accept my marketplace payment.",
          true,
          "Payment links can be fake credential traps."
        ],
        [
          "Seller 1",
          "Pay outside the platform for a big discount.",
          true,
          "Off-platform payments remove protections."
        ],
        [
          "Seller 2",
          "The item is available for local pickup in a public place.",
          false,
          "Public pickup and no pressure are safer."
        ]
      ],
      "lesson": "Marketplace scams often use overpayment, fake links, movers, and off-platform payments."
    },
    {
      "seconds": 20,
      "difficulty": "hard",
      "id": "marketplace-match-6",
      "type": "marketplaceMatch",
      "title": "Marketplace Match 6",
      "category": "Marketplace",
      "command": "LEFT = SCAM, RIGHT = OK",
      "directions": "Swipe/click left on scams, right on safer marketplace interactions.",
      "profiles": [
        [
          "Seller 1",
          "Pay outside the platform for a big discount.",
          true,
          "Off-platform payments remove protections."
        ],
        [
          "Seller 2",
          "The item is available for local pickup in a public place.",
          false,
          "Public pickup and no pressure are safer."
        ],
        [
          "Buyer 6",
          "I need your phone number to send a verification code; read it back to me.",
          true,
          "Never share verification codes with buyers."
        ]
      ],
      "lesson": "Marketplace scams often use overpayment, fake links, movers, and off-platform payments."
    },
    {
      "seconds": 20,
      "difficulty": "hard",
      "id": "marketplace-match-7",
      "type": "marketplaceMatch",
      "title": "Marketplace Match 7",
      "category": "Marketplace",
      "command": "LEFT = SCAM, RIGHT = OK",
      "directions": "Swipe/click left on scams, right on safer marketplace interactions.",
      "profiles": [
        [
          "Seller 2",
          "The item is available for local pickup in a public place.",
          false,
          "Public pickup and no pressure are safer."
        ],
        [
          "Buyer 6",
          "I need your phone number to send a verification code; read it back to me.",
          true,
          "Never share verification codes with buyers."
        ],
        [
          "Buyer 1",
          "I overpaid. Refund the extra before payment clears.",
          true,
          "Overpayment refunds are common marketplace scams."
        ]
      ],
      "lesson": "Marketplace scams often use overpayment, fake links, movers, and off-platform payments."
    },
    {
      "seconds": 14,
      "difficulty": "easy",
      "id": "attach-attachment-flash-safe-file",
      "type": "attachmentFlash",
      "title": "Attachment Flash: Safe File",
      "category": "Download Safety",
      "command": "REMEMBER SAFE FILES",
      "directions": "Study the files. They flip over. Pick one safe file.",
      "files": [
        [
          "Trip_Itinerary.pdf",
          true
        ],
        [
          "Security_Tool.exe",
          false
        ],
        [
          "Medicare_Update.scr",
          false
        ],
        [
          "Refund_Form.xlsm",
          false
        ],
        [
          "grandkids.png",
          true
        ],
        [
          "recipe.txt",
          true
        ]
      ],
      "lesson": "File extensions matter. Avoid surprise executables, scripts, macro spreadsheets, and unknown zips."
    },
    {
      "seconds": 14,
      "difficulty": "medium",
      "id": "attach-attachment-flash-work-files",
      "type": "attachmentFlash",
      "title": "Attachment Flash: Work Files",
      "category": "Business Security",
      "command": "REMEMBER SAFE FILES",
      "directions": "Study the files. They flip over. Pick one safe file.",
      "files": [
        [
          "meeting_notes.pdf",
          true
        ],
        [
          "invoice.exe",
          false
        ],
        [
          "payroll_update.xlsm",
          false
        ],
        [
          "team_photo.jpg",
          true
        ],
        [
          "Q3_plan.docx",
          true
        ],
        [
          "VPN_fix.scr",
          false
        ]
      ],
      "lesson": "File extensions matter. Avoid surprise executables, scripts, macro spreadsheets, and unknown zips."
    },
    {
      "seconds": 14,
      "difficulty": "medium",
      "id": "attach-attachment-flash-school-files",
      "type": "attachmentFlash",
      "title": "Attachment Flash: School Files",
      "category": "University Phishing",
      "command": "REMEMBER SAFE FILES",
      "directions": "Study the files. They flip over. Pick one safe file.",
      "files": [
        [
          "syllabus.pdf",
          true
        ],
        [
          "campus_password_tool.exe",
          false
        ],
        [
          "lab_notes.docx",
          true
        ],
        [
          "scholarship_claim.zip",
          false
        ],
        [
          "project_rubric.pdf",
          true
        ],
        [
          "grade_viewer.scr",
          false
        ]
      ],
      "lesson": "File extensions matter. Avoid surprise executables, scripts, macro spreadsheets, and unknown zips."
    },
    {
      "seconds": 14,
      "difficulty": "easy",
      "id": "attach-attachment-flash-family-email",
      "type": "attachmentFlash",
      "title": "Attachment Flash: Family Email",
      "category": "Family Safety",
      "command": "REMEMBER SAFE FILES",
      "directions": "Study the files. They flip over. Pick one safe file.",
      "files": [
        [
          "holiday_photo.jpg",
          true
        ],
        [
          "bank_refund.exe",
          false
        ],
        [
          "recipe.txt",
          true
        ],
        [
          "family_tree.pdf",
          true
        ],
        [
          "urgent_update.scr",
          false
        ],
        [
          "gift_card_claim.xlsm",
          false
        ]
      ],
      "lesson": "File extensions matter. Avoid surprise executables, scripts, macro spreadsheets, and unknown zips."
    },
    {
      "seconds": 12,
      "difficulty": "hard",
      "id": "attach-attachment-flash-ai-download",
      "type": "attachmentFlash",
      "title": "Attachment Flash: AI Download",
      "category": "AI Malware",
      "command": "REMEMBER SAFE FILES",
      "directions": "Study the files. They flip over. Pick one safe file.",
      "files": [
        [
          "model_notes.pdf",
          true
        ],
        [
          "AI_Unlocker.exe",
          false
        ],
        [
          "prompt_ideas.txt",
          true
        ],
        [
          "free_tokens.scr",
          false
        ],
        [
          "demo_image.png",
          true
        ],
        [
          "AI_Cleaner.zip",
          false
        ]
      ],
      "lesson": "File extensions matter. Avoid surprise executables, scripts, macro spreadsheets, and unknown zips."
    },
    {
      "seconds": 15,
      "difficulty": "easy",
      "id": "delete-download-cleanup-invoice",
      "type": "fileDelete",
      "title": "Download Cleanup: Invoice",
      "category": "Malware",
      "command": "SELECT RISKY FILES \u2192 DELETE",
      "directions": "Select risky files and delete them. Safe files are decoys.",
      "files": [
        [
          "family_photo.jpg",
          false
        ],
        [
          "invoice.exe",
          true
        ],
        [
          "meeting_notes.pdf",
          false
        ],
        [
          "bank_login.zip",
          true
        ]
      ],
      "lesson": "Delete suspicious downloads without opening them."
    },
    {
      "seconds": 15,
      "difficulty": "medium",
      "id": "delete-download-cleanup-refund-tool",
      "type": "fileDelete",
      "title": "Download Cleanup: Refund Tool",
      "category": "Refund Scam",
      "command": "SELECT RISKY FILES \u2192 DELETE",
      "directions": "Select risky files and delete them. Safe files are decoys.",
      "files": [
        [
          "refund_tool.exe",
          true
        ],
        [
          "receipt.pdf",
          false
        ],
        [
          "vacation.jpg",
          false
        ],
        [
          "support_screen_share.dmg",
          true
        ]
      ],
      "lesson": "Delete suspicious downloads without opening them."
    },
    {
      "seconds": 15,
      "difficulty": "medium",
      "id": "delete-download-cleanup-game-mod",
      "type": "fileDelete",
      "title": "Download Cleanup: Game Mod",
      "category": "Gaming Scam",
      "command": "SELECT RISKY FILES \u2192 DELETE",
      "directions": "Select risky files and delete them. Safe files are decoys.",
      "files": [
        [
          "Free_Coins_Mod.apk",
          true
        ],
        [
          "game_screenshot.png",
          false
        ],
        [
          "friend_list.txt",
          false
        ],
        [
          "nitro_verify.exe",
          true
        ]
      ],
      "lesson": "Delete suspicious downloads without opening them."
    },
    {
      "seconds": 15,
      "difficulty": "medium",
      "id": "delete-download-cleanup-school",
      "type": "fileDelete",
      "title": "Download Cleanup: School",
      "category": "University Phishing",
      "command": "SELECT RISKY FILES \u2192 DELETE",
      "directions": "Select risky files and delete them. Safe files are decoys.",
      "files": [
        [
          "lab_report.docx",
          false
        ],
        [
          "Campus_Password_Tool.exe",
          true
        ],
        [
          "schedule.pdf",
          false
        ],
        [
          "grade_viewer.scr",
          true
        ]
      ],
      "lesson": "Delete suspicious downloads without opening them."
    },
    {
      "seconds": 13,
      "difficulty": "hard",
      "id": "delete-download-cleanup-ai",
      "type": "fileDelete",
      "title": "Download Cleanup: AI",
      "category": "AI Malware",
      "command": "SELECT RISKY FILES \u2192 DELETE",
      "directions": "Select risky files and delete them. Safe files are decoys.",
      "files": [
        [
          "prompt_notes.txt",
          false
        ],
        [
          "AI_Unlocker.exe",
          true
        ],
        [
          "demo_result.png",
          false
        ],
        [
          "Token_Generator.zip",
          true
        ],
        [
          "readme.pdf",
          false
        ]
      ],
      "lesson": "Delete suspicious downloads without opening them."
    },
    {
      "seconds": 14,
      "difficulty": "easy",
      "id": "game-chat-free-coins",
      "type": "gameChatReport",
      "title": "Report Game Chat: Free Coins",
      "category": "Game Chat",
      "command": "OPEN PLAYER OPTIONS \u2192 MUTE + REPORT",
      "directions": "Open the suspicious player options and report/block them.",
      "player": "ScamBot99",
      "message": "FREE COINS! Visit game-prize-fast.net and log in!",
      "decoys": [
        "PixelPat",
        "GardenMom",
        "Runner42",
        "StudyBuddy"
      ],
      "lesson": "Report suspicious game chat instead of engaging, clicking, or sharing codes."
    },
    {
      "seconds": 14,
      "difficulty": "easy",
      "id": "game-chat-fake-nitro",
      "type": "gameChatReport",
      "title": "Report Game Chat: Fake Nitro",
      "category": "Game Chat",
      "command": "OPEN PLAYER OPTIONS \u2192 MUTE + REPORT",
      "directions": "Open the suspicious player options and report/block them.",
      "player": "NitroDropper",
      "message": "Free Nitro. Verify your Discord login at nitro-gift-fast.co",
      "decoys": [
        "GardenMom",
        "Runner42",
        "StudyBuddy",
        "RocketCat"
      ],
      "lesson": "Report suspicious game chat instead of engaging, clicking, or sharing codes."
    },
    {
      "seconds": 14,
      "difficulty": "easy",
      "id": "game-chat-item-trade",
      "type": "gameChatReport",
      "title": "Report Game Chat: Item Trade",
      "category": "Game Chat",
      "command": "OPEN PLAYER OPTIONS \u2192 MUTE + REPORT",
      "directions": "Open the suspicious player options and report/block them.",
      "player": "TradeKing",
      "message": "Send me your password and I will duplicate your rare item.",
      "decoys": [
        "Runner42",
        "StudyBuddy",
        "RocketCat",
        "MapleFox"
      ],
      "lesson": "Report suspicious game chat instead of engaging, clicking, or sharing codes."
    },
    {
      "seconds": 14,
      "difficulty": "medium",
      "id": "game-chat-code-theft",
      "type": "gameChatReport",
      "title": "Report Game Chat: Code Theft",
      "category": "Game Chat",
      "command": "OPEN PLAYER OPTIONS \u2192 MUTE + REPORT",
      "directions": "Open the suspicious player options and report/block them.",
      "player": "ModHelper",
      "message": "I am a mod. Read me the 6-digit code or your account closes.",
      "decoys": [
        "StudyBuddy",
        "RocketCat",
        "MapleFox",
        "PurduePete"
      ],
      "lesson": "Report suspicious game chat instead of engaging, clicking, or sharing codes."
    },
    {
      "seconds": 14,
      "difficulty": "medium",
      "id": "game-chat-prize-fee",
      "type": "gameChatReport",
      "title": "Report Game Chat: Prize Fee",
      "category": "Game Chat",
      "command": "OPEN PLAYER OPTIONS \u2192 MUTE + REPORT",
      "directions": "Open the suspicious player options and report/block them.",
      "player": "PrizeRunner",
      "message": "You won tournament cash. Pay $5 processing fee.",
      "decoys": [
        "PixelPat",
        "GardenMom",
        "Runner42",
        "StudyBuddy"
      ],
      "lesson": "Report suspicious game chat instead of engaging, clicking, or sharing codes."
    },
    {
      "seconds": 14,
      "difficulty": "medium",
      "id": "game-chat-off-platform",
      "type": "gameChatReport",
      "title": "Report Game Chat: Off Platform",
      "category": "Game Chat",
      "command": "OPEN PLAYER OPTIONS \u2192 MUTE + REPORT",
      "directions": "Open the suspicious player options and report/block them.",
      "player": "SkinDealer",
      "message": "Buy cheap skins outside the platform. No refunds.",
      "decoys": [
        "GardenMom",
        "Runner42",
        "StudyBuddy",
        "RocketCat"
      ],
      "lesson": "Report suspicious game chat instead of engaging, clicking, or sharing codes."
    },
    {
      "seconds": 14,
      "difficulty": "medium",
      "id": "game-chat-grooming-signal",
      "type": "gameChatReport",
      "title": "Report Game Chat: Grooming Signal",
      "category": "Game Chat",
      "command": "OPEN PLAYER OPTIONS \u2192 MUTE + REPORT",
      "directions": "Open the suspicious player options and report/block them.",
      "player": "SecretFriend",
      "message": "Do not tell your parents. Move to private chat.",
      "decoys": [
        "Runner42",
        "StudyBuddy",
        "RocketCat",
        "MapleFox"
      ],
      "lesson": "Report suspicious game chat instead of engaging, clicking, or sharing codes."
    },
    {
      "seconds": 12,
      "difficulty": "hard",
      "id": "game-chat-malware-link",
      "type": "gameChatReport",
      "title": "Report Game Chat: Malware Link",
      "category": "Game Chat",
      "command": "OPEN PLAYER OPTIONS \u2192 MUTE + REPORT",
      "directions": "Open the suspicious player options and report/block them.",
      "player": "LinkWizard",
      "message": "Click my private server link and install voice patch.",
      "decoys": [
        "StudyBuddy",
        "RocketCat",
        "MapleFox",
        "PurduePete"
      ],
      "lesson": "Report suspicious game chat instead of engaging, clicking, or sharing codes."
    },
    {
      "seconds": 12,
      "difficulty": "hard",
      "id": "game-chat-login-theft",
      "type": "gameChatReport",
      "title": "Report Game Chat: Login Theft",
      "category": "Game Chat",
      "command": "OPEN PLAYER OPTIONS \u2192 MUTE + REPORT",
      "directions": "Open the suspicious player options and report/block them.",
      "player": "CoinRain",
      "message": "Log in here to multiply coins instantly.",
      "decoys": [
        "PixelPat",
        "GardenMom",
        "Runner42",
        "StudyBuddy"
      ],
      "lesson": "Report suspicious game chat instead of engaging, clicking, or sharing codes."
    },
    {
      "seconds": 12,
      "difficulty": "hard",
      "id": "game-chat-personal-info",
      "type": "gameChatReport",
      "title": "Report Game Chat: Personal Info",
      "category": "Game Chat",
      "command": "OPEN PLAYER OPTIONS \u2192 MUTE + REPORT",
      "directions": "Open the suspicious player options and report/block them.",
      "player": "SponsorBot",
      "message": "I can make you famous. Send phone number and school.",
      "decoys": [
        "GardenMom",
        "Runner42",
        "StudyBuddy",
        "RocketCat"
      ],
      "lesson": "Report suspicious game chat instead of engaging, clicking, or sharing codes."
    },
    {
      "seconds": 26,
      "difficulty": "easy",
      "id": "platform-shortcut-castle",
      "type": "platformHints",
      "title": "Hint Platformer: Shortcut Castle",
      "category": "Arcade Movement",
      "command": "COLLECT 3 SAFE HINTS",
      "directions": "Move and jump to collect all three safe hints. Avoid scam traps.",
      "lesson": "Move toward verification and away from fake shortcuts."
    },
    {
      "seconds": 26,
      "difficulty": "medium",
      "id": "platform-verification-steps",
      "type": "platformHints",
      "title": "Hint Platformer: Verification Steps",
      "category": "Arcade Movement",
      "command": "COLLECT 3 SAFE HINTS",
      "directions": "Move and jump to collect all three safe hints. Avoid scam traps.",
      "lesson": "Move toward verification and away from fake shortcuts."
    },
    {
      "seconds": 22,
      "difficulty": "hard",
      "id": "platform-safe-path-sprint",
      "type": "platformHints",
      "title": "Hint Platformer: Safe Path Sprint",
      "category": "Arcade Movement",
      "command": "COLLECT 3 SAFE HINTS",
      "directions": "Move and jump to collect all three safe hints. Avoid scam traps.",
      "lesson": "Move toward verification and away from fake shortcuts."
    },
    {
      "seconds": 15,
      "difficulty": "easy",
      "id": "popup-pop-up-storm",
      "type": "popupPurge",
      "title": "Pop-Up Storm",
      "category": "Tech Support",
      "command": "X BUTTONS ONLY",
      "directions": "Close every pop-up using only real X buttons. Do not click inside the ads.",
      "popups": 5,
      "lesson": "Scam pop-ups use fake buttons and pressure. Use the real close controls."
    },
    {
      "seconds": 15,
      "difficulty": "medium",
      "id": "popup-coupon-chaos",
      "type": "popupPurge",
      "title": "Coupon Chaos",
      "category": "Coupon Scam",
      "command": "X BUTTONS ONLY",
      "directions": "Close every pop-up using only real X buttons. Do not click inside the ads.",
      "popups": 7,
      "lesson": "Scam pop-ups use fake buttons and pressure. Use the real close controls."
    },
    {
      "seconds": 13,
      "difficulty": "hard",
      "id": "popup-notification-trap",
      "type": "popupPurge",
      "title": "Notification Trap",
      "category": "Browser Spam",
      "command": "X BUTTONS ONLY",
      "directions": "Close every pop-up using only real X buttons. Do not click inside the ads.",
      "popups": 8,
      "lesson": "Scam pop-ups use fake buttons and pressure. Use the real close controls."
    },
    {
      "seconds": 13,
      "difficulty": "hard",
      "id": "popup-ai-warning-swarm",
      "type": "popupPurge",
      "title": "AI Warning Swarm",
      "category": "AI Scam",
      "command": "X BUTTONS ONLY",
      "directions": "Close every pop-up using only real X buttons. Do not click inside the ads.",
      "popups": 8,
      "lesson": "Scam pop-ups use fake buttons and pressure. Use the real close controls."
    },
    {
      "seconds": 12,
      "difficulty": "easy",
      "id": "pm-password-manager-bank",
      "type": "passwordFill",
      "title": "Password Manager: Bank",
      "category": "Bank Phishing",
      "command": "AUTOFILL ONLY OFFICIAL DOMAIN",
      "directions": "Choose where the password manager should autofill. Do not fill lookalike domains.",
      "official": "bank.com",
      "domains": [
        "bank-login-alert.co",
        "bank.com",
        "secure-bank-reset.net"
      ],
      "lesson": "Password managers help because they avoid autofilling on lookalike domains."
    },
    {
      "seconds": 12,
      "difficulty": "medium",
      "id": "pm-password-manager-school",
      "type": "passwordFill",
      "title": "Password Manager: School",
      "category": "University Phishing",
      "command": "AUTOFILL ONLY OFFICIAL DOMAIN",
      "directions": "Choose where the password manager should autofill. Do not fill lookalike domains.",
      "official": "official-school.edu",
      "domains": [
        "campus-password-reset.net",
        "official-school.edu",
        "school-login-help.co"
      ],
      "lesson": "Password managers help because they avoid autofilling on lookalike domains."
    },
    {
      "seconds": 10,
      "difficulty": "hard",
      "id": "pm-password-manager-work",
      "type": "passwordFill",
      "title": "Password Manager: Work",
      "category": "Business Security",
      "command": "AUTOFILL ONLY OFFICIAL DOMAIN",
      "directions": "Choose where the password manager should autofill. Do not fill lookalike domains.",
      "official": "company.com",
      "domains": [
        "cornpany.com",
        "company.com",
        "company-payroll-reset.net"
      ],
      "lesson": "Password managers help because they avoid autofilling on lookalike domains."
    },
    {
      "seconds": 12,
      "difficulty": "medium",
      "id": "pm-password-manager-ai-tool",
      "type": "passwordFill",
      "title": "Password Manager: AI Tool",
      "category": "AI Scam",
      "command": "AUTOFILL ONLY OFFICIAL DOMAIN",
      "directions": "Choose where the password manager should autofill. Do not fill lookalike domains.",
      "official": "trusted-ai.example",
      "domains": [
        "trusted-ai.example",
        "free-ai-unlocker.net",
        "ai-cleaner-login.co"
      ],
      "lesson": "Password managers help because they avoid autofilling on lookalike domains."
    },
    {
      "seconds": 12,
      "difficulty": "medium",
      "id": "pm-password-manager-game",
      "type": "passwordFill",
      "title": "Password Manager: Game",
      "category": "Gaming Scam",
      "command": "AUTOFILL ONLY OFFICIAL DOMAIN",
      "directions": "Choose where the password manager should autofill. Do not fill lookalike domains.",
      "official": "officialgame.com",
      "domains": [
        "free-skins-login.net",
        "officialgame.com",
        "game-prize-verify.co"
      ],
      "lesson": "Password managers help because they avoid autofilling on lookalike domains."
    },
    {
      "seconds": 12,
      "difficulty": "easy",
      "id": "qr-qr-lens-parking-meter",
      "type": "qrScan",
      "title": "QR Lens: Parking Meter",
      "category": "QR Scam",
      "command": "SCAN OFFICIAL QR ONLY",
      "directions": "Choose the QR destination that matches the official context.",
      "official": "city-parking.gov",
      "domains": [
        "parking-pay-fast.co",
        "city-parking.gov",
        "meter-refund.net"
      ],
      "lesson": "QR codes hide their destination, so official context matters."
    },
    {
      "seconds": 12,
      "difficulty": "medium",
      "id": "qr-qr-lens-restaurant-menu",
      "type": "qrScan",
      "title": "QR Lens: Restaurant Menu",
      "category": "QR Safety",
      "command": "SCAN OFFICIAL QR ONLY",
      "directions": "Choose the QR destination that matches the official context.",
      "official": "restaurant-menu.example",
      "domains": [
        "free-wifi-login.co",
        "restaurant-menu.example",
        "card-update-now.net"
      ],
      "lesson": "QR codes hide their destination, so official context matters."
    },
    {
      "seconds": 12,
      "difficulty": "medium",
      "id": "qr-qr-lens-charity-poster",
      "type": "qrScan",
      "title": "QR Lens: Charity Poster",
      "category": "Charity Scam",
      "command": "SCAN OFFICIAL QR ONLY",
      "directions": "Choose the QR destination that matches the official context.",
      "official": "known-charity.org",
      "domains": [
        "urgent-donate-crypto.net",
        "known-charity.org",
        "relief-fee-pay.biz"
      ],
      "lesson": "QR codes hide their destination, so official context matters."
    },
    {
      "seconds": 12,
      "difficulty": "medium",
      "id": "qr-qr-lens-campus-event",
      "type": "qrScan",
      "title": "QR Lens: Campus Event",
      "category": "University Phishing",
      "command": "SCAN OFFICIAL QR ONLY",
      "directions": "Choose the QR destination that matches the official context.",
      "official": "events.official-school.edu",
      "domains": [
        "events.official-school.edu",
        "school-login-prize.co",
        "campus-giveaway.net"
      ],
      "lesson": "QR codes hide their destination, so official context matters."
    },
    {
      "seconds": 11,
      "difficulty": "easy",
      "id": "mfa-mfa-prompt-bank-login",
      "type": "mfaShield",
      "title": "MFA Prompt: Bank Login",
      "category": "Account Security",
      "command": "APPROVE YOUR OWN LOGIN",
      "directions": "Approve only when you started the login. Deny surprise prompts.",
      "scenario": "You are currently logging into your bank app.",
      "approve": true,
      "lesson": "MFA protects you only when you deny prompts you did not start."
    },
    {
      "seconds": 11,
      "difficulty": "medium",
      "id": "mfa-mfa-prompt-surprise-login",
      "type": "mfaShield",
      "title": "MFA Prompt: Surprise Login",
      "category": "Account Takeover",
      "command": "DENY SURPRISE LOGIN",
      "directions": "Approve only when you started the login. Deny surprise prompts.",
      "scenario": "You receive a login approval prompt while not signing in.",
      "approve": false,
      "lesson": "MFA protects you only when you deny prompts you did not start."
    },
    {
      "seconds": 11,
      "difficulty": "medium",
      "id": "mfa-mfa-prompt-game-trade",
      "type": "mfaShield",
      "title": "MFA Prompt: Game Trade",
      "category": "Gaming Scam",
      "command": "DENY SURPRISE LOGIN",
      "directions": "Approve only when you started the login. Deny surprise prompts.",
      "scenario": "A player asks you to approve a login so they can send coins.",
      "approve": false,
      "lesson": "MFA protects you only when you deny prompts you did not start."
    },
    {
      "seconds": 11,
      "difficulty": "medium",
      "id": "mfa-mfa-prompt-work-vpn",
      "type": "mfaShield",
      "title": "MFA Prompt: Work VPN",
      "category": "Business Security",
      "command": "APPROVE YOUR OWN LOGIN",
      "directions": "Approve only when you started the login. Deny surprise prompts.",
      "scenario": "You just started signing into your work VPN.",
      "approve": true,
      "lesson": "MFA protects you only when you deny prompts you did not start."
    },
    {
      "seconds": 9,
      "difficulty": "hard",
      "id": "mfa-mfa-prompt-2-am-alert",
      "type": "mfaShield",
      "title": "MFA Prompt: 2 AM Alert",
      "category": "Account Takeover",
      "command": "DENY SURPRISE LOGIN",
      "directions": "Approve only when you started the login. Deny surprise prompts.",
      "scenario": "You get a login prompt from another country at 2 AM.",
      "approve": false,
      "lesson": "MFA protects you only when you deny prompts you did not start."
    },
    {
      "seconds": 16,
      "difficulty": "easy",
      "id": "perm-app-permissions-flashlight",
      "type": "permissionToggle",
      "title": "App Permissions: Flashlight",
      "category": "App Privacy",
      "command": "ALLOW ONLY NEEDED PERMISSIONS",
      "directions": "Toggle permissions that make sense. Leave risky extras off.",
      "permissions": [
        [
          "Camera",
          true
        ],
        [
          "Contacts",
          false
        ],
        [
          "Microphone",
          false
        ],
        [
          "Location",
          false
        ]
      ],
      "lesson": "Limit app permissions to what the app actually needs."
    },
    {
      "seconds": 16,
      "difficulty": "medium",
      "id": "perm-app-permissions-maps",
      "type": "permissionToggle",
      "title": "App Permissions: Maps",
      "category": "App Privacy",
      "command": "ALLOW ONLY NEEDED PERMISSIONS",
      "directions": "Toggle permissions that make sense. Leave risky extras off.",
      "permissions": [
        [
          "Location",
          true
        ],
        [
          "Contacts",
          false
        ],
        [
          "SMS",
          false
        ],
        [
          "Camera",
          false
        ]
      ],
      "lesson": "Limit app permissions to what the app actually needs."
    },
    {
      "seconds": 16,
      "difficulty": "medium",
      "id": "perm-app-permissions-photo-editor",
      "type": "permissionToggle",
      "title": "App Permissions: Photo Editor",
      "category": "App Privacy",
      "command": "ALLOW ONLY NEEDED PERMISSIONS",
      "directions": "Toggle permissions that make sense. Leave risky extras off.",
      "permissions": [
        [
          "Photos",
          true
        ],
        [
          "Bank login",
          false
        ],
        [
          "Contacts",
          false
        ],
        [
          "Microphone",
          false
        ]
      ],
      "lesson": "Limit app permissions to what the app actually needs."
    },
    {
      "seconds": 14,
      "difficulty": "hard",
      "id": "perm-app-permissions-free-game",
      "type": "permissionToggle",
      "title": "App Permissions: Free Game",
      "category": "Gaming Scam",
      "command": "ALLOW ONLY NEEDED PERMISSIONS",
      "directions": "Toggle permissions that make sense. Leave risky extras off.",
      "permissions": [
        [
          "Notifications",
          false
        ],
        [
          "Contacts",
          false
        ],
        [
          "SMS",
          false
        ],
        [
          "Storage",
          false
        ]
      ],
      "lesson": "Limit app permissions to what the app actually needs."
    },
    {
      "seconds": 16,
      "difficulty": "easy",
      "id": "money-money-guard-refund-scam",
      "type": "moneyGuard",
      "title": "Money Guard: Refund Scam",
      "category": "Refund Scam",
      "command": "SET THE SAFE AMOUNT",
      "directions": "Use the buttons to choose the safe dollar amount, then press Send.",
      "scenario": "A caller says to send $499 to receive your refund. What should you send?",
      "targetAmount": 0,
      "lesson": "The safest amount for scam pressure is usually $0."
    },
    {
      "seconds": 16,
      "difficulty": "medium",
      "id": "money-money-guard-marketplace-overpay",
      "type": "moneyGuard",
      "title": "Money Guard: Marketplace Overpay",
      "category": "Marketplace",
      "command": "SET THE SAFE AMOUNT",
      "directions": "Use the buttons to choose the safe dollar amount, then press Send.",
      "scenario": "A buyer overpaid by $300 and wants you to refund before payment clears. Safe amount?",
      "targetAmount": 0,
      "lesson": "The safest amount for scam pressure is usually $0."
    },
    {
      "seconds": 16,
      "difficulty": "medium",
      "id": "money-money-guard-verified-donation",
      "type": "moneyGuard",
      "title": "Money Guard: Verified Donation",
      "category": "Charity Safety",
      "command": "SET THE SAFE AMOUNT",
      "directions": "Use the buttons to choose the safe dollar amount, then press Send.",
      "scenario": "You independently verified the charity and chose to donate $20. Safe amount?",
      "targetAmount": 20,
      "lesson": "The safest amount for scam pressure is usually $0."
    },
    {
      "seconds": 14,
      "difficulty": "hard",
      "id": "money-money-guard-romance-emergency",
      "type": "moneyGuard",
      "title": "Money Guard: Romance Emergency",
      "category": "Romance Scam",
      "command": "SET THE SAFE AMOUNT",
      "directions": "Use the buttons to choose the safe dollar amount, then press Send.",
      "scenario": "Online partner asks for $200 in gift cards for a sudden emergency. Safe amount?",
      "targetAmount": 0,
      "lesson": "The safest amount for scam pressure is usually $0."
    },
    {
      "seconds": 16,
      "difficulty": "easy",
      "id": "money-money-guard-real-purchase",
      "type": "moneyGuard",
      "title": "Money Guard: Real Purchase",
      "category": "Shopping Safety",
      "command": "SET THE SAFE AMOUNT",
      "directions": "Use the buttons to choose the safe dollar amount, then press Send.",
      "scenario": "You are on the official store and the listed price is $30. Safe amount?",
      "targetAmount": 30,
      "lesson": "The safest amount for scam pressure is usually $0."
    },
    {
      "seconds": 12,
      "difficulty": "medium",
      "id": "deepfake-deepfake-call-grandchild",
      "type": "deepfakeCall",
      "title": "Deepfake Call: Grandchild",
      "category": "AI Voice Scam",
      "command": "VERIFY THE VOICE",
      "directions": "Pick the safest verification step.",
      "scenario": "A familiar voice says they are in trouble and asks for money secretly.",
      "options": [
        [
          "Send money",
          false
        ],
        [
          "Call the saved number for that person",
          true
        ],
        [
          "Keep it secret",
          false
        ],
        [
          "Buy gift cards",
          false
        ]
      ],
      "lesson": "Voice can be cloned. Verify through known numbers and trusted channels."
    },
    {
      "seconds": 10,
      "difficulty": "hard",
      "id": "deepfake-deepfake-call-ceo",
      "type": "deepfakeCall",
      "title": "Deepfake Call: CEO",
      "category": "Business Email/Voice",
      "command": "VERIFY THE VOICE",
      "directions": "Pick the safest verification step.",
      "scenario": "A voice sounding like your CEO asks for an urgent confidential wire.",
      "options": [
        [
          "Wire money",
          false
        ],
        [
          "Verify through finance workflow",
          true
        ],
        [
          "Reply with codes",
          false
        ],
        [
          "Use a personal account",
          false
        ]
      ],
      "lesson": "Voice can be cloned. Verify through known numbers and trusted channels."
    },
    {
      "seconds": 12,
      "difficulty": "medium",
      "id": "deepfake-deepfake-call-bank",
      "type": "deepfakeCall",
      "title": "Deepfake Call: Bank",
      "category": "Bank Scam",
      "command": "VERIFY THE VOICE",
      "directions": "Pick the safest verification step.",
      "scenario": "A caller says AI detected fraud and asks for your login code.",
      "options": [
        [
          "Read the code",
          false
        ],
        [
          "Hang up and call the official bank number",
          true
        ],
        [
          "Install remote support",
          false
        ],
        [
          "Move money",
          false
        ]
      ],
      "lesson": "Voice can be cloned. Verify through known numbers and trusted channels."
    },
    {
      "seconds": 12,
      "difficulty": "medium",
      "id": "deepfake-deepfake-call-friend",
      "type": "deepfakeCall",
      "title": "Deepfake Call: Friend",
      "category": "AI Voice Scam",
      "command": "VERIFY THE VOICE",
      "directions": "Pick the safest verification step.",
      "scenario": "A friend-like voice says they lost their phone and need payment app cash.",
      "options": [
        [
          "Send cash",
          false
        ],
        [
          "Call another known contact to verify",
          true
        ],
        [
          "Keep chatting only by text",
          false
        ],
        [
          "Click their payment link",
          false
        ]
      ],
      "lesson": "Voice can be cloned. Verify through known numbers and trusted channels."
    },
    {
      "seconds": 80,
      "difficulty": "hard",
      "id": "boss-rush-final",
      "type": "bossRush",
      "title": "Boss Fight: The Fraudster",
      "category": "Final Boss",
      "command": "DEFEAT RANDOM SCAM PHASES",
      "directions": "The boss changes tactics every phase. Answer quickly and safely.",
      "lesson": "Strong scam defense means adapting: verify, report, deny, delete, and avoid pressure."
    },
    {
      "id": "old-safe-bank",
      "type": "safeChoice",
      "title": "Bank Text Trap",
      "category": "Bank Phishing",
      "difficulty": "easy",
      "command": "CHOOSE THE SAFEST ACTION",
      "directions": "Read the situation and choose the safest realistic next step.",
      "seconds": 10,
      "scenario": "A text says your bank account will lock unless you click a link.",
      "options": [
        [
          "Click the link",
          false
        ],
        [
          "Reply with password",
          false
        ],
        [
          "Open official bank app separately",
          true
        ],
        [
          "Forward it to family",
          false
        ]
      ],
      "lesson": "Use official apps or known numbers, not surprise links.",
      "legacySource": "old"
    },
    {
      "id": "old-safe-tech",
      "type": "safeChoice",
      "title": "Tech Support Pop-Up",
      "category": "Tech Support",
      "difficulty": "easy",
      "command": "CHOOSE THE SAFEST ACTION",
      "directions": "Read the situation and choose the safest realistic next step.",
      "seconds": 10,
      "scenario": "A pop-up says your computer is infected and shows a support number.",
      "options": [
        [
          "Call the pop-up number",
          false
        ],
        [
          "Give remote access",
          false
        ],
        [
          "Close it and use trusted support",
          true
        ],
        [
          "Pay immediately",
          false
        ]
      ],
      "lesson": "Do not call numbers from pop-ups or grant remote access.",
      "legacySource": "old"
    },
    {
      "id": "old-safe-univ",
      "type": "safeChoice",
      "title": "University Password Expiring",
      "category": "University Phishing",
      "difficulty": "medium",
      "command": "CHOOSE THE SAFEST ACTION",
      "directions": "Read the situation and choose the safest realistic next step.",
      "seconds": 10,
      "scenario": "An email says your university password expires tonight and links to a login page.",
      "options": [
        [
          "Click login link",
          false
        ],
        [
          "Reply with password",
          false
        ],
        [
          "Go to the official university portal separately",
          true
        ],
        [
          "Send link to friends",
          false
        ]
      ],
      "lesson": "Password-expiration emails should be verified through the official portal.",
      "legacySource": "old"
    },
    {
      "id": "old-safe-jobpay",
      "type": "safeChoice",
      "title": "Pay-First Job Offer",
      "category": "Job Scam",
      "difficulty": "medium",
      "command": "CHOOSE THE SAFEST ACTION",
      "directions": "Read the situation and choose the safest realistic next step.",
      "seconds": 10,
      "scenario": "A remote job offer says you must pay an equipment fee before the interview.",
      "options": [
        [
          "Pay the fee",
          false
        ],
        [
          "Call the phone number in the email",
          false
        ],
        [
          "Verify through official careers page",
          true
        ],
        [
          "Send bank info",
          false
        ]
      ],
      "lesson": "Real employers do not require upfront fees before interviews.",
      "legacySource": "old"
    },
    {
      "id": "old-safe-video",
      "type": "safeChoice",
      "title": "Video Buffer Trap",
      "category": "Streaming Malware",
      "difficulty": "medium",
      "command": "CHOOSE THE SAFEST ACTION",
      "directions": "Read the situation and choose the safest realistic next step.",
      "seconds": 10,
      "scenario": "A video page says buffering will stop only if you download a special player.",
      "options": [
        [
          "Download the player",
          false
        ],
        [
          "Allow notifications",
          false
        ],
        [
          "Close the page",
          true
        ],
        [
          "Enter card for HD mode",
          false
        ]
      ],
      "lesson": "Fake players and codecs are common malware traps.",
      "legacySource": "old"
    },
    {
      "id": "old-safe-deepfake",
      "type": "safeChoice",
      "title": "Voice Clone Check",
      "category": "AI Voice Scam",
      "difficulty": "hard",
      "command": "CHOOSE THE SAFEST ACTION",
      "directions": "Read the situation and choose the safest realistic next step.",
      "seconds": 8,
      "scenario": "A familiar voice asks for emergency money from an unknown number.",
      "options": [
        [
          "Send money now",
          false
        ],
        [
          "Call a saved number or trusted relative",
          true
        ],
        [
          "Keep it secret",
          false
        ],
        [
          "Ask for payment link",
          false
        ]
      ],
      "lesson": "A familiar voice is not enough; verify through known contacts.",
      "legacySource": "old"
    },
    {
      "id": "old-safe-invest",
      "type": "safeChoice",
      "title": "Crypto Countdown",
      "category": "Investment Scam",
      "difficulty": "hard",
      "command": "CHOOSE THE SAFEST ACTION",
      "directions": "Read the situation and choose the safest realistic next step.",
      "seconds": 8,
      "scenario": "An online advisor promises guaranteed returns if you invest tonight.",
      "options": [
        [
          "Invest tonight",
          false
        ],
        [
          "Borrow money to invest",
          false
        ],
        [
          "Research and talk to a licensed advisor",
          true
        ],
        [
          "Invite family quickly",
          false
        ]
      ],
      "lesson": "Guaranteed returns and urgency are major scam signals.",
      "legacySource": "old"
    },
    {
      "id": "old-safe-qr",
      "type": "safeChoice",
      "title": "QR Parking Trap",
      "category": "QR Scam",
      "difficulty": "medium",
      "command": "CHOOSE THE SAFEST ACTION",
      "directions": "Read the situation and choose the safest realistic next step.",
      "seconds": 10,
      "scenario": "A parking QR sticker opens a payment page that does not look official.",
      "options": [
        [
          "Pay through sticker QR",
          false
        ],
        [
          "Use official parking app or city website",
          true
        ],
        [
          "Enter bank login",
          false
        ],
        [
          "Save card on unknown page",
          false
        ]
      ],
      "lesson": "Random QR stickers can hide fake payment pages.",
      "legacySource": "old"
    },
    {
      "id": "old-web-bank",
      "type": "dangerWebsite",
      "title": "Fake Bank Lockdown",
      "category": "Bank Phishing",
      "difficulty": "easy",
      "command": "ESCAPE THE TRAP PAGE",
      "directions": "Choose the safe exit or official-source action before the danger bar fills.",
      "seconds": 12,
      "url": "secure-bank-verify.co/login",
      "headline": "Account locked in 30 minutes",
      "body": "Enter username, password, and text code to prevent closure",
      "dangerLabel": "Threat level",
      "options": [
        [
          "Continue to login",
          false
        ],
        [
          "Enter text code",
          false
        ],
        [
          "Close page and open official app",
          true
        ],
        [
          "Download security tool",
          false
        ]
      ],
      "lesson": "Use official apps or typed URLs.",
      "legacySource": "old"
    },
    {
      "id": "old-web-med",
      "type": "dangerWebsite",
      "title": "Medicare Card Trap",
      "category": "Health Fraud",
      "difficulty": "medium",
      "command": "ESCAPE THE TRAP PAGE",
      "directions": "Choose the safe exit or official-source action before the danger bar fills.",
      "seconds": 12,
      "url": "medicare-card-update-now.info",
      "headline": "Coverage may stop today",
      "body": "Confirm Medicare number and SSN to receive a new card",
      "dangerLabel": "Data grab",
      "options": [
        [
          "Enter Medicare number",
          false
        ],
        [
          "Enter SSN",
          false
        ],
        [
          "Leave and use official source",
          true
        ],
        [
          "Call number on page",
          false
        ]
      ],
      "lesson": "Verify health-benefit requests officially.",
      "legacySource": "old"
    },
    {
      "id": "old-web-univ",
      "type": "dangerWebsite",
      "title": "Campus Password Portal",
      "category": "University Phishing",
      "difficulty": "medium",
      "command": "ESCAPE THE TRAP PAGE",
      "directions": "Choose the safe exit or official-source action before the danger bar fills.",
      "seconds": 12,
      "url": "campus-password-renewal.com",
      "headline": "Password expires tonight",
      "body": "Sign in immediately or your account will be disabled",
      "dangerLabel": "Credential theft",
      "options": [
        [
          "Sign in here",
          false
        ],
        [
          "Enter old password",
          false
        ],
        [
          "Open official portal separately",
          true
        ],
        [
          "Forward link",
          false
        ]
      ],
      "lesson": "Lookalike school portals steal credentials.",
      "legacySource": "old"
    },
    {
      "id": "old-web-ai",
      "type": "dangerWebsite",
      "title": "AI Tool Unlocker",
      "category": "AI Malware",
      "difficulty": "hard",
      "command": "ESCAPE THE TRAP PAGE",
      "directions": "Choose the safe exit or official-source action before the danger bar fills.",
      "seconds": 9,
      "url": "free-ai-pro-unlocker.net",
      "headline": "Unlock premium AI tools",
      "body": "Install this unlocker for free paid AI features",
      "dangerLabel": "Malware risk",
      "options": [
        [
          "Install unlocker",
          false
        ],
        [
          "Disable antivirus",
          false
        ],
        [
          "Close page",
          true
        ],
        [
          "Connect account",
          false
        ]
      ],
      "lesson": "Cracked AI tools are malware risks.",
      "legacySource": "old"
    },
    {
      "id": "old-web-refund",
      "type": "dangerWebsite",
      "title": "Refund Desk Trap",
      "category": "Refund Scam",
      "difficulty": "medium",
      "command": "ESCAPE THE TRAP PAGE",
      "directions": "Choose the safe exit or official-source action before the danger bar fills.",
      "seconds": 12,
      "url": "refund-security-helpdesk.net",
      "headline": "You were charged $499",
      "body": "Call the refund desk now; do not contact your bank",
      "dangerLabel": "Refund trap",
      "options": [
        [
          "Call refund desk",
          false
        ],
        [
          "Install screen-share app",
          false
        ],
        [
          "Check real bank account separately",
          true
        ],
        [
          "Enter card",
          false
        ]
      ],
      "lesson": "Refund scams push fake support calls.",
      "legacySource": "old"
    },
    {
      "id": "old-web-prize",
      "type": "dangerWebsite",
      "title": "Prize Claim Portal",
      "category": "Prize Scam",
      "difficulty": "easy",
      "command": "ESCAPE THE TRAP PAGE",
      "directions": "Choose the safe exit or official-source action before the danger bar fills.",
      "seconds": 12,
      "url": "winner-claim-fast.biz",
      "headline": "You won a gift card",
      "body": "Pay a small processing fee and upload ID",
      "dangerLabel": "Prize trap",
      "options": [
        [
          "Pay fee",
          false
        ],
        [
          "Upload ID",
          false
        ],
        [
          "Close page",
          true
        ],
        [
          "Enter card",
          false
        ]
      ],
      "lesson": "Real prizes do not require surprise fees.",
      "legacySource": "old"
    },
    {
      "id": "old-virus-tool",
      "type": "virusDownload",
      "title": "Virus Download Race",
      "category": "Malware",
      "difficulty": "easy",
      "command": "STOP THE DOWNLOAD",
      "directions": "Spam cancel / Space / Enter before 100%.",
      "seconds": 9,
      "popupTitle": "Virus Scan Required",
      "popupBody": "Downloading security repair tool...",
      "clicksNeeded": 13,
      "downloadRate": 1.35,
      "lesson": "Never install surprise security tools.",
      "legacySource": "old"
    },
    {
      "id": "old-virus-remote",
      "type": "virusDownload",
      "title": "Remote Access Panic",
      "category": "Remote Access",
      "difficulty": "hard",
      "command": "CUT THE CONNECTION",
      "directions": "Mash fast before remote tool installs.",
      "seconds": 8,
      "popupTitle": "Technician Connected",
      "popupBody": "Installing remote control helper...",
      "clicksNeeded": 22,
      "downloadRate": 2.25,
      "lesson": "Do not install remote-access tools from surprise warnings.",
      "legacySource": "old"
    },
    {
      "id": "old-virus-video",
      "type": "virusDownload",
      "title": "Video Codec Download",
      "category": "Streaming Malware",
      "difficulty": "medium",
      "command": "STOP THE CODEC",
      "directions": "Stop the codec download before it finishes.",
      "seconds": 9,
      "popupTitle": "Video Buffer Fix",
      "popupBody": "Installing HD video codec...",
      "clicksNeeded": 18,
      "downloadRate": 1.9,
      "lesson": "Fake codecs are malware traps.",
      "legacySource": "old"
    },
    {
      "id": "old-virus-ai",
      "type": "virusDownload",
      "title": "AI Cleaner Trap",
      "category": "AI Scam",
      "difficulty": "medium",
      "command": "STOP AI CLEANER",
      "directions": "Cancel the fake AI security download.",
      "seconds": 9,
      "popupTitle": "AI Security Cleaner",
      "popupBody": "AI scanner downloading...",
      "clicksNeeded": 18,
      "downloadRate": 1.85,
      "lesson": "AI branding can make malware look trustworthy.",
      "legacySource": "old"
    },
    {
      "id": "old-virus-refund",
      "type": "virusDownload",
      "title": "Refund App Install",
      "category": "Refund Scam",
      "difficulty": "medium",
      "command": "CANCEL THE INSTALL",
      "directions": "Stop the refund app before install fills.",
      "seconds": 9,
      "popupTitle": "Refund Manager",
      "popupBody": "Install required to process your refund.",
      "clicksNeeded": 18,
      "downloadRate": 1.8,
      "lesson": "Refund scammers use downloads and screen-share tools.",
      "legacySource": "old"
    },
    {
      "id": "old-tab-video",
      "type": "tabStopDownload",
      "title": "Find Stop Button: Video Codec",
      "category": "Streaming Malware",
      "difficulty": "medium",
      "command": "SWITCH TABS \u2192 STOP DOWNLOAD",
      "directions": "Move across tabs and click STOP DOWNLOAD before 100%.",
      "seconds": 11,
      "scenario": "A fake video codec is downloading in another tab.",
      "lesson": "Fake video pages hide download controls behind tab confusion.",
      "legacySource": "old"
    },
    {
      "id": "old-tab-game",
      "type": "tabStopDownload",
      "title": "Find Stop Button: Game Installer",
      "category": "Gaming Malware",
      "difficulty": "hard",
      "command": "SWITCH TABS \u2192 STOP DOWNLOAD",
      "directions": "Find Downloads and stop it fast.",
      "seconds": 9,
      "scenario": "A free game installer started downloading while pop-ups distract you.",
      "lesson": "Free game installers can carry malware.",
      "legacySource": "old"
    },
    {
      "id": "old-tab-ai",
      "type": "tabStopDownload",
      "title": "Find Stop Button: AI Unlocker",
      "category": "AI Malware",
      "difficulty": "hard",
      "command": "SWITCH TABS \u2192 STOP DOWNLOAD",
      "directions": "Find the stop button before install completes.",
      "seconds": 9,
      "scenario": "An AI unlocker is downloading while the page says not to close anything.",
      "lesson": "AI unlockers and cracks are unsafe.",
      "legacySource": "old"
    },
    {
      "id": "old-tab-univ",
      "type": "tabStopDownload",
      "title": "Find Stop Button: Campus Tool",
      "category": "University Phishing",
      "difficulty": "medium",
      "command": "SWITCH TABS \u2192 STOP DOWNLOAD",
      "directions": "Find STOP DOWNLOAD in the correct tab.",
      "seconds": 11,
      "scenario": "A fake password-renewal page downloads a campus security tool.",
      "lesson": "School-themed downloads can be malware.",
      "legacySource": "old"
    },
    {
      "id": "old-tab-refund",
      "type": "tabStopDownload",
      "title": "Find Stop Button: Refund Tool",
      "category": "Refund Scam",
      "difficulty": "medium",
      "command": "SWITCH TABS \u2192 STOP DOWNLOAD",
      "directions": "Switch tabs and stop the file.",
      "seconds": 11,
      "scenario": "A refund tool began downloading after a fake refund page.",
      "lesson": "Refund scams use remote access or downloads.",
      "legacySource": "old"
    },
    {
      "id": "old-pop-tech",
      "type": "popupPurge",
      "title": "Pop-Up Storm",
      "category": "Tech Support",
      "difficulty": "easy",
      "command": "X BUTTONS ONLY",
      "directions": "Close every pop-up using only real X buttons. Do not click inside the ads.",
      "seconds": 13,
      "popups": 5,
      "lesson": "Scam pop-ups use fake buttons and pressure.",
      "legacySource": "old"
    },
    {
      "id": "old-pop-coupon",
      "type": "popupPurge",
      "title": "Coupon Chaos",
      "category": "Coupon Scam",
      "difficulty": "medium",
      "command": "X BUTTONS ONLY",
      "directions": "Close every pop-up using only real X buttons. Do not click inside the ads.",
      "seconds": 10,
      "popups": 7,
      "lesson": "Scam pop-ups use fake buttons and pressure.",
      "legacySource": "old"
    },
    {
      "id": "old-pop-notify",
      "type": "popupPurge",
      "title": "Notification Trap",
      "category": "Browser Spam",
      "difficulty": "hard",
      "command": "X BUTTONS ONLY",
      "directions": "Close every pop-up using only real X buttons. Do not click inside the ads.",
      "seconds": 10,
      "popups": 9,
      "lesson": "Scam pop-ups use fake buttons and pressure.",
      "legacySource": "old"
    },
    {
      "id": "old-pop-refund",
      "type": "popupPurge",
      "title": "Refund Window Swarm",
      "category": "Refund Scam",
      "difficulty": "medium",
      "command": "X BUTTONS ONLY",
      "directions": "Close every pop-up using only real X buttons. Do not click inside the ads.",
      "seconds": 10,
      "popups": 7,
      "lesson": "Scam pop-ups use fake buttons and pressure.",
      "legacySource": "old"
    },
    {
      "id": "old-pop-video",
      "type": "popupPurge",
      "title": "Video Pop-Up Swarm",
      "category": "Streaming Malware",
      "difficulty": "medium",
      "command": "X BUTTONS ONLY",
      "directions": "Close every pop-up using only real X buttons. Do not click inside the ads.",
      "seconds": 10,
      "popups": 8,
      "lesson": "Scam pop-ups use fake buttons and pressure.",
      "legacySource": "old"
    },
    {
      "id": "old-pop-ai",
      "type": "popupPurge",
      "title": "AI Warning Swarm",
      "category": "AI Scam",
      "difficulty": "hard",
      "command": "X BUTTONS ONLY",
      "directions": "Close every pop-up using only real X buttons. Do not click inside the ads.",
      "seconds": 10,
      "popups": 9,
      "lesson": "Scam pop-ups use fake buttons and pressure.",
      "legacySource": "old"
    },
    {
      "id": "old-x-malware",
      "type": "closeWindowX",
      "title": "Find the Real X",
      "category": "Malware Pop-Up",
      "difficulty": "easy",
      "command": "FIND THE REAL X",
      "directions": "Click the true close button, not fake action buttons.",
      "seconds": 10,
      "headline": "MALWARE DETECTED",
      "body": "Call support now. Do not shut down.",
      "lesson": "Close fake warnings; do not call, install, or pay.",
      "legacySource": "old"
    },
    {
      "id": "old-x-browser",
      "type": "closeWindowX",
      "title": "Close Browser Hijack",
      "category": "Browser Spam",
      "difficulty": "hard",
      "command": "FIND THE REAL X",
      "directions": "Click the true close button, not fake action buttons.",
      "seconds": 8,
      "headline": "BROWSER LOCKED",
      "body": "Pay to unlock browser or data will be lost.",
      "lesson": "Close fake warnings; do not call, install, or pay.",
      "legacySource": "old"
    },
    {
      "id": "old-x-video",
      "type": "closeWindowX",
      "title": "Close Video Codec Warning",
      "category": "Streaming Malware",
      "difficulty": "medium",
      "command": "FIND THE REAL X",
      "directions": "Click the true close button, not fake action buttons.",
      "seconds": 10,
      "headline": "VIDEO PLAYER ERROR",
      "body": "Download required codec to continue watching.",
      "lesson": "Close fake warnings; do not call, install, or pay.",
      "legacySource": "old"
    },
    {
      "id": "old-x-ai",
      "type": "closeWindowX",
      "title": "Close AI Scanner",
      "category": "AI Scam",
      "difficulty": "medium",
      "command": "FIND THE REAL X",
      "directions": "Click the true close button, not fake action buttons.",
      "seconds": 10,
      "headline": "AI SECURITY ALERT",
      "body": "AI found 88 threats. Download cleaner now.",
      "lesson": "Close fake warnings; do not call, install, or pay.",
      "legacySource": "old"
    },
    {
      "id": "old-x-refund",
      "type": "closeWindowX",
      "title": "Close Refund Pop-Up",
      "category": "Refund Scam",
      "difficulty": "medium",
      "command": "FIND THE REAL X",
      "directions": "Click the true close button, not fake action buttons.",
      "seconds": 10,
      "headline": "REFUND ERROR",
      "body": "Install refund tool to fix account charge.",
      "lesson": "Close fake warnings; do not call, install, or pay.",
      "legacySource": "old"
    },
    {
      "id": "old-shoot-main",
      "type": "inboxShooter",
      "title": "Inbox Invaders",
      "category": "Email Phishing",
      "difficulty": "easy",
      "command": "SHOOT SCAMS ONLY",
      "directions": "Click scam emails only. Normal emails are decoys and cost trust if hit.",
      "seconds": 13,
      "targets": [
        [
          "Bank password reset",
          "security@bank-login-alert.co",
          "Verify now at fake bank link",
          true
        ],
        [
          "Package fee",
          "delivery@parcel-fastpay.net",
          "Pay $1.50 redelivery fee",
          true
        ],
        [
          "Team lunch notes",
          "friend@example.com",
          "Normal notes",
          false
        ],
        [
          "Gift card tax",
          "irs-payments@govtax-help.com",
          "Pay tax office with gift cards",
          true
        ],
        [
          "Family photos",
          "cousin@example.com",
          "Known family drive",
          false
        ]
      ],
      "lesson": "Good defense blocks scams without hitting normal messages.",
      "legacySource": "old"
    },
    {
      "id": "old-shoot-univ",
      "type": "inboxShooter",
      "title": "University Inbox Defense",
      "category": "University Phishing",
      "difficulty": "medium",
      "command": "SHOOT SCAMS ONLY",
      "directions": "Click scam emails only. Normal emails are decoys and cost trust if hit.",
      "seconds": 11,
      "targets": [
        [
          "Password expires",
          "it-help@campus-password-renewal.com",
          "Log in by midnight",
          true
        ],
        [
          "Class announcement",
          "notifications@official-school.edu",
          "Room changed",
          false
        ],
        [
          "Financial aid refund",
          "aid@refund-fast-school.net",
          "Enter bank info",
          true
        ],
        [
          "Library notice",
          "library@official-school.edu",
          "Book due",
          false
        ],
        [
          "Duo code request",
          "security@verify-school-login.co",
          "Reply with code",
          true
        ]
      ],
      "lesson": "Good defense blocks scams without hitting normal messages.",
      "legacySource": "old"
    },
    {
      "id": "old-shoot-job",
      "type": "inboxShooter",
      "title": "Fake Job Inbox",
      "category": "Job Scam",
      "difficulty": "medium",
      "command": "SHOOT SCAMS ONLY",
      "directions": "Click scam emails only. Normal emails are decoys and cost trust if hit.",
      "seconds": 11,
      "targets": [
        [
          "Remote job offer",
          "hr@instant-hire-work.net",
          "Buy equipment with our check",
          true
        ],
        [
          "Career fair",
          "careers@example.edu",
          "Career fair details",
          false
        ],
        [
          "Interview fee",
          "recruiting@job-fastpay.co",
          "Pay fee in crypto",
          true
        ],
        [
          "Resume feedback",
          "advisor@example.edu",
          "Resume notes",
          false
        ],
        [
          "Instant hire",
          "payroll@newjob-payroll.biz",
          "Send bank info",
          true
        ]
      ],
      "lesson": "Good defense blocks scams without hitting normal messages.",
      "legacySource": "old"
    },
    {
      "id": "old-shoot-business",
      "type": "inboxShooter",
      "title": "Business Email Blast",
      "category": "Business Email",
      "difficulty": "hard",
      "command": "SHOOT SCAMS ONLY",
      "directions": "Click scam emails only. Normal emails are decoys and cost trust if hit.",
      "seconds": 11,
      "targets": [
        [
          "CEO urgent",
          "ceo.office@company-payments.co",
          "Buy gift cards confidentially",
          true
        ],
        [
          "Finance policy",
          "finance@company.com",
          "Updated workflow",
          false
        ],
        [
          "Vendor bank change",
          "vendor-payments@new-domain.biz",
          "Wire today",
          true
        ],
        [
          "Project update",
          "manager@company.com",
          "Slides attached",
          false
        ],
        [
          "Secret wire",
          "boss@cornpany.com",
          "Do not tell finance",
          true
        ]
      ],
      "lesson": "Good defense blocks scams without hitting normal messages.",
      "legacySource": "old"
    },
    {
      "id": "old-email-block-bank",
      "type": "emailBlock",
      "title": "Block Sender: Fake Bank",
      "category": "Bank Phishing",
      "difficulty": "easy",
      "command": "OPEN EMAIL MENU \u2192 BLOCK SENDER",
      "directions": "Open the email actions menu, then choose Block Sender.",
      "seconds": 12,
      "sender": "Bank Security",
      "from": "security@bank-login-alert.co",
      "body": "Your account will close. Click the link and verify password now.",
      "lesson": "Block/report the sender instead of clicking, replying, or forwarding.",
      "legacySource": "old"
    },
    {
      "id": "old-email-block-univ",
      "type": "emailBlock",
      "title": "Block Sender: Password Expiring",
      "category": "University Phishing",
      "difficulty": "medium",
      "command": "OPEN EMAIL MENU \u2192 BLOCK SENDER",
      "directions": "Open the email actions menu, then choose Block Sender.",
      "seconds": 12,
      "sender": "Campus IT",
      "from": "it-help@campus-password-renewal.com",
      "body": "Your password expires tonight. Log in here or lose access.",
      "lesson": "Block/report the sender instead of clicking, replying, or forwarding.",
      "legacySource": "old"
    },
    {
      "id": "old-email-block-job",
      "type": "emailBlock",
      "title": "Block Sender: Pay-First Job",
      "category": "Job Scam",
      "difficulty": "medium",
      "command": "OPEN EMAIL MENU \u2192 BLOCK SENDER",
      "directions": "Open the email actions menu, then choose Block Sender.",
      "seconds": 12,
      "sender": "Remote Hiring Team",
      "from": "hr@instant-hire-payroll.biz",
      "body": "Pay equipment fee before your interview.",
      "lesson": "Block/report the sender instead of clicking, replying, or forwarding.",
      "legacySource": "old"
    },
    {
      "id": "old-email-block-refund",
      "type": "emailBlock",
      "title": "Block Sender: Refund Desk",
      "category": "Refund Scam",
      "difficulty": "medium",
      "command": "OPEN EMAIL MENU \u2192 BLOCK SENDER",
      "directions": "Open the email actions menu, then choose Block Sender.",
      "seconds": 12,
      "sender": "Refund Department",
      "from": "refund@subscription-helpdesk.net",
      "body": "You were charged $499. Call refund desk.",
      "lesson": "Block/report the sender instead of clicking, replying, or forwarding.",
      "legacySource": "old"
    },
    {
      "id": "old-email-block-discord",
      "type": "emailBlock",
      "title": "Block Sender: Fake Discord",
      "category": "Account Takeover",
      "difficulty": "hard",
      "command": "OPEN EMAIL MENU \u2192 BLOCK SENDER",
      "directions": "Open the email actions menu, then choose Block Sender.",
      "seconds": 10,
      "sender": "Discord Gift",
      "from": "nitro@discord-gifts-verify.net",
      "body": "Free Nitro expires. Log in now.",
      "lesson": "Block/report the sender instead of clicking, replying, or forwarding.",
      "legacySource": "old"
    },
    {
      "id": "old-email-block-med",
      "type": "emailBlock",
      "title": "Block Sender: Medicare Trap",
      "category": "Health Fraud",
      "difficulty": "medium",
      "command": "OPEN EMAIL MENU \u2192 BLOCK SENDER",
      "directions": "Open the email actions menu, then choose Block Sender.",
      "seconds": 12,
      "sender": "Medicare Update",
      "from": "agent@medicare-card-now.info",
      "body": "Send Medicare number or coverage may stop.",
      "lesson": "Block/report the sender instead of clicking, replying, or forwarding.",
      "legacySource": "old"
    },
    {
      "id": "old-sms-bank",
      "type": "smsBlock",
      "title": "Block Bank Phish",
      "category": "SMS Phishing",
      "difficulty": "medium",
      "command": "MENU \u2192 BLOCK",
      "directions": "Open the phone menu and choose the safe block/report action.",
      "seconds": 12,
      "message": "BANK ALERT: Click this link or your account closes.",
      "sender": "Block Bank Phish",
      "lesson": "Do not reply to scam texts; block or report them.",
      "legacySource": "old"
    },
    {
      "id": "old-sms-delivery",
      "type": "smsBlock",
      "title": "Block Delivery Fee",
      "category": "Package Scam",
      "difficulty": "medium",
      "command": "MENU \u2192 BLOCK",
      "directions": "Open the phone menu and choose the safe block/report action.",
      "seconds": 12,
      "message": "Package delayed. Pay fee at parcel-fastpay-now.net",
      "sender": "Block Delivery Fee",
      "lesson": "Do not reply to scam texts; block or report them.",
      "legacySource": "old"
    },
    {
      "id": "old-sms-family",
      "type": "smsBlock",
      "title": "Block Fake Relative",
      "category": "Family Emergency",
      "difficulty": "medium",
      "command": "MENU \u2192 BLOCK",
      "directions": "Open the phone menu and choose the safe block/report action.",
      "seconds": 12,
      "message": "It is me. New number. Send money and do not call anyone.",
      "sender": "Block Fake Relative",
      "lesson": "Do not reply to scam texts; block or report them.",
      "legacySource": "old"
    },
    {
      "id": "old-sms-ai",
      "type": "smsReport",
      "title": "Report AI Bank Bot",
      "category": "AI Text Scam",
      "difficulty": "medium",
      "command": "MESSAGE OPTIONS \u2192 REPORT SPAM",
      "directions": "Open the phone menu and choose the safe block/report action.",
      "seconds": 12,
      "message": "Our AI detected fraud. Click link and enter password.",
      "sender": "Report AI Bank Bot",
      "lesson": "Do not reply to scam texts; block or report them.",
      "legacySource": "old"
    },
    {
      "id": "old-sms-univ",
      "type": "smsReport",
      "title": "Report Campus Password Text",
      "category": "University Phishing",
      "difficulty": "medium",
      "command": "MESSAGE OPTIONS \u2192 REPORT SPAM",
      "directions": "Open the phone menu and choose the safe block/report action.",
      "seconds": 12,
      "message": "Your campus password expires. Reply with your code.",
      "sender": "Report Campus Password Text",
      "lesson": "Do not reply to scam texts; block or report them.",
      "legacySource": "old"
    },
    {
      "id": "old-sms-prize",
      "type": "smsReport",
      "title": "Report Prize Spam",
      "category": "Prize Scam",
      "difficulty": "medium",
      "command": "MESSAGE OPTIONS \u2192 REPORT SPAM",
      "directions": "Open the phone menu and choose the safe block/report action.",
      "seconds": 12,
      "message": "You won $900! Pay $5 fee today.",
      "sender": "Report Prize Spam",
      "lesson": "Do not reply to scam texts; block or report them.",
      "legacySource": "old"
    },
    {
      "id": "old-lobby-robux",
      "type": "lobbyMute",
      "title": "Lobby Moderator: Free Coins",
      "category": "Game Chat",
      "difficulty": "easy",
      "command": "FIND SPAMMER \u2192 MUTE/REPORT",
      "directions": "Find the exact spammer in the player list. Normal players are decoys and cost trust if clicked.",
      "seconds": 13,
      "spammer": "ScamBot99",
      "message": "FREE COINS! Visit game-prize-fast.net and log in!",
      "lesson": "Public game chats often contain login, gift, and grooming scams.",
      "legacySource": "old"
    },
    {
      "id": "old-game-chat-robux",
      "type": "gameChatReport",
      "title": "Report Game Chat: Free Coins",
      "category": "Game Chat",
      "difficulty": "easy",
      "command": "OPEN PLAYER OPTIONS \u2192 REPORT",
      "directions": "Open the suspicious player options and report/block them.",
      "seconds": 12,
      "player": "ScamBot99",
      "message": "FREE COINS! Visit game-prize-fast.net and log in!",
      "lesson": "Report suspicious game chat instead of engaging.",
      "legacySource": "old"
    },
    {
      "id": "old-lobby-nitro",
      "type": "lobbyMute",
      "title": "Lobby Moderator: Fake Nitro",
      "category": "Game Chat",
      "difficulty": "medium",
      "command": "FIND SPAMMER \u2192 MUTE/REPORT",
      "directions": "Find the exact spammer in the player list. Normal players are decoys and cost trust if clicked.",
      "seconds": 11,
      "spammer": "NitroDropper",
      "message": "Join my server for free Nitro. Verify with Discord login.",
      "lesson": "Public game chats often contain login, gift, and grooming scams.",
      "legacySource": "old"
    },
    {
      "id": "old-game-chat-nitro",
      "type": "gameChatReport",
      "title": "Report Game Chat: Fake Nitro",
      "category": "Game Chat",
      "difficulty": "medium",
      "command": "OPEN PLAYER OPTIONS \u2192 REPORT",
      "directions": "Open the suspicious player options and report/block them.",
      "seconds": 12,
      "player": "NitroDropper",
      "message": "Join my server for free Nitro. Verify with Discord login.",
      "lesson": "Report suspicious game chat instead of engaging.",
      "legacySource": "old"
    },
    {
      "id": "old-lobby-flirt",
      "type": "lobbyMute",
      "title": "Lobby Moderator: Weird DM",
      "category": "Online Safety",
      "difficulty": "hard",
      "command": "FIND SPAMMER \u2192 MUTE/REPORT",
      "directions": "Find the exact spammer in the player list. Normal players are decoys and cost trust if clicked.",
      "seconds": 11,
      "spammer": "CoolStranger",
      "message": "You seem mature. DM me privately and keep it secret.",
      "lesson": "Public game chats often contain login, gift, and grooming scams.",
      "legacySource": "old"
    },
    {
      "id": "old-game-chat-flirt",
      "type": "gameChatReport",
      "title": "Report Game Chat: Weird DM",
      "category": "Online Safety",
      "difficulty": "hard",
      "command": "OPEN PLAYER OPTIONS \u2192 REPORT",
      "directions": "Open the suspicious player options and report/block them.",
      "seconds": 10,
      "player": "CoolStranger",
      "message": "You seem mature. DM me privately and keep it secret.",
      "lesson": "Report suspicious game chat instead of engaging.",
      "legacySource": "old"
    },
    {
      "id": "old-lobby-crypto",
      "type": "lobbyMute",
      "title": "Lobby Moderator: Crypto Flex",
      "category": "Investment Scam",
      "difficulty": "hard",
      "command": "FIND SPAMMER \u2192 MUTE/REPORT",
      "directions": "Find the exact spammer in the player list. Normal players are decoys and cost trust if clicked.",
      "seconds": 11,
      "spammer": "CoinKing",
      "message": "I doubled money in 2 days. Send crypto and I will teach you.",
      "lesson": "Public game chats often contain login, gift, and grooming scams.",
      "legacySource": "old"
    },
    {
      "id": "old-game-chat-crypto",
      "type": "gameChatReport",
      "title": "Report Game Chat: Crypto Flex",
      "category": "Investment Scam",
      "difficulty": "hard",
      "command": "OPEN PLAYER OPTIONS \u2192 REPORT",
      "directions": "Open the suspicious player options and report/block them.",
      "seconds": 10,
      "player": "CoinKing",
      "message": "I doubled money in 2 days. Send crypto and I will teach you.",
      "lesson": "Report suspicious game chat instead of engaging.",
      "legacySource": "old"
    },
    {
      "id": "old-lobby-gift",
      "type": "lobbyMute",
      "title": "Lobby Moderator: Gift Card Trade",
      "category": "Gift Card Scam",
      "difficulty": "medium",
      "command": "FIND SPAMMER \u2192 MUTE/REPORT",
      "directions": "Find the exact spammer in the player list. Normal players are decoys and cost trust if clicked.",
      "seconds": 11,
      "spammer": "TradeMaster",
      "message": "Send gift card code and I will give rare skins after.",
      "lesson": "Public game chats often contain login, gift, and grooming scams.",
      "legacySource": "old"
    },
    {
      "id": "old-game-chat-gift",
      "type": "gameChatReport",
      "title": "Report Game Chat: Gift Card Trade",
      "category": "Gift Card Scam",
      "difficulty": "medium",
      "command": "OPEN PLAYER OPTIONS \u2192 REPORT",
      "directions": "Open the suspicious player options and report/block them.",
      "seconds": 12,
      "player": "TradeMaster",
      "message": "Send gift card code and I will give rare skins after.",
      "lesson": "Report suspicious game chat instead of engaging.",
      "legacySource": "old"
    },
    {
      "id": "old-cert-gift",
      "type": "downloadDelete",
      "title": "Delete GiftCard_Certificate.exe",
      "category": "Download Safety",
      "difficulty": "easy",
      "command": "DELETE THE BAD DOWNLOAD",
      "directions": "Select the suspicious downloaded file and delete it.",
      "seconds": 12,
      "fileName": "GiftCard_Certificate.exe",
      "description": "A suspicious file appeared in Downloads.",
      "lesson": "Unexpected executables, macros, codecs, and screen-savers are risky.",
      "legacySource": "old"
    },
    {
      "id": "old-cert-refund",
      "type": "downloadDelete",
      "title": "Delete Refund_Certificate.scr",
      "category": "Refund Scam",
      "difficulty": "medium",
      "command": "DELETE THE BAD DOWNLOAD",
      "directions": "Select the suspicious downloaded file and delete it.",
      "seconds": 12,
      "fileName": "Refund_Certificate.scr",
      "description": "A suspicious file appeared in Downloads.",
      "lesson": "Unexpected executables, macros, codecs, and screen-savers are risky.",
      "legacySource": "old"
    },
    {
      "id": "old-cert-medical",
      "type": "downloadDelete",
      "title": "Delete Medicare_Update.xlsm",
      "category": "Health Fraud",
      "difficulty": "medium",
      "command": "DELETE THE BAD DOWNLOAD",
      "directions": "Select the suspicious downloaded file and delete it.",
      "seconds": 12,
      "fileName": "Medicare_Update.xlsm",
      "description": "A suspicious file appeared in Downloads.",
      "lesson": "Unexpected executables, macros, codecs, and screen-savers are risky.",
      "legacySource": "old"
    },
    {
      "id": "old-cert-game",
      "type": "downloadDelete",
      "title": "Delete FreePremiumGame_Setup.exe",
      "category": "Gaming Malware",
      "difficulty": "hard",
      "command": "DELETE THE BAD DOWNLOAD",
      "directions": "Select the suspicious downloaded file and delete it.",
      "seconds": 10,
      "fileName": "FreePremiumGame_Setup.exe",
      "description": "A suspicious file appeared in Downloads.",
      "lesson": "Unexpected executables, macros, codecs, and screen-savers are risky.",
      "legacySource": "old"
    },
    {
      "id": "old-cert-ai",
      "type": "downloadDelete",
      "title": "Delete AI_Security_Cleaner.exe",
      "category": "AI Scam",
      "difficulty": "hard",
      "command": "DELETE THE BAD DOWNLOAD",
      "directions": "Select the suspicious downloaded file and delete it.",
      "seconds": 10,
      "fileName": "AI_Security_Cleaner.exe",
      "description": "A suspicious file appeared in Downloads.",
      "lesson": "Unexpected executables, macros, codecs, and screen-savers are risky.",
      "legacySource": "old"
    },
    {
      "id": "old-cert-video",
      "type": "downloadDelete",
      "title": "Delete HD_Video_Codec.exe",
      "category": "Streaming Malware",
      "difficulty": "medium",
      "command": "DELETE THE BAD DOWNLOAD",
      "directions": "Select the suspicious downloaded file and delete it.",
      "seconds": 12,
      "fileName": "HD_Video_Codec.exe",
      "description": "A suspicious file appeared in Downloads.",
      "lesson": "Unexpected executables, macros, codecs, and screen-savers are risky.",
      "legacySource": "old"
    },
    {
      "id": "old-files-basic",
      "type": "fileExplorerDelete",
      "title": "File Explorer Cleanup",
      "category": "File Explorer",
      "difficulty": "easy",
      "command": "SELECT BAD FILES \u2192 DELETE",
      "directions": "Select risky files and delete them. Safe files are decoys.",
      "seconds": 14,
      "files": [
        [
          "family_photo.jpg",
          "\ud83d\uddbc\ufe0f",
          false
        ],
        [
          "invoice.exe",
          "\u2699\ufe0f",
          true
        ],
        [
          "meeting_notes.pdf",
          "\ud83d\udcc4",
          false
        ],
        [
          "bank_login.zip",
          "\ud83d\udddc\ufe0f",
          true
        ]
      ],
      "needed": 2,
      "lesson": "File extensions and unexpected context matter.",
      "legacySource": "old"
    },
    {
      "id": "old-files-health",
      "type": "fileExplorerDelete",
      "title": "Health Folder Cleanup",
      "category": "Health Fraud",
      "difficulty": "medium",
      "command": "SELECT BAD FILES \u2192 DELETE",
      "directions": "Select risky files and delete them. Safe files are decoys.",
      "seconds": 14,
      "files": [
        [
          "Medicare_Update.scr",
          "\u2699\ufe0f",
          true
        ],
        [
          "appointment.pdf",
          "\ud83d\udcc4",
          false
        ],
        [
          "coverage_stop.exe",
          "\ud83e\uddf0",
          true
        ],
        [
          "wellness.txt",
          "\ud83d\udcdd",
          false
        ],
        [
          "Benefit_Form.xlsm",
          "\ud83d\udcca",
          true
        ]
      ],
      "needed": 3,
      "lesson": "File extensions and unexpected context matter.",
      "legacySource": "old"
    },
    {
      "id": "old-files-univ",
      "type": "fileExplorerDelete",
      "title": "Campus Downloads Cleanup",
      "category": "University Phishing",
      "difficulty": "medium",
      "command": "SELECT BAD FILES \u2192 DELETE",
      "directions": "Select risky files and delete them. Safe files are decoys.",
      "seconds": 14,
      "files": [
        [
          "Scholarship_Form.pdf",
          "\ud83d\udcc4",
          false
        ],
        [
          "Password_Reset_Tool.exe",
          "\u2699\ufe0f",
          true
        ],
        [
          "campus_map.png",
          "\ud83d\uddbc\ufe0f",
          false
        ],
        [
          "FinancialAid_Login.zip",
          "\ud83d\udddc\ufe0f",
          true
        ]
      ],
      "needed": 2,
      "lesson": "File extensions and unexpected context matter.",
      "legacySource": "old"
    },
    {
      "id": "old-files-game",
      "type": "fileExplorerDelete",
      "title": "Game Mods Cleanup",
      "category": "Gaming Malware",
      "difficulty": "hard",
      "command": "SELECT BAD FILES \u2192 DELETE",
      "directions": "Select risky files and delete them. Safe files are decoys.",
      "seconds": 12,
      "files": [
        [
          "CoolSkinPack.exe",
          "\ud83c\udfae",
          true
        ],
        [
          "readme.txt",
          "\ud83d\udcdd",
          false
        ],
        [
          "FreeCoins.apk",
          "\ud83d\udcf1",
          true
        ],
        [
          "screenshot.png",
          "\ud83d\uddbc\ufe0f",
          false
        ],
        [
          "PremiumMod.zip",
          "\ud83d\udddc\ufe0f",
          true
        ]
      ],
      "needed": 3,
      "lesson": "File extensions and unexpected context matter.",
      "legacySource": "old"
    },
    {
      "id": "old-files-business",
      "type": "fileExplorerDelete",
      "title": "Business Downloads Cleanup",
      "category": "Business Email",
      "difficulty": "hard",
      "command": "SELECT BAD FILES \u2192 DELETE",
      "directions": "Select risky files and delete them. Safe files are decoys.",
      "seconds": 12,
      "files": [
        [
          "Invoice.pdf",
          "\ud83d\udcc4",
          false
        ],
        [
          "Invoice.pdf.exe",
          "\u2699\ufe0f",
          true
        ],
        [
          "Vendor_Update.xlsm",
          "\ud83d\udcca",
          true
        ],
        [
          "PO_4921.pdf",
          "\ud83d\udcc4",
          false
        ],
        [
          "RefundTool.exe",
          "\ud83e\uddf0",
          true
        ]
      ],
      "needed": 3,
      "lesson": "File extensions and unexpected context matter.",
      "legacySource": "old"
    },
    {
      "id": "old-files-video",
      "type": "fileExplorerDelete",
      "title": "Video Downloads Cleanup",
      "category": "Streaming Malware",
      "difficulty": "medium",
      "command": "SELECT BAD FILES \u2192 DELETE",
      "directions": "Select risky files and delete them. Safe files are decoys.",
      "seconds": 14,
      "files": [
        [
          "movie_poster.jpg",
          "\ud83d\uddbc\ufe0f",
          false
        ],
        [
          "HD_Player.exe",
          "\u25b6\ufe0f",
          true
        ],
        [
          "Subtitles.srt",
          "\ud83d\udcdd",
          false
        ],
        [
          "Codec_Update.scr",
          "\u2699\ufe0f",
          true
        ]
      ],
      "needed": 2,
      "lesson": "File extensions and unexpected context matter.",
      "legacySource": "old"
    },
    {
      "id": "old-chat-job",
      "type": "chatRefuse",
      "title": "Refuse Fake Job",
      "category": "Job Scam",
      "difficulty": "easy",
      "command": "TYPE REFUSE \u2192 SEND",
      "directions": "Type the exact safe response and send it.",
      "seconds": 11,
      "person": "Recruiter",
      "message": "Want this remote job? Pay $80 and send bank info.",
      "answer": "REFUSE",
      "lesson": "Short, clear refusal/reporting prevents engagement.",
      "legacySource": "old"
    },
    {
      "id": "old-chat-code",
      "type": "chatRefuse",
      "title": "Refuse Code Request",
      "category": "2FA Theft",
      "difficulty": "easy",
      "command": "TYPE NO \u2192 SEND",
      "directions": "Type the exact safe response and send it.",
      "seconds": 11,
      "person": "Bank Support?",
      "message": "We sent you a code. Reply with it to stop fraud.",
      "answer": "NO",
      "lesson": "Short, clear refusal/reporting prevents engagement.",
      "legacySource": "old"
    },
    {
      "id": "old-chat-family",
      "type": "chatRefuse",
      "title": "Verify Family Emergency",
      "category": "Family Emergency",
      "difficulty": "medium",
      "command": "TYPE VERIFY \u2192 SEND",
      "directions": "Type the exact safe response and send it.",
      "seconds": 11,
      "person": "New Number",
      "message": "It is me. I need money now. Do not call anyone.",
      "answer": "VERIFY",
      "lesson": "Short, clear refusal/reporting prevents engagement.",
      "legacySource": "old"
    },
    {
      "id": "old-chat-ai",
      "type": "chatRefuse",
      "title": "Report AI Spam",
      "category": "AI Scam",
      "difficulty": "medium",
      "command": "TYPE REPORT \u2192 SEND",
      "directions": "Type the exact safe response and send it.",
      "seconds": 11,
      "person": "AI Assistant",
      "message": "I can unlock your bank refund. Send login details.",
      "answer": "REPORT",
      "lesson": "Short, clear refusal/reporting prevents engagement.",
      "legacySource": "old"
    },
    {
      "id": "old-chat-romance",
      "type": "chatRefuse",
      "title": "Reject Romance Pressure",
      "category": "Romance Scam",
      "difficulty": "hard",
      "command": "TYPE REFUSE \u2192 SEND",
      "directions": "Type the exact safe response and send it.",
      "seconds": 9,
      "person": "Online Friend",
      "message": "I love you. Send emergency money and keep us secret.",
      "answer": "REFUSE",
      "lesson": "Short, clear refusal/reporting prevents engagement.",
      "legacySource": "old"
    },
    {
      "id": "old-chat-univ",
      "type": "chatRefuse",
      "title": "Campus Code Refusal",
      "category": "University Phishing",
      "difficulty": "medium",
      "command": "TYPE NO \u2192 SEND",
      "directions": "Type the exact safe response and send it.",
      "seconds": 11,
      "person": "Campus IT?",
      "message": "Reply with your login code or account closes.",
      "answer": "NO",
      "lesson": "Short, clear refusal/reporting prevents engagement.",
      "legacySource": "old"
    },
    {
      "id": "old-chat-video",
      "type": "chatRefuse",
      "title": "Video Download Refusal",
      "category": "Streaming Malware",
      "difficulty": "easy",
      "command": "TYPE NO \u2192 SEND",
      "directions": "Type the exact safe response and send it.",
      "seconds": 11,
      "person": "Movie Site Bot",
      "message": "Reply YES to download HD player.",
      "answer": "NO",
      "lesson": "Short, clear refusal/reporting prevents engagement.",
      "legacySource": "old"
    },
    {
      "id": "old-mem-basic",
      "type": "attachmentMemory",
      "title": "Attachment Memory",
      "category": "Attachments",
      "difficulty": "easy",
      "command": "REMEMBER SAFE FILE",
      "directions": "Study the files. They flip over. Pick a safe file.",
      "seconds": 12,
      "revealMs": 3400,
      "attachments": [
        [
          "family_photo.jpg",
          "\ud83d\uddbc\ufe0f",
          true
        ],
        [
          "invoice.exe",
          "\u2699\ufe0f",
          false
        ],
        [
          "bank_login.zip",
          "\ud83d\udddc\ufe0f",
          false
        ],
        [
          "meeting_notes.pdf",
          "\ud83d\udcc4",
          true
        ]
      ],
      "lesson": "Executables, macros, archives, and fake codecs are risky.",
      "legacySource": "old"
    },
    {
      "id": "old-mem-hard",
      "type": "attachmentMemory",
      "title": "Attachment Flash",
      "category": "Attachments",
      "difficulty": "hard",
      "command": "REMEMBER SAFE FILE",
      "directions": "Study the files. They flip over. Pick a safe file.",
      "seconds": 10,
      "revealMs": 2100,
      "attachments": [
        [
          "Medicare_Update.scr",
          "\u2699\ufe0f",
          false
        ],
        [
          "grandkids.png",
          "\ud83d\uddbc\ufe0f",
          true
        ],
        [
          "Refund_Form.xlsm",
          "\ud83d\udcca",
          false
        ],
        [
          "Trip_Itinerary.pdf",
          "\ud83d\udcc4",
          true
        ],
        [
          "Security_Tool.exe",
          "\ud83e\uddf0",
          false
        ],
        [
          "recipe.txt",
          "\ud83d\udcdd",
          true
        ]
      ],
      "lesson": "Executables, macros, archives, and fake codecs are risky.",
      "legacySource": "old"
    },
    {
      "id": "old-mem-univ",
      "type": "attachmentMemory",
      "title": "Campus File Flip",
      "category": "University Phishing",
      "difficulty": "medium",
      "command": "REMEMBER SAFE FILE",
      "directions": "Study the files. They flip over. Pick a safe file.",
      "seconds": 12,
      "revealMs": 2500,
      "attachments": [
        [
          "syllabus.pdf",
          "\ud83d\udcc4",
          true
        ],
        [
          "Password_Reset.exe",
          "\u2699\ufe0f",
          false
        ],
        [
          "campus_map.png",
          "\ud83d\uddbc\ufe0f",
          true
        ],
        [
          "FinancialAid.zip",
          "\ud83d\udddc\ufe0f",
          false
        ]
      ],
      "lesson": "Executables, macros, archives, and fake codecs are risky.",
      "legacySource": "old"
    },
    {
      "id": "old-mem-video",
      "type": "attachmentMemory",
      "title": "Video File Flip",
      "category": "Streaming Malware",
      "difficulty": "medium",
      "command": "REMEMBER SAFE FILE",
      "directions": "Study the files. They flip over. Pick a safe file.",
      "seconds": 12,
      "revealMs": 2500,
      "attachments": [
        [
          "poster.jpg",
          "\ud83d\uddbc\ufe0f",
          true
        ],
        [
          "HD_Player.exe",
          "\u25b6\ufe0f",
          false
        ],
        [
          "Subtitles.srt",
          "\ud83d\udcdd",
          true
        ],
        [
          "Codec_Update.scr",
          "\u2699\ufe0f",
          false
        ]
      ],
      "lesson": "Executables, macros, archives, and fake codecs are risky.",
      "legacySource": "old"
    },
    {
      "id": "old-swipe-romance",
      "type": "swipeJudge",
      "title": "Swipe the Scam",
      "category": "Romance",
      "difficulty": "medium",
      "command": "LEFT = SCAM, RIGHT = OK",
      "directions": "Swipe/click left on scams, right on safer interactions.",
      "seconds": 13,
      "profiles": [
        [
          "Alex",
          "I love hiking. Want to meet at a public coffee shop?",
          false
        ],
        [
          "Jordan",
          "I love you already. Send money today but keep us secret.",
          true
        ],
        [
          "Taylor",
          "Let us video chat before sharing details.",
          false
        ],
        [
          "Morgan",
          "I am overseas and need gift cards immediately.",
          true
        ]
      ],
      "lesson": "Reject secrecy, urgency, overpayment, and bank-login pressure.",
      "legacySource": "old"
    },
    {
      "id": "old-swipe-market",
      "type": "swipeJudge",
      "title": "Marketplace Match",
      "category": "Marketplace",
      "difficulty": "hard",
      "command": "LEFT = SCAM, RIGHT = OK",
      "directions": "Swipe/click left on scams, right on safer interactions.",
      "seconds": 11,
      "profiles": [
        [
          "Buyer 1",
          "I overpaid. Refund the extra before payment clears.",
          true
        ],
        [
          "Buyer 2",
          "Can we meet in public and use platform payment?",
          false
        ],
        [
          "Buyer 3",
          "Send bank login so I can verify payment.",
          true
        ],
        [
          "Buyer 4",
          "I can pay through listed method.",
          false
        ]
      ],
      "lesson": "Reject secrecy, urgency, overpayment, and bank-login pressure.",
      "legacySource": "old"
    },
    {
      "id": "old-swipe-job",
      "type": "swipeJudge",
      "title": "Job Swipe",
      "category": "Job Scam",
      "difficulty": "medium",
      "command": "LEFT = SCAM, RIGHT = OK",
      "directions": "Swipe/click left on scams, right on safer interactions.",
      "seconds": 13,
      "profiles": [
        [
          "Recruiter",
          "Let us schedule a video interview first.",
          false
        ],
        [
          "FastHire",
          "Pay background fee in crypto before interview.",
          true
        ],
        [
          "HR Team",
          "Apply through our official careers site.",
          false
        ],
        [
          "Payroll",
          "Send bank login to start payroll.",
          true
        ]
      ],
      "lesson": "Reject secrecy, urgency, overpayment, and bank-login pressure.",
      "legacySource": "old"
    },
    {
      "id": "old-drag-grocery",
      "type": "dragTrash",
      "title": "Trash Fake Grocery Deals",
      "category": "Grocery Scam",
      "difficulty": "easy",
      "command": "DRAG SCAMS TO TRASH",
      "directions": "Drag scam items to trash. Safe items are decoys.",
      "seconds": 14,
      "items": [
        [
          "90% off groceries - enter card",
          true
        ],
        [
          "Weekly ad from official app",
          false
        ],
        [
          "Free groceries, pay shipping",
          true
        ],
        [
          "Store loyalty coupon",
          false
        ]
      ],
      "needed": 2,
      "lesson": "Unrealistic deals, fees, and credential requests are risky.",
      "legacySource": "old"
    },
    {
      "id": "old-drag-delivery",
      "type": "dragTrash",
      "title": "Trash Delivery Scams",
      "category": "Delivery Scam",
      "difficulty": "medium",
      "command": "DRAG SCAMS TO TRASH",
      "directions": "Drag scam items to trash. Safe items are decoys.",
      "seconds": 14,
      "items": [
        [
          "Delivery failed, pay unknown link",
          true
        ],
        [
          "Official grocery receipt",
          false
        ],
        [
          "Prize survey, enter card",
          true
        ],
        [
          "Known pickup reminder",
          false
        ]
      ],
      "needed": 2,
      "lesson": "Unrealistic deals, fees, and credential requests are risky.",
      "legacySource": "old"
    },
    {
      "id": "old-drag-univ",
      "type": "dragTrash",
      "title": "Trash Campus Phish",
      "category": "University Phishing",
      "difficulty": "medium",
      "command": "DRAG SCAMS TO TRASH",
      "directions": "Drag scam items to trash. Safe items are decoys.",
      "seconds": 14,
      "items": [
        [
          "Password expires, click login",
          true
        ],
        [
          "Official class reminder",
          false
        ],
        [
          "Financial aid refund, enter bank",
          true
        ],
        [
          "Library hours update",
          false
        ]
      ],
      "needed": 2,
      "lesson": "Unrealistic deals, fees, and credential requests are risky.",
      "legacySource": "old"
    },
    {
      "id": "old-drag-video",
      "type": "dragTrash",
      "title": "Trash Streaming Bait",
      "category": "Streaming Malware",
      "difficulty": "medium",
      "command": "DRAG SCAMS TO TRASH",
      "directions": "Drag scam items to trash. Safe items are decoys.",
      "seconds": 14,
      "items": [
        [
          "Download HD player",
          true
        ],
        [
          "Official trailer link",
          false
        ],
        [
          "Install codec now",
          true
        ],
        [
          "Movie review article",
          false
        ]
      ],
      "needed": 2,
      "lesson": "Unrealistic deals, fees, and credential requests are risky.",
      "legacySource": "old"
    },
    {
      "id": "old-drag-ai",
      "type": "dragTrash",
      "title": "Trash AI Scam Offers",
      "category": "AI Scam",
      "difficulty": "hard",
      "command": "DRAG SCAMS TO TRASH",
      "directions": "Drag scam items to trash. Safe items are decoys.",
      "seconds": 12,
      "items": [
        [
          "AI found refund, connect bank",
          true
        ],
        [
          "AI writing tip",
          false
        ],
        [
          "Free AI pro crack",
          true
        ],
        [
          "Prompt idea list",
          false
        ]
      ],
      "needed": 2,
      "lesson": "Unrealistic deals, fees, and credential requests are risky.",
      "legacySource": "old"
    },
    {
      "id": "old-money-grandchild",
      "type": "moneyCounter",
      "title": "Send No Money",
      "category": "Family Emergency",
      "difficulty": "easy",
      "command": "SET CORRECT MONEY AMOUNT",
      "directions": "Use plus/minus and send the correct safe amount.",
      "seconds": 12,
      "scenario": "Unknown new number asks for $500 emergency money.",
      "targetAmount": 0,
      "lesson": "Money should move only after verification and legitimate context.",
      "legacySource": "old"
    },
    {
      "id": "old-money-romance",
      "type": "moneyCounter",
      "title": "Romance Money Request",
      "category": "Romance Scam",
      "difficulty": "medium",
      "command": "SET CORRECT MONEY AMOUNT",
      "directions": "Use plus/minus and send the correct safe amount.",
      "seconds": 12,
      "scenario": "Online partner asks for $300 in gift cards and secrecy.",
      "targetAmount": 0,
      "lesson": "Money should move only after verification and legitimate context.",
      "legacySource": "old"
    },
    {
      "id": "old-money-charity",
      "type": "moneyCounter",
      "title": "Verified Charity Donation",
      "category": "Charity",
      "difficulty": "medium",
      "command": "SET CORRECT MONEY AMOUNT",
      "directions": "Use plus/minus and send the correct safe amount.",
      "seconds": 12,
      "scenario": "You independently opened the official local charity website for an optional $10 donation.",
      "targetAmount": 10,
      "lesson": "Money should move only after verification and legitimate context.",
      "legacySource": "old"
    },
    {
      "id": "old-money-market",
      "type": "moneyCounter",
      "title": "Marketplace Overpayment",
      "category": "Marketplace",
      "difficulty": "hard",
      "command": "SET CORRECT MONEY AMOUNT",
      "directions": "Use plus/minus and send the correct safe amount.",
      "seconds": 10,
      "scenario": "Buyer overpaid by $250 and wants refund before payment clears.",
      "targetAmount": 0,
      "lesson": "Money should move only after verification and legitimate context.",
      "legacySource": "old"
    },
    {
      "id": "old-money-familyok",
      "type": "moneyCounter",
      "title": "Verified Family Help",
      "category": "Family Safety",
      "difficulty": "hard",
      "command": "SET CORRECT MONEY AMOUNT",
      "directions": "Use plus/minus and send the correct safe amount.",
      "seconds": 10,
      "scenario": "Saved contact and verified phone call: parent asks for agreed $20 for groceries.",
      "targetAmount": 20,
      "lesson": "Money should move only after verification and legitimate context.",
      "legacySource": "old"
    },
    {
      "id": "old-money-job",
      "type": "moneyCounter",
      "title": "Job Equipment Fee",
      "category": "Job Scam",
      "difficulty": "medium",
      "command": "SET CORRECT MONEY AMOUNT",
      "directions": "Use plus/minus and send the correct safe amount.",
      "seconds": 12,
      "scenario": "A job recruiter asks you to pay $80 equipment fee before interview.",
      "targetAmount": 0,
      "lesson": "Money should move only after verification and legitimate context.",
      "legacySource": "old"
    },
    {
      "id": "old-jump-bank",
      "type": "hintPlatformer",
      "title": "Jump to Official App",
      "category": "Platformer",
      "difficulty": "easy",
      "command": "JUMP TO THE SAFE HINT",
      "directions": "Use Space/\u2191, arrow keys, buttons, or touch to reach the star.",
      "seconds": 13,
      "lesson": "Move toward verification and away from fake shortcuts.",
      "legacySource": "old"
    },
    {
      "id": "old-jump-family",
      "type": "hintPlatformer",
      "title": "Jump to Family Code",
      "category": "Platformer",
      "difficulty": "medium",
      "command": "JUMP TO THE SAFE HINT",
      "directions": "Use Space/\u2191, arrow keys, buttons, or touch to reach the star.",
      "seconds": 13,
      "lesson": "Move toward verification and away from fake shortcuts.",
      "legacySource": "old"
    },
    {
      "id": "old-jump-qr",
      "type": "hintPlatformer",
      "title": "Jump to Official QR",
      "category": "Platformer",
      "difficulty": "medium",
      "command": "JUMP TO THE SAFE HINT",
      "directions": "Use Space/\u2191, arrow keys, buttons, or touch to reach the star.",
      "seconds": 13,
      "lesson": "Move toward verification and away from fake shortcuts.",
      "legacySource": "old"
    },
    {
      "id": "old-jump-ai",
      "type": "hintPlatformer",
      "title": "Jump to Human Verify",
      "category": "Platformer",
      "difficulty": "hard",
      "command": "JUMP TO THE SAFE HINT",
      "directions": "Use Space/\u2191, arrow keys, buttons, or touch to reach the star.",
      "seconds": 11,
      "lesson": "Move toward verification and away from fake shortcuts.",
      "legacySource": "old"
    },
    {
      "id": "old-jump-video",
      "type": "hintPlatformer",
      "title": "Jump Past Codec Trap",
      "category": "Platformer",
      "difficulty": "medium",
      "command": "JUMP TO THE SAFE HINT",
      "directions": "Use Space/\u2191, arrow keys, buttons, or touch to reach the star.",
      "seconds": 13,
      "lesson": "Move toward verification and away from fake shortcuts.",
      "legacySource": "old"
    },
    {
      "id": "old-spy-browser",
      "type": "spotlightSpy",
      "title": "Find Browser Spyware",
      "category": "Spyware",
      "difficulty": "easy",
      "command": "MOVE SPOTLIGHT \u2192 FIND SPYWARE",
      "directions": "Move mouse/finger as spotlight. Click the hidden spyware.",
      "seconds": 12,
      "lesson": "Spyware can hide as normal apps, extensions, or tools.",
      "legacySource": "old"
    },
    {
      "id": "old-spy-phone",
      "type": "spotlightSpy",
      "title": "Find Phone Spyware",
      "category": "Spyware",
      "difficulty": "medium",
      "command": "MOVE SPOTLIGHT \u2192 FIND SPYWARE",
      "directions": "Move mouse/finger as spotlight. Click the hidden spyware.",
      "seconds": 12,
      "lesson": "Spyware can hide as normal apps, extensions, or tools.",
      "legacySource": "old"
    },
    {
      "id": "old-spy-extension",
      "type": "spotlightSpy",
      "title": "Find Bad Extension",
      "category": "Browser Extension",
      "difficulty": "medium",
      "command": "MOVE SPOTLIGHT \u2192 FIND SPYWARE",
      "directions": "Move mouse/finger as spotlight. Click the hidden spyware.",
      "seconds": 12,
      "lesson": "Spyware can hide as normal apps, extensions, or tools.",
      "legacySource": "old"
    },
    {
      "id": "old-spy-ai",
      "type": "spotlightSpy",
      "title": "Find AI Spy Bot",
      "category": "AI Scam",
      "difficulty": "hard",
      "command": "MOVE SPOTLIGHT \u2192 FIND SPYWARE",
      "directions": "Move mouse/finger as spotlight. Click the hidden spyware.",
      "seconds": 10,
      "lesson": "Spyware can hide as normal apps, extensions, or tools.",
      "legacySource": "old"
    },
    {
      "id": "old-spy-game",
      "type": "spotlightSpy",
      "title": "Find Game Spyware",
      "category": "Gaming Malware",
      "difficulty": "hard",
      "command": "MOVE SPOTLIGHT \u2192 FIND SPYWARE",
      "directions": "Move mouse/finger as spotlight. Click the hidden spyware.",
      "seconds": 10,
      "lesson": "Spyware can hide as normal apps, extensions, or tools.",
      "legacySource": "old"
    },
    {
      "id": "old-free-movies",
      "type": "freeSiteExit",
      "title": "Exit Free Movies Hd",
      "category": "Streaming Malware",
      "difficulty": "easy",
      "command": "EXIT WITHOUT CLICKING BAIT",
      "directions": "Exit without clicking movie/game/download bait.",
      "seconds": 10,
      "headline": "FREE MOVIES HD",
      "body": "Click any movie to install required HD player.",
      "lesson": "Free media/download pages often push malware.",
      "legacySource": "old"
    },
    {
      "id": "old-free-games",
      "type": "freeSiteExit",
      "title": "Exit Free Premium Games",
      "category": "Gaming Malware",
      "difficulty": "medium",
      "command": "EXIT WITHOUT CLICKING BAIT",
      "directions": "Exit without clicking movie/game/download bait.",
      "seconds": 10,
      "headline": "FREE PREMIUM GAMES",
      "body": "Click a game and install launcher to unlock premium mode.",
      "lesson": "Free media/download pages often push malware.",
      "legacySource": "old"
    },
    {
      "id": "old-free-sports",
      "type": "freeSiteExit",
      "title": "Exit Free Sports Stream",
      "category": "Streaming Malware",
      "difficulty": "medium",
      "command": "EXIT WITHOUT CLICKING BAIT",
      "directions": "Exit without clicking movie/game/download bait.",
      "seconds": 10,
      "headline": "FREE SPORTS STREAM",
      "body": "Allow notifications and install video codec.",
      "lesson": "Free media/download pages often push malware.",
      "legacySource": "old"
    },
    {
      "id": "old-free-ai",
      "type": "freeSiteExit",
      "title": "Exit Free Ai Pro Unlock",
      "category": "AI Malware",
      "difficulty": "hard",
      "command": "EXIT WITHOUT CLICKING BAIT",
      "directions": "Exit without clicking movie/game/download bait.",
      "seconds": 8,
      "headline": "FREE AI PRO UNLOCK",
      "body": "Download AI unlocker for premium account access.",
      "lesson": "Free media/download pages often push malware.",
      "legacySource": "old"
    },
    {
      "id": "old-free-textbooks",
      "type": "freeSiteExit",
      "title": "Exit Free Textbook Pdf",
      "category": "Student Scam",
      "difficulty": "medium",
      "command": "EXIT WITHOUT CLICKING BAIT",
      "directions": "Exit without clicking movie/game/download bait.",
      "seconds": 10,
      "headline": "FREE TEXTBOOK PDF",
      "body": "Download the reader extension to unlock the textbook.",
      "lesson": "Free media/download pages often push malware.",
      "legacySource": "old"
    },
    {
      "id": "old-quiz-demo",
      "type": "privacyExit",
      "title": "Exit Personality Quiz",
      "category": "Privacy",
      "difficulty": "easy",
      "command": "EXIT THE DATA-GRAB FORM",
      "directions": "Exit the suspicious form instead of submitting excessive private data.",
      "seconds": 10,
      "headline": "Personality Quiz",
      "body": "Question 1: select gender. Question 2: enter email, phone, address, and card for results.",
      "lesson": "Questionnaires should not need excessive sensitive data.",
      "legacySource": "old"
    },
    {
      "id": "old-quiz-senior",
      "type": "privacyExit",
      "title": "Exit Senior Benefits Survey",
      "category": "Privacy",
      "difficulty": "medium",
      "command": "EXIT THE DATA-GRAB FORM",
      "directions": "Exit the suspicious form instead of submitting excessive private data.",
      "seconds": 10,
      "headline": "Senior Benefits Survey",
      "body": "Enter Medicare number, DOB, email, and address to see eligibility.",
      "lesson": "Questionnaires should not need excessive sensitive data.",
      "legacySource": "old"
    },
    {
      "id": "old-quiz-ai",
      "type": "privacyExit",
      "title": "Exit AI Personality Builder",
      "category": "AI Privacy",
      "difficulty": "medium",
      "command": "EXIT THE DATA-GRAB FORM",
      "directions": "Exit the suspicious form instead of submitting excessive private data.",
      "seconds": 10,
      "headline": "AI Personality Builder",
      "body": "Upload ID and contacts so AI can personalize your future.",
      "lesson": "Questionnaires should not need excessive sensitive data.",
      "legacySource": "old"
    },
    {
      "id": "old-quiz-grocery",
      "type": "privacyExit",
      "title": "Exit Grocery Reward",
      "category": "Grocery Scam",
      "difficulty": "easy",
      "command": "EXIT THE DATA-GRAB FORM",
      "directions": "Exit the suspicious form instead of submitting excessive private data.",
      "seconds": 10,
      "headline": "Grocery Reward",
      "body": "Enter card number to unlock 90% off groceries.",
      "lesson": "Questionnaires should not need excessive sensitive data.",
      "legacySource": "old"
    },
    {
      "id": "old-quiz-univ",
      "type": "privacyExit",
      "title": "Exit Scholarship Eligibility",
      "category": "University Phishing",
      "difficulty": "hard",
      "command": "EXIT THE DATA-GRAB FORM",
      "directions": "Exit the suspicious form instead of submitting excessive private data.",
      "seconds": 8,
      "headline": "Scholarship Eligibility",
      "body": "Enter school password, SSN, and bank info to check eligibility.",
      "lesson": "Questionnaires should not need excessive sensitive data.",
      "legacySource": "old"
    },
    {
      "id": "old-search-bank",
      "type": "searchResultPick",
      "title": "Search Result Minefield",
      "category": "Search Ads",
      "difficulty": "easy",
      "command": "PICK OFFICIAL RESULT",
      "directions": "Find the official bank result, not fake ads.",
      "seconds": 10,
      "options": [
        [
          "Ad \u00b7 bank-login-help.co",
          false
        ],
        [
          "Official bank website",
          true
        ],
        [
          "Bank support fast reset",
          false
        ],
        [
          "Sponsored account fix",
          false
        ]
      ],
      "lesson": "Search ads and lookalike results can lead to scams.",
      "legacySource": "old"
    },
    {
      "id": "old-search-univ",
      "type": "searchResultPick",
      "title": "Campus Search Minefield",
      "category": "University Phishing",
      "difficulty": "medium",
      "command": "PICK OFFICIAL RESULT",
      "directions": "Find the official school portal among fake search results.",
      "seconds": 10,
      "options": [
        [
          "Ad \u00b7 campus-password-reset.net",
          false
        ],
        [
          "Official university portal",
          true
        ],
        [
          "Student aid refund fast",
          false
        ],
        [
          "Login renewal support",
          false
        ]
      ],
      "lesson": "Search ads and lookalike results can lead to scams.",
      "legacySource": "old"
    },
    {
      "id": "old-search-ai",
      "type": "searchResultPick",
      "title": "AI Tool Search Minefield",
      "category": "AI Malware",
      "difficulty": "hard",
      "command": "PICK OFFICIAL RESULT",
      "directions": "Find the official AI tool site, not cracks or unlockers.",
      "seconds": 8,
      "options": [
        [
          "AI Pro Crack",
          false
        ],
        [
          "Official AI product site",
          true
        ],
        [
          "Free premium unlocker",
          false
        ],
        [
          "AI cleaner download",
          false
        ]
      ],
      "lesson": "Search ads and lookalike results can lead to scams.",
      "legacySource": "old"
    },
    {
      "id": "old-search-video",
      "type": "searchResultPick",
      "title": "Video Search Minefield",
      "category": "Streaming Malware",
      "difficulty": "medium",
      "command": "PICK OFFICIAL RESULT",
      "directions": "Find the official streaming app/page.",
      "seconds": 10,
      "options": [
        [
          "Free movie HD player",
          false
        ],
        [
          "Official streaming service",
          true
        ],
        [
          "Codec download mirror",
          false
        ],
        [
          "Unlock all episodes",
          false
        ]
      ],
      "lesson": "Search ads and lookalike results can lead to scams.",
      "legacySource": "old"
    },
    {
      "id": "old-shred-tax",
      "type": "giftCardShredder",
      "title": "Gift Card Shredder: Tax",
      "category": "Phone Scam",
      "difficulty": "easy",
      "command": "DRAG CODE TO SHREDDER",
      "directions": "Drag the gift card code into the shredder, not the send box.",
      "seconds": 11,
      "scenario": "A scammer is asking for a gift card code.",
      "lesson": "Gift card codes should not be sent to callers, bosses, strangers, or online contacts.",
      "legacySource": "old"
    },
    {
      "id": "old-shred-boss",
      "type": "giftCardShredder",
      "title": "Gift Card Shredder: Boss",
      "category": "Business Email",
      "difficulty": "medium",
      "command": "DRAG CODE TO SHREDDER",
      "directions": "Drag the gift card code into the shredder, not the send box.",
      "seconds": 11,
      "scenario": "A scammer is asking for a gift card code.",
      "lesson": "Gift card codes should not be sent to callers, bosses, strangers, or online contacts.",
      "legacySource": "old"
    },
    {
      "id": "old-shred-romance",
      "type": "giftCardShredder",
      "title": "Gift Card Shredder: Romance",
      "category": "Romance Scam",
      "difficulty": "medium",
      "command": "DRAG CODE TO SHREDDER",
      "directions": "Drag the gift card code into the shredder, not the send box.",
      "seconds": 11,
      "scenario": "A scammer is asking for a gift card code.",
      "lesson": "Gift card codes should not be sent to callers, bosses, strangers, or online contacts.",
      "legacySource": "old"
    },
    {
      "id": "old-shred-tech",
      "type": "giftCardShredder",
      "title": "Gift Card Shredder: Tech Support",
      "category": "Tech Support",
      "difficulty": "medium",
      "command": "DRAG CODE TO SHREDDER",
      "directions": "Drag the gift card code into the shredder, not the send box.",
      "seconds": 11,
      "scenario": "A scammer is asking for a gift card code.",
      "lesson": "Gift card codes should not be sent to callers, bosses, strangers, or online contacts.",
      "legacySource": "old"
    },
    {
      "id": "old-shred-game",
      "type": "giftCardShredder",
      "title": "Gift Card Shredder: Game Trade",
      "category": "Gaming Scam",
      "difficulty": "hard",
      "command": "DRAG CODE TO SHREDDER",
      "directions": "Drag the gift card code into the shredder, not the send box.",
      "seconds": 9,
      "scenario": "A scammer is asking for a gift card code.",
      "lesson": "Gift card codes should not be sent to callers, bosses, strangers, or online contacts.",
      "legacySource": "old"
    },
    {
      "id": "old-call-tax",
      "type": "callInterrupt",
      "title": "Interrupt Fake Tax Call",
      "category": "Phone Scam",
      "difficulty": "easy",
      "command": "TAP VERIFY/HANG UP ON PRESSURE",
      "directions": "Tap when the call uses pressure, secrecy, money, codes, or remote access.",
      "seconds": 12,
      "script": "Caller: You owe taxes. Pay with gift cards now. Do not hang up.",
      "lesson": "Interrupt high-pressure calls and verify independently.",
      "legacySource": "old"
    },
    {
      "id": "old-call-family",
      "type": "callInterrupt",
      "title": "Interrupt Family Emergency Call",
      "category": "Family Emergency",
      "difficulty": "medium",
      "command": "TAP VERIFY/HANG UP ON PRESSURE",
      "directions": "Tap when the call uses pressure, secrecy, money, codes, or remote access.",
      "seconds": 12,
      "script": "Caller: It is your grandson. I need money now. Please keep this secret.",
      "lesson": "Interrupt high-pressure calls and verify independently.",
      "legacySource": "old"
    },
    {
      "id": "old-call-tech",
      "type": "callInterrupt",
      "title": "Interrupt Tech Support Call",
      "category": "Tech Support",
      "difficulty": "medium",
      "command": "TAP VERIFY/HANG UP ON PRESSURE",
      "directions": "Tap when the call uses pressure, secrecy, money, codes, or remote access.",
      "seconds": 12,
      "script": "Caller: I am support. Install remote access so I can fix your virus.",
      "lesson": "Interrupt high-pressure calls and verify independently.",
      "legacySource": "old"
    },
    {
      "id": "old-call-bank",
      "type": "callInterrupt",
      "title": "Interrupt Bank Code Call",
      "category": "Bank Phishing",
      "difficulty": "hard",
      "command": "TAP VERIFY/HANG UP ON PRESSURE",
      "directions": "Tap when the call uses pressure, secrecy, money, codes, or remote access.",
      "seconds": 10,
      "script": "Caller: We are your bank. Read the code we sent to stop fraud.",
      "lesson": "Interrupt high-pressure calls and verify independently.",
      "legacySource": "old"
    },
    {
      "id": "old-call-ai",
      "type": "callInterrupt",
      "title": "Interrupt AI Voice Call",
      "category": "AI Voice Scam",
      "difficulty": "hard",
      "command": "TAP VERIFY/HANG UP ON PRESSURE",
      "directions": "Tap when the call uses pressure, secrecy, money, codes, or remote access.",
      "seconds": 10,
      "script": "Voice: It is me. New phone. Send money and do not call my parents.",
      "lesson": "Interrupt high-pressure calls and verify independently.",
      "legacySource": "old"
    },
    {
      "id": "old-dodge-sms",
      "type": "fallingDodge",
      "title": "Text Message Dodge",
      "category": "SMS Reflex",
      "difficulty": "easy",
      "command": "MOVE LEFT / RIGHT",
      "directions": "Use arrows, buttons, touch-drag, or motion mode. Avoid/block scams precisely.",
      "seconds": 12,
      "falling": [
        [
          "Click bank link",
          true
        ],
        [
          "Pay gift card",
          true
        ],
        [
          "Verify official app",
          false
        ],
        [
          "Ask trusted person",
          false
        ],
        [
          "Send code",
          true
        ]
      ],
      "lesson": "Precision matters: avoid scams, keep safe habits.",
      "legacySource": "old"
    },
    {
      "id": "old-dodge-univ",
      "type": "fallingDodge",
      "title": "Campus Phish Rain",
      "category": "University Phishing",
      "difficulty": "medium",
      "command": "MOVE LEFT / RIGHT",
      "directions": "Use arrows, buttons, touch-drag, or motion mode. Avoid/block scams precisely.",
      "seconds": 12,
      "falling": [
        [
          "Password expires link",
          true
        ],
        [
          "Official portal",
          false
        ],
        [
          "Reply with code",
          true
        ],
        [
          "Ask IT official site",
          false
        ]
      ],
      "lesson": "Precision matters: avoid scams, keep safe habits.",
      "legacySource": "old"
    },
    {
      "id": "old-dodge-video",
      "type": "fallingDodge",
      "title": "Codec Trap Rain",
      "category": "Streaming Malware",
      "difficulty": "medium",
      "command": "MOVE LEFT / RIGHT",
      "directions": "Use arrows, buttons, touch-drag, or motion mode. Avoid/block scams precisely.",
      "seconds": 12,
      "falling": [
        [
          "Download codec",
          true
        ],
        [
          "Close tab",
          false
        ],
        [
          "Allow notifications",
          true
        ],
        [
          "Use official app",
          false
        ]
      ],
      "lesson": "Precision matters: avoid scams, keep safe habits.",
      "legacySource": "old"
    },
    {
      "id": "old-shield-inbox",
      "type": "shieldBlock",
      "title": "Shield the Inbox",
      "category": "Email Shield",
      "difficulty": "easy",
      "command": "MOVE LEFT / RIGHT",
      "directions": "Use arrows, buttons, touch-drag, or motion mode. Avoid/block scams precisely.",
      "seconds": 12,
      "falling": [
        [
          "Gift card tax",
          true
        ],
        [
          "Doctor reminder",
          false
        ],
        [
          "Password reset link",
          true
        ],
        [
          "Known family note",
          false
        ],
        [
          "Crypto guarantee",
          true
        ]
      ],
      "lesson": "Precision matters: avoid scams, keep safe habits.",
      "legacySource": "old"
    },
    {
      "id": "old-shield-univ",
      "type": "shieldBlock",
      "title": "Campus Shield",
      "category": "University Phishing",
      "difficulty": "medium",
      "command": "MOVE LEFT / RIGHT",
      "directions": "Use arrows, buttons, touch-drag, or motion mode. Avoid/block scams precisely.",
      "seconds": 12,
      "falling": [
        [
          "Fake login link",
          true
        ],
        [
          "Class reminder",
          false
        ],
        [
          "Code request",
          true
        ],
        [
          "Official portal tip",
          false
        ]
      ],
      "lesson": "Precision matters: avoid scams, keep safe habits.",
      "legacySource": "old"
    },
    {
      "id": "old-match-gift",
      "type": "categoryMatch",
      "title": "Match Gift Card Scam",
      "category": "Scam Topics",
      "difficulty": "easy",
      "command": "MATCH THE SCAM TYPE",
      "directions": "Read the scenario and pick the correct category.",
      "seconds": 12,
      "prompt": "Someone asks for gift cards to pay a tax bill.",
      "answer": "Gift Card Scam",
      "choices": [
        "Gift Card Scam",
        "Romance Scam",
        "Package Scam",
        "Safe Habit"
      ],
      "lesson": "Naming the scam helps you respond safely.",
      "legacySource": "old"
    },
    {
      "id": "old-match-romance",
      "type": "categoryMatch",
      "title": "Match Romance Scam",
      "category": "Romance Scam",
      "difficulty": "easy",
      "command": "MATCH THE SCAM TYPE",
      "directions": "Read the scenario and pick the correct category.",
      "seconds": 12,
      "prompt": "An online partner asks for emergency money and secrecy.",
      "answer": "Romance Scam",
      "choices": [
        "Romance Scam",
        "Tech Support",
        "QR Scam",
        "Charity"
      ],
      "lesson": "Naming the scam helps you respond safely.",
      "legacySource": "old"
    },
    {
      "id": "old-match-deepfake",
      "type": "categoryMatch",
      "title": "Match AI Voice Scam",
      "category": "AI Voice Scam",
      "difficulty": "medium",
      "command": "MATCH THE SCAM TYPE",
      "directions": "Read the scenario and pick the correct category.",
      "seconds": 10,
      "prompt": "A familiar voice asks for urgent money, but the number is unknown.",
      "answer": "AI Voice Scam",
      "choices": [
        "AI Voice Scam",
        "Coupon Scam",
        "Safe Call",
        "Package Scam"
      ],
      "lesson": "Naming the scam helps you respond safely.",
      "legacySource": "old"
    },
    {
      "id": "old-match-univ",
      "type": "categoryMatch",
      "title": "Match Campus Phish",
      "category": "University Phishing",
      "difficulty": "medium",
      "command": "MATCH THE SCAM TYPE",
      "directions": "Read the scenario and pick the correct category.",
      "seconds": 10,
      "prompt": "A school-like email says your password expires and links to a non-school domain.",
      "answer": "University Phishing",
      "choices": [
        "University Phishing",
        "Romance Scam",
        "Safe Reminder",
        "Gift Card Scam"
      ],
      "lesson": "Naming the scam helps you respond safely.",
      "legacySource": "old"
    },
    {
      "id": "old-match-video",
      "type": "categoryMatch",
      "title": "Match Codec Scam",
      "category": "Streaming Malware",
      "difficulty": "medium",
      "command": "MATCH THE SCAM TYPE",
      "directions": "Read the scenario and pick the correct category.",
      "seconds": 10,
      "prompt": "A video page says you need to download a special player.",
      "answer": "Streaming Malware",
      "choices": [
        "Streaming Malware",
        "Charity Scam",
        "Safe Update",
        "Romance Scam"
      ],
      "lesson": "Naming the scam helps you respond safely.",
      "legacySource": "old"
    },
    {
      "id": "old-sort-mixed",
      "type": "sortBasket",
      "title": "Scam Sorter: Mixed",
      "category": "Mixed",
      "difficulty": "medium",
      "command": "SORT FAST",
      "directions": "Sort each item into Safe Habit or Scam Signal.",
      "seconds": 14,
      "items": [
        [
          "Pay taxes with gift cards",
          true
        ],
        [
          "Use official bank app",
          false
        ],
        [
          "Read me your login code",
          true
        ],
        [
          "Call known family number",
          false
        ],
        [
          "Guaranteed crypto returns",
          true
        ],
        [
          "Ask trusted person first",
          false
        ]
      ],
      "lesson": "Safe habits verify; scam signals pressure.",
      "legacySource": "old"
    },
    {
      "id": "old-sort-univ",
      "type": "sortBasket",
      "title": "Scam Sorter: University Phishing",
      "category": "University Phishing",
      "difficulty": "medium",
      "command": "SORT FAST",
      "directions": "Sort each item into Safe Habit or Scam Signal.",
      "seconds": 14,
      "items": [
        [
          "Password reset on official portal",
          false
        ],
        [
          "Reply with code to renew password",
          true
        ],
        [
          "Scholarship asks for school password",
          true
        ],
        [
          "Call official financial aid office",
          false
        ]
      ],
      "lesson": "Safe habits verify; scam signals pressure.",
      "legacySource": "old"
    },
    {
      "id": "old-sort-video",
      "type": "sortBasket",
      "title": "Scam Sorter: Streaming Malware",
      "category": "Streaming Malware",
      "difficulty": "medium",
      "command": "SORT FAST",
      "directions": "Sort each item into Safe Habit or Scam Signal.",
      "seconds": 14,
      "items": [
        [
          "Install HD codec",
          true
        ],
        [
          "Close suspicious site",
          false
        ],
        [
          "Allow notifications to watch",
          true
        ],
        [
          "Use official streaming app",
          false
        ]
      ],
      "lesson": "Safe habits verify; scam signals pressure.",
      "legacySource": "old"
    },
    {
      "id": "old-code-bank",
      "type": "codeShield",
      "title": "Protect Bank Code",
      "category": "2FA Code",
      "difficulty": "medium",
      "command": "PROTECT THE CODE",
      "directions": "Choose the action that keeps the private code safe.",
      "seconds": 10,
      "code": "482-119",
      "requester": "Caller says: read me the code we texted you.",
      "options": [
        [
          "Read code out loud",
          false
        ],
        [
          "Text screenshot",
          false
        ],
        [
          "Do not share; verify officially",
          true
        ],
        [
          "Enter it into unknown link",
          false
        ]
      ],
      "lesson": "One-time codes unlock accounts and should not be shared.",
      "legacySource": "old"
    },
    {
      "id": "old-code-univ",
      "type": "codeShield",
      "title": "Protect Campus Code",
      "category": "University Phishing",
      "difficulty": "medium",
      "command": "PROTECT THE CODE",
      "directions": "Choose the action that keeps the private code safe.",
      "seconds": 10,
      "code": "913-744",
      "requester": "Fake campus IT says: send your login code.",
      "options": [
        [
          "Read code out loud",
          false
        ],
        [
          "Text screenshot",
          false
        ],
        [
          "Do not share; verify officially",
          true
        ],
        [
          "Enter it into unknown link",
          false
        ]
      ],
      "lesson": "One-time codes unlock accounts and should not be shared.",
      "legacySource": "old"
    },
    {
      "id": "old-code-delivery",
      "type": "codeShield",
      "title": "Delivery Code Trap",
      "category": "Package Scam",
      "difficulty": "medium",
      "command": "PROTECT THE CODE",
      "directions": "Choose the action that keeps the private code safe.",
      "seconds": 10,
      "code": "205-881",
      "requester": "Delivery agent says: read me the code to release package.",
      "options": [
        [
          "Read code out loud",
          false
        ],
        [
          "Text screenshot",
          false
        ],
        [
          "Do not share; verify officially",
          true
        ],
        [
          "Enter it into unknown link",
          false
        ]
      ],
      "lesson": "One-time codes unlock accounts and should not be shared.",
      "legacySource": "old"
    },
    {
      "id": "old-boss-ultimate",
      "type": "legacyBossRush",
      "title": "Legacy Final Boss: Fraudster Multiverse",
      "category": "Boss",
      "difficulty": "boss",
      "command": "CHAIN MULTIPLE SKILLS",
      "directions": "Beat the Fraudster through red-flag spotting, verification, money control, and safe-source choices.",
      "seconds": 38,
      "phases": [
        {
          "mini": "tap",
          "prompt": "Tap 3 strongest tricks.",
          "message": "It sounds like your grandson. I need $2,000 right now. Do not call anyone. Use this payment link.",
          "chips": [
            [
              "sounds like your grandson",
              true
            ],
            [
              "$2,000 right now",
              true
            ],
            [
              "Do not call anyone",
              true
            ],
            [
              "payment link",
              true
            ],
            [
              "grandson",
              false
            ]
          ],
          "needed": 3
        },
        {
          "mini": "choose",
          "prompt": "What defeats the voice clone?",
          "options": [
            [
              "Send money immediately",
              false
            ],
            [
              "Call known family number and verify",
              true
            ],
            [
              "Keep it secret",
              false
            ],
            [
              "Ask for another payment link",
              false
            ]
          ]
        },
        {
          "mini": "money",
          "prompt": "How much should you send before verifying?",
          "targetAmount": 0
        },
        {
          "mini": "choose",
          "prompt": "The Fraudster opens a fake video download. What now?",
          "options": [
            [
              "Install codec",
              false
            ],
            [
              "Close tab and stop download",
              true
            ],
            [
              "Allow notifications",
              false
            ],
            [
              "Enter card for HD",
              false
            ]
          ]
        },
        {
          "mini": "choose",
          "prompt": "Which FraudFront power move wins?",
          "options": [
            [
              "Freeze Pressure + Verify Source",
              true
            ],
            [
              "Trust the voice",
              false
            ],
            [
              "Share verification code",
              false
            ],
            [
              "Pay with gift cards",
              false
            ]
          ]
        }
      ],
      "lesson": "The boss combines AI voice, secrecy, urgency, payment pressure, fake downloads, and link traps.",
      "legacySource": "old"
    },
    {
      "id": "old-vault-bank",
      "type": "passwordVaultDrag",
      "title": "Password Vault: Fake Bank Form",
      "category": "Credential Safety",
      "difficulty": "easy",
      "command": "DRAG PASSWORD \u2192 VAULT",
      "directions": "Drag the password into the vault, not the fake form.",
      "seconds": 11,
      "scenario": "A fake bank form is asking for your saved password.",
      "lesson": "Passwords belong in a password manager, not surprise forms.",
      "legacySource": "old"
    },
    {
      "id": "old-vault-school",
      "type": "passwordVaultDrag",
      "title": "Password Vault: University Login",
      "category": "University Phishing",
      "difficulty": "medium",
      "command": "DRAG PASSWORD \u2192 VAULT",
      "directions": "Drag the password into the vault, not the fake form.",
      "seconds": 11,
      "scenario": "A university-looking page says your password expires today.",
      "lesson": "Open the official university portal separately.",
      "legacySource": "old"
    },
    {
      "id": "old-vault-ai",
      "type": "passwordVaultDrag",
      "title": "Password Vault: AI Tool Login",
      "category": "AI Scam",
      "difficulty": "medium",
      "command": "DRAG PASSWORD \u2192 VAULT",
      "directions": "Drag the password into the vault, not the fake form.",
      "seconds": 11,
      "scenario": "A free AI tool says it needs your email password to personalize results.",
      "lesson": "AI tools should not ask for your email password.",
      "legacySource": "old"
    },
    {
      "id": "old-vault-game",
      "type": "passwordVaultDrag",
      "title": "Password Vault: Game Account",
      "category": "Gaming Scam",
      "difficulty": "hard",
      "command": "DRAG PASSWORD \u2192 VAULT",
      "directions": "Drag the password into the vault, not the fake form.",
      "seconds": 9,
      "scenario": "A free-skin page asks for your game login password.",
      "lesson": "Free rewards that ask for passwords are account-theft traps.",
      "legacySource": "old"
    },
    {
      "id": "old-vault-work",
      "type": "passwordVaultDrag",
      "title": "Password Vault: Work Portal",
      "category": "Business Email",
      "difficulty": "hard",
      "command": "DRAG PASSWORD \u2192 VAULT",
      "directions": "Drag the password into the vault, not the fake form.",
      "seconds": 9,
      "scenario": "A work portal clone asks for your password after an urgent email.",
      "lesson": "Work login pages should be verified through official company routes.",
      "legacySource": "old"
    },
    {
      "id": "old-deepfake-family",
      "type": "deepfakeSpot",
      "title": "Deepfake Call Spotter",
      "category": "AI Voice Scam",
      "difficulty": "medium",
      "command": "SPOT AI / IMPERSONATION CLUES",
      "directions": "Select the suspicious AI or impersonation clues.",
      "seconds": 12,
      "scenario": "A video call shows a relative asking for urgent money.",
      "flags": [
        [
          "Unknown number",
          true
        ],
        [
          "Urgent money request",
          true
        ],
        [
          "Refuses normal call-back",
          true
        ],
        [
          "Normal greeting",
          false
        ],
        [
          "Secrecy pressure",
          true
        ]
      ],
      "needed": 3,
      "lesson": "AI voice/video can support a scam, but independent verification still matters.",
      "legacySource": "old"
    },
    {
      "id": "old-deepfake-boss",
      "type": "deepfakeSpot",
      "title": "Fake Boss Video",
      "category": "Business Email",
      "difficulty": "hard",
      "command": "SPOT AI / IMPERSONATION CLUES",
      "directions": "Select the suspicious AI or impersonation clues.",
      "seconds": 10,
      "scenario": "A video message from a boss asks for confidential gift cards.",
      "flags": [
        [
          "Gift-card payment",
          true
        ],
        [
          "Confidential request",
          true
        ],
        [
          "No finance approval",
          true
        ],
        [
          "Company logo",
          false
        ],
        [
          "Urgent deadline",
          true
        ]
      ],
      "needed": 3,
      "lesson": "AI voice/video can support a scam, but independent verification still matters.",
      "legacySource": "old"
    },
    {
      "id": "old-deepfake-bank",
      "type": "deepfakeSpot",
      "title": "AI Bank Agent",
      "category": "AI Scam",
      "difficulty": "medium",
      "command": "SPOT AI / IMPERSONATION CLUES",
      "directions": "Select the suspicious AI or impersonation clues.",
      "seconds": 12,
      "scenario": "An AI-looking agent claims your account is locked.",
      "flags": [
        [
          "Asks for one-time code",
          true
        ],
        [
          "Unknown link",
          true
        ],
        [
          "Pressure timer",
          true
        ],
        [
          "Bank colors",
          false
        ],
        [
          "Official app opened by you",
          false
        ]
      ],
      "needed": 3,
      "lesson": "AI voice/video can support a scam, but independent verification still matters.",
      "legacySource": "old"
    },
    {
      "id": "old-deepfake-romance",
      "type": "deepfakeSpot",
      "title": "Romance Video Proof",
      "category": "Romance Scam",
      "difficulty": "hard",
      "command": "SPOT AI / IMPERSONATION CLUES",
      "directions": "Select the suspicious AI or impersonation clues.",
      "seconds": 10,
      "scenario": "A video clip is used as proof of identity before asking for money.",
      "flags": [
        [
          "Money request",
          true
        ],
        [
          "Won\u2019t live video chat",
          true
        ],
        [
          "Secrecy",
          true
        ],
        [
          "Profile picture",
          false
        ],
        [
          "Emergency story",
          true
        ]
      ],
      "needed": 3,
      "lesson": "AI voice/video can support a scam, but independent verification still matters.",
      "legacySource": "old"
    },
    {
      "id": "old-deepfake-charity",
      "type": "deepfakeSpot",
      "title": "Fake Celebrity Charity",
      "category": "Charity Scam",
      "difficulty": "medium",
      "command": "SPOT AI / IMPERSONATION CLUES",
      "directions": "Select the suspicious AI or impersonation clues.",
      "seconds": 12,
      "scenario": "A celebrity video asks for fast disaster donations through a QR code.",
      "flags": [
        [
          "Countdown timer",
          true
        ],
        [
          "Unknown QR destination",
          true
        ],
        [
          "No independent charity lookup",
          true
        ],
        [
          "Cause is meaningful",
          false
        ],
        [
          "Gift-card donation",
          true
        ]
      ],
      "needed": 3,
      "lesson": "AI voice/video can support a scam, but independent verification still matters.",
      "legacySource": "old"
    },
    {
      "id": "old-statement-micro",
      "type": "bankStatementHunt",
      "title": "Statement Hunt: Micro Charges",
      "category": "Bank Safety",
      "difficulty": "easy",
      "command": "FIND SUSPICIOUS CHARGES",
      "directions": "Select suspicious transactions, then report them.",
      "seconds": 12,
      "transactions": [
        [
          "Coffee Shop",
          "$4.80",
          false
        ],
        [
          "Streaming Service",
          "$9.99",
          false
        ],
        [
          "Card Verify Fee",
          "$1.00",
          true
        ],
        [
          "Unknown Wallet Test",
          "$0.99",
          true
        ]
      ],
      "needed": 2,
      "lesson": "Small or unfamiliar charges can be early warning signs of fraud.",
      "legacySource": "old"
    },
    {
      "id": "old-statement-refund",
      "type": "bankStatementHunt",
      "title": "Statement Hunt: Fake Refund",
      "category": "Refund Scam",
      "difficulty": "medium",
      "command": "FIND SUSPICIOUS CHARGES",
      "directions": "Select suspicious transactions, then report them.",
      "seconds": 12,
      "transactions": [
        [
          "Known Grocery",
          "$43.21",
          false
        ],
        [
          "Refund Processing Fee",
          "$49.99",
          true
        ],
        [
          "Utility Bill",
          "$82.10",
          false
        ],
        [
          "Remote Support Tool",
          "$19.99",
          true
        ]
      ],
      "needed": 2,
      "lesson": "Small or unfamiliar charges can be early warning signs of fraud.",
      "legacySource": "old"
    },
    {
      "id": "old-statement-subscription",
      "type": "bankStatementHunt",
      "title": "Statement Hunt: Sneaky Subscription",
      "category": "Subscription Scam",
      "difficulty": "medium",
      "command": "FIND SUSPICIOUS CHARGES",
      "directions": "Select suspicious transactions, then report them.",
      "seconds": 12,
      "transactions": [
        [
          "Gym",
          "$25.00",
          false
        ],
        [
          "Prize Club Trial",
          "$29.99",
          true
        ],
        [
          "Unknown AI Cleaner",
          "$14.99",
          true
        ],
        [
          "Phone Bill",
          "$61.33",
          false
        ]
      ],
      "needed": 2,
      "lesson": "Small or unfamiliar charges can be early warning signs of fraud.",
      "legacySource": "old"
    },
    {
      "id": "old-statement-travel",
      "type": "bankStatementHunt",
      "title": "Statement Hunt: Travel Scam",
      "category": "Travel Scam",
      "difficulty": "medium",
      "command": "FIND SUSPICIOUS CHARGES",
      "directions": "Select suspicious transactions, then report them.",
      "seconds": 12,
      "transactions": [
        [
          "Airline",
          "$310.00",
          false
        ],
        [
          "Visa Fast Fee",
          "$199.00",
          true
        ],
        [
          "Hotel",
          "$122.40",
          false
        ],
        [
          "Booking Support Call",
          "$79.00",
          true
        ]
      ],
      "needed": 2,
      "lesson": "Small or unfamiliar charges can be early warning signs of fraud.",
      "legacySource": "old"
    },
    {
      "id": "old-statement-business",
      "type": "bankStatementHunt",
      "title": "Statement Hunt: Business Card",
      "category": "Business Email",
      "difficulty": "hard",
      "command": "FIND SUSPICIOUS CHARGES",
      "directions": "Select suspicious transactions, then report them.",
      "seconds": 10,
      "transactions": [
        [
          "Approved SaaS",
          "$40.00",
          false
        ],
        [
          "Gift Card Bulk",
          "$500.00",
          true
        ],
        [
          "Vendor Wire Test",
          "$1.00",
          true
        ],
        [
          "Team Lunch",
          "$52.00",
          false
        ]
      ],
      "needed": 2,
      "lesson": "Small or unfamiliar charges can be early warning signs of fraud.",
      "legacySource": "old"
    },
    {
      "id": "old-social-grandchild",
      "type": "socialFirewall",
      "title": "Social Firewall: Fake Grandchild",
      "category": "Impersonation",
      "difficulty": "easy",
      "command": "BLOCK FAKE PROFILES",
      "directions": "Block/report fake profiles; accept or ignore normal ones.",
      "seconds": 13,
      "profiles": [
        [
          "Known cousin with normal history",
          false
        ],
        [
          "New profile using grandchild photo asking for money",
          true
        ],
        [
          "Old friend sharing vacation photo",
          false
        ]
      ],
      "lesson": "Impersonation accounts use familiar photos, urgency, secrecy, or money requests.",
      "legacySource": "old"
    },
    {
      "id": "old-social-celebrity",
      "type": "socialFirewall",
      "title": "Social Firewall: Fake Celebrity",
      "category": "Romance Scam",
      "difficulty": "medium",
      "command": "BLOCK FAKE PROFILES",
      "directions": "Block/report fake profiles; accept or ignore normal ones.",
      "seconds": 13,
      "profiles": [
        [
          "Celebrity asks for gift cards",
          true
        ],
        [
          "Local club page posting event info",
          false
        ],
        [
          "New stranger says keep our chat private",
          true
        ]
      ],
      "lesson": "Impersonation accounts use familiar photos, urgency, secrecy, or money requests.",
      "legacySource": "old"
    },
    {
      "id": "old-social-market",
      "type": "socialFirewall",
      "title": "Social Firewall: Marketplace DM",
      "category": "Marketplace Scam",
      "difficulty": "medium",
      "command": "BLOCK FAKE PROFILES",
      "directions": "Block/report fake profiles; accept or ignore normal ones.",
      "seconds": 13,
      "profiles": [
        [
          "Buyer asks to move off platform and overpay",
          true
        ],
        [
          "Neighbor asks pickup time",
          false
        ],
        [
          "Buyer asks for bank login to prove payment",
          true
        ]
      ],
      "lesson": "Impersonation accounts use familiar photos, urgency, secrecy, or money requests.",
      "legacySource": "old"
    },
    {
      "id": "old-social-ai",
      "type": "socialFirewall",
      "title": "Social Firewall: AI Bot Friend",
      "category": "AI Scam",
      "difficulty": "hard",
      "command": "BLOCK FAKE PROFILES",
      "directions": "Block/report fake profiles; accept or ignore normal ones.",
      "seconds": 11,
      "profiles": [
        [
          "AI coach asks to connect bank",
          true
        ],
        [
          "Friend sends normal meme",
          false
        ],
        [
          "Bot asks to install AI unlocker",
          true
        ]
      ],
      "lesson": "Impersonation accounts use familiar photos, urgency, secrecy, or money requests.",
      "legacySource": "old"
    },
    {
      "id": "old-social-school",
      "type": "socialFirewall",
      "title": "Social Firewall: University Impersonator",
      "category": "University Phishing",
      "difficulty": "medium",
      "command": "BLOCK FAKE PROFILES",
      "directions": "Block/report fake profiles; accept or ignore normal ones.",
      "seconds": 13,
      "profiles": [
        [
          "Official club page",
          false
        ],
        [
          "Fake student aid page asks for password",
          true
        ],
        [
          "Scholarship bot asks for SSN",
          true
        ]
      ],
      "lesson": "Impersonation accounts use familiar photos, urgency, secrecy, or money requests.",
      "legacySource": "old"
    },
    {
      "id": "old-cart-grocery",
      "type": "shoppingCartAudit",
      "title": "Checkout Audit: Grocery Deal",
      "category": "Shopping Scam",
      "difficulty": "easy",
      "command": "REMOVE SCAM CHARGES",
      "directions": "Select hidden scam charges, then remove them.",
      "seconds": 13,
      "items": [
        [
          "Grocery items",
          "$34.20",
          false
        ],
        [
          "Prize activation fee",
          "$4.99",
          true
        ],
        [
          "Delivery fee",
          "$3.50",
          false
        ]
      ],
      "needed": 1,
      "lesson": "Hidden fees, unlock charges, and pay-first job costs can signal scams.",
      "legacySource": "old"
    },
    {
      "id": "old-cart-video",
      "type": "shoppingCartAudit",
      "title": "Checkout Audit: Streaming Page",
      "category": "Streaming Malware",
      "difficulty": "medium",
      "command": "REMOVE SCAM CHARGES",
      "directions": "Select hidden scam charges, then remove them.",
      "seconds": 13,
      "items": [
        [
          "Movie rental",
          "$0.00",
          false
        ],
        [
          "HD codec access",
          "$12.99",
          true
        ],
        [
          "Notification unlock",
          "$3.99",
          true
        ]
      ],
      "needed": 2,
      "lesson": "Hidden fees, unlock charges, and pay-first job costs can signal scams.",
      "legacySource": "old"
    },
    {
      "id": "old-cart-job",
      "type": "shoppingCartAudit",
      "title": "Checkout Audit: Job Equipment",
      "category": "Job Scam",
      "difficulty": "medium",
      "command": "REMOVE SCAM CHARGES",
      "directions": "Select hidden scam charges, then remove them.",
      "seconds": 13,
      "items": [
        [
          "Application",
          "$0.00",
          false
        ],
        [
          "Equipment processing fee",
          "$89.00",
          true
        ],
        [
          "Background crypto fee",
          "$49.00",
          true
        ]
      ],
      "needed": 2,
      "lesson": "Hidden fees, unlock charges, and pay-first job costs can signal scams.",
      "legacySource": "old"
    },
    {
      "id": "old-cart-ai",
      "type": "shoppingCartAudit",
      "title": "Checkout Audit: AI Unlocker",
      "category": "AI Malware",
      "difficulty": "hard",
      "command": "REMOVE SCAM CHARGES",
      "directions": "Select hidden scam charges, then remove them.",
      "seconds": 11,
      "items": [
        [
          "Prompt pack PDF",
          "$5.00",
          false
        ],
        [
          "AI pro crack",
          "$19.99",
          true
        ],
        [
          "Security bypass fee",
          "$9.99",
          true
        ]
      ],
      "needed": 2,
      "lesson": "Hidden fees, unlock charges, and pay-first job costs can signal scams.",
      "legacySource": "old"
    },
    {
      "id": "old-cart-travel",
      "type": "shoppingCartAudit",
      "title": "Checkout Audit: Travel Deal",
      "category": "Travel Scam",
      "difficulty": "hard",
      "command": "REMOVE SCAM CHARGES",
      "directions": "Select hidden scam charges, then remove them.",
      "seconds": 11,
      "items": [
        [
          "Hotel reservation",
          "$120.00",
          false
        ],
        [
          "Visa fast-pass guarantee",
          "$199.00",
          true
        ],
        [
          "Support call unlock",
          "$29.00",
          true
        ]
      ],
      "needed": 2,
      "lesson": "Hidden fees, unlock charges, and pay-first job costs can signal scams.",
      "legacySource": "old"
    },
    {
      "id": "old-ext-coupon",
      "type": "extensionAudit",
      "title": "Extension Audit: Coupon Helper",
      "category": "Browser Extension",
      "difficulty": "easy",
      "command": "UNINSTALL RISKY EXTENSIONS",
      "directions": "Select risky extensions, then uninstall them.",
      "seconds": 12,
      "extensions": [
        [
          "Trusted password manager",
          false
        ],
        [
          "Coupon Finder Pro - reads all sites",
          true
        ],
        [
          "PDF viewer from known source",
          false
        ]
      ],
      "needed": 1,
      "lesson": "Browser extensions with broad permissions can create privacy and security risk.",
      "legacySource": "old"
    },
    {
      "id": "old-ext-ai",
      "type": "extensionAudit",
      "title": "Extension Audit: AI Search Hijacker",
      "category": "AI Malware",
      "difficulty": "medium",
      "command": "UNINSTALL RISKY EXTENSIONS",
      "directions": "Select risky extensions, then uninstall them.",
      "seconds": 12,
      "extensions": [
        [
          "AI Search Boost - changes search engine",
          true
        ],
        [
          "Known accessibility tool",
          false
        ],
        [
          "AI Cleaner Toolbar",
          true
        ]
      ],
      "needed": 2,
      "lesson": "Browser extensions with broad permissions can create privacy and security risk.",
      "legacySource": "old"
    },
    {
      "id": "old-ext-video",
      "type": "extensionAudit",
      "title": "Extension Audit: Video Player",
      "category": "Streaming Malware",
      "difficulty": "medium",
      "command": "UNINSTALL RISKY EXTENSIONS",
      "directions": "Select risky extensions, then uninstall them.",
      "seconds": 12,
      "extensions": [
        [
          "HD Video Unlocker",
          true
        ],
        [
          "Grammar helper from known store",
          false
        ],
        [
          "Codec Toolbar",
          true
        ]
      ],
      "needed": 2,
      "lesson": "Browser extensions with broad permissions can create privacy and security risk.",
      "legacySource": "old"
    },
    {
      "id": "old-ext-crypto",
      "type": "extensionAudit",
      "title": "Extension Audit: Wallet Helper",
      "category": "Crypto Scam",
      "difficulty": "hard",
      "command": "UNINSTALL RISKY EXTENSIONS",
      "directions": "Select risky extensions, then uninstall them.",
      "seconds": 10,
      "extensions": [
        [
          "Wallet Backup Exporter",
          true
        ],
        [
          "Official wallet extension",
          false
        ],
        [
          "Clipboard Wallet Fixer",
          true
        ]
      ],
      "needed": 2,
      "lesson": "Browser extensions with broad permissions can create privacy and security risk.",
      "legacySource": "old"
    },
    {
      "id": "old-ext-school",
      "type": "extensionAudit",
      "title": "Extension Audit: Study Tool",
      "category": "University Phishing",
      "difficulty": "medium",
      "command": "UNINSTALL RISKY EXTENSIONS",
      "directions": "Select risky extensions, then uninstall them.",
      "seconds": 12,
      "extensions": [
        [
          "Official note-taking extension",
          false
        ],
        [
          "Scholarship Finder asks for passwords",
          true
        ],
        [
          "Campus Login Helper unknown",
          true
        ]
      ],
      "needed": 2,
      "lesson": "Browser extensions with broad permissions can create privacy and security risk.",
      "legacySource": "old"
    },
    {
      "id": "old-wifi-cafe",
      "type": "wifiHotspotChoice",
      "title": "Wi-Fi Choice: Coffee Shop",
      "category": "Network Safety",
      "difficulty": "easy",
      "command": "CHOOSE SAFE WI-FI",
      "directions": "Choose the safest available network.",
      "seconds": 10,
      "networks": [
        [
          "CafeGuest",
          true
        ],
        [
          "Free_Cafe_Prize_Login",
          false
        ],
        [
          "BankSecureFree",
          false
        ]
      ],
      "lesson": "Fake hotspots can imitate trusted places and capture logins.",
      "legacySource": "old"
    },
    {
      "id": "old-wifi-airport",
      "type": "wifiHotspotChoice",
      "title": "Wi-Fi Choice: Airport",
      "category": "Network Safety",
      "difficulty": "medium",
      "command": "CHOOSE SAFE WI-FI",
      "directions": "Choose the safest available network.",
      "seconds": 10,
      "networks": [
        [
          "Airport Official WiFi",
          true
        ],
        [
          "FreeAirportVIP-CardRequired",
          false
        ],
        [
          "Security_Update_Network",
          false
        ]
      ],
      "lesson": "Fake hotspots can imitate trusted places and capture logins.",
      "legacySource": "old"
    },
    {
      "id": "old-wifi-hotel",
      "type": "wifiHotspotChoice",
      "title": "Wi-Fi Choice: Hotel",
      "category": "Travel Scam",
      "difficulty": "medium",
      "command": "CHOOSE SAFE WI-FI",
      "directions": "Choose the safest available network.",
      "seconds": 10,
      "networks": [
        [
          "HotelGuest",
          true
        ],
        [
          "Hotel-Room-Refund",
          false
        ],
        [
          "FreePremiumInternet-LoginBank",
          false
        ]
      ],
      "lesson": "Fake hotspots can imitate trusted places and capture logins.",
      "legacySource": "old"
    },
    {
      "id": "old-wifi-campus",
      "type": "wifiHotspotChoice",
      "title": "Wi-Fi Choice: University",
      "category": "University Phishing",
      "difficulty": "medium",
      "command": "CHOOSE SAFE WI-FI",
      "directions": "Choose the safest available network.",
      "seconds": 10,
      "networks": [
        [
          "Official campus WiFi",
          true
        ],
        [
          "CampusPasswordReset",
          false
        ],
        [
          "FreeStudentAidWiFi",
          false
        ]
      ],
      "lesson": "Fake hotspots can imitate trusted places and capture logins.",
      "legacySource": "old"
    },
    {
      "id": "old-wifi-event",
      "type": "wifiHotspotChoice",
      "title": "Wi-Fi Choice: Public Event",
      "category": "Network Safety",
      "difficulty": "hard",
      "command": "CHOOSE SAFE WI-FI",
      "directions": "Choose the safest available network.",
      "seconds": 8,
      "networks": [
        [
          "Venue Official Guest",
          true
        ],
        [
          "PrizeWinnerWiFi",
          false
        ],
        [
          "CryptoAirdropHotspot",
          false
        ]
      ],
      "lesson": "Fake hotspots can imitate trusted places and capture logins.",
      "legacySource": "old"
    },
    {
      "id": "old-order-family",
      "type": "familyCallOrder",
      "title": "Family Call Tree",
      "category": "Family Emergency",
      "difficulty": "easy",
      "command": "CLICK STEPS IN ORDER",
      "directions": "Click the safety steps in the correct order.",
      "seconds": 14,
      "steps": [
        "Pause",
        "Call saved number",
        "Ask family safety question",
        "Send no money until verified"
      ],
      "lesson": "A clear verification order prevents panic decisions.",
      "legacySource": "old"
    },
    {
      "id": "old-order-bank",
      "type": "familyCallOrder",
      "title": "Bank Verification Order",
      "category": "Bank Phishing",
      "difficulty": "medium",
      "command": "CLICK STEPS IN ORDER",
      "directions": "Click the safety steps in the correct order.",
      "seconds": 14,
      "steps": [
        "Do not click link",
        "Open official app",
        "Check account directly",
        "Report message"
      ],
      "lesson": "A clear verification order prevents panic decisions.",
      "legacySource": "old"
    },
    {
      "id": "old-order-job",
      "type": "familyCallOrder",
      "title": "Job Verification Order",
      "category": "Job Scam",
      "difficulty": "medium",
      "command": "CLICK STEPS IN ORDER",
      "directions": "Click the safety steps in the correct order.",
      "seconds": 14,
      "steps": [
        "Do not pay fee",
        "Find official company site",
        "Contact real HR channel",
        "Report fake recruiter"
      ],
      "lesson": "A clear verification order prevents panic decisions.",
      "legacySource": "old"
    },
    {
      "id": "old-order-university",
      "type": "familyCallOrder",
      "title": "University Login Order",
      "category": "University Phishing",
      "difficulty": "medium",
      "command": "CLICK STEPS IN ORDER",
      "directions": "Click the safety steps in the correct order.",
      "seconds": 14,
      "steps": [
        "Do not use email link",
        "Open official portal",
        "Change password if needed",
        "Report phishing"
      ],
      "lesson": "A clear verification order prevents panic decisions.",
      "legacySource": "old"
    },
    {
      "id": "old-order-ai",
      "type": "familyCallOrder",
      "title": "AI Voice Verification Order",
      "category": "AI Voice Scam",
      "difficulty": "hard",
      "command": "CLICK STEPS IN ORDER",
      "directions": "Click the safety steps in the correct order.",
      "seconds": 11,
      "steps": [
        "Pause the call",
        "Call known contact",
        "Ask safety question",
        "Send no money"
      ],
      "lesson": "A clear verification order prevents panic decisions.",
      "legacySource": "old"
    },
    {
      "id": "old-toggle-coupon",
      "type": "permissionsToggle",
      "title": "Permission Switchboard: Coupon Site",
      "category": "Privacy",
      "difficulty": "easy",
      "command": "TOGGLE OFF RISKY PERMISSIONS",
      "directions": "Select risky permissions to turn them off.",
      "seconds": 13,
      "permissions": [
        [
          "Notifications",
          true
        ],
        [
          "Location",
          true
        ],
        [
          "Camera",
          false
        ],
        [
          "Microphone",
          false
        ]
      ],
      "needed": 2,
      "lesson": "Permissions can expose data even when a page looks harmless.",
      "legacySource": "old"
    },
    {
      "id": "old-toggle-ai",
      "type": "permissionsToggle",
      "title": "Permission Switchboard: AI Tool",
      "category": "AI Privacy",
      "difficulty": "medium",
      "command": "TOGGLE OFF RISKY PERMISSIONS",
      "directions": "Select risky permissions to turn them off.",
      "seconds": 13,
      "permissions": [
        [
          "Clipboard",
          true
        ],
        [
          "Contacts",
          true
        ],
        [
          "Theme",
          false
        ],
        [
          "Notifications",
          true
        ]
      ],
      "needed": 3,
      "lesson": "Permissions can expose data even when a page looks harmless.",
      "legacySource": "old"
    },
    {
      "id": "old-toggle-video",
      "type": "permissionsToggle",
      "title": "Permission Switchboard: Video Site",
      "category": "Streaming Malware",
      "difficulty": "medium",
      "command": "TOGGLE OFF RISKY PERMISSIONS",
      "directions": "Select risky permissions to turn them off.",
      "seconds": 13,
      "permissions": [
        [
          "Notifications",
          true
        ],
        [
          "Install extension",
          true
        ],
        [
          "Full screen",
          false
        ],
        [
          "Camera",
          true
        ]
      ],
      "needed": 3,
      "lesson": "Permissions can expose data even when a page looks harmless.",
      "legacySource": "old"
    },
    {
      "id": "old-toggle-school",
      "type": "permissionsToggle",
      "title": "Permission Switchboard: Campus Portal Clone",
      "category": "University Phishing",
      "difficulty": "hard",
      "command": "TOGGLE OFF RISKY PERMISSIONS",
      "directions": "Select risky permissions to turn them off.",
      "seconds": 10,
      "permissions": [
        [
          "Password autofill",
          true
        ],
        [
          "Clipboard",
          true
        ],
        [
          "Notifications",
          true
        ],
        [
          "Dark mode",
          false
        ]
      ],
      "needed": 3,
      "lesson": "Permissions can expose data even when a page looks harmless.",
      "legacySource": "old"
    },
    {
      "id": "old-toggle-wallet",
      "type": "permissionsToggle",
      "title": "Permission Switchboard: Crypto Wallet",
      "category": "Crypto Scam",
      "difficulty": "hard",
      "command": "TOGGLE OFF RISKY PERMISSIONS",
      "directions": "Select risky permissions to turn them off.",
      "seconds": 10,
      "permissions": [
        [
          "Read clipboard",
          true
        ],
        [
          "Export seed phrase",
          true
        ],
        [
          "View balance",
          false
        ],
        [
          "Connect unknown site",
          true
        ]
      ],
      "needed": 3,
      "lesson": "Permissions can expose data even when a page looks harmless.",
      "legacySource": "old"
    },
    {
      "id": "old-recovery-bank",
      "type": "recoveryKeyPuzzle",
      "title": "Recovery Key Puzzle: Bank",
      "category": "Account Recovery",
      "difficulty": "easy",
      "command": "PROTECT RECOVERY CODES",
      "directions": "Choose the recovery-code-safe move.",
      "seconds": 10,
      "scenario": "A caller asks for your recovery key to stop fraud.",
      "options": [
        [
          "Read recovery key",
          false
        ],
        [
          "Store it safely and call official support",
          true
        ],
        [
          "Text screenshot",
          false
        ],
        [
          "Enter unknown link",
          false
        ]
      ],
      "lesson": "Recovery keys and backup codes can unlock accounts and must stay private.",
      "legacySource": "old"
    },
    {
      "id": "old-recovery-email",
      "type": "recoveryKeyPuzzle",
      "title": "Recovery Key Puzzle: Email",
      "category": "Account Takeover",
      "difficulty": "medium",
      "command": "PROTECT RECOVERY CODES",
      "directions": "Choose the recovery-code-safe move.",
      "seconds": 10,
      "scenario": "A friend says they need your backup code to recover their account.",
      "options": [
        [
          "Send backup code",
          false
        ],
        [
          "Contact friend another way",
          true
        ],
        [
          "Post code in chat",
          false
        ],
        [
          "Enter fake form",
          false
        ]
      ],
      "lesson": "Recovery keys and backup codes can unlock accounts and must stay private.",
      "legacySource": "old"
    },
    {
      "id": "old-recovery-wallet",
      "type": "recoveryKeyPuzzle",
      "title": "Recovery Key Puzzle: Wallet",
      "category": "Crypto Scam",
      "difficulty": "hard",
      "command": "PROTECT RECOVERY CODES",
      "directions": "Choose the recovery-code-safe move.",
      "seconds": 8,
      "scenario": "A wallet support page asks for your seed phrase to fix a balance issue.",
      "options": [
        [
          "Type seed phrase",
          false
        ],
        [
          "Leave and use official support docs",
          true
        ],
        [
          "Send phrase to agent",
          false
        ],
        [
          "Connect wallet",
          false
        ]
      ],
      "lesson": "Recovery keys and backup codes can unlock accounts and must stay private.",
      "legacySource": "old"
    },
    {
      "id": "old-recovery-school",
      "type": "recoveryKeyPuzzle",
      "title": "Recovery Key Puzzle: University",
      "category": "University Phishing",
      "difficulty": "medium",
      "command": "PROTECT RECOVERY CODES",
      "directions": "Choose the recovery-code-safe move.",
      "seconds": 10,
      "scenario": "A fake portal asks for a backup code to renew your password.",
      "options": [
        [
          "Enter backup code",
          false
        ],
        [
          "Open official portal separately",
          true
        ],
        [
          "Reply by email",
          false
        ],
        [
          "Share screenshot",
          false
        ]
      ],
      "lesson": "Recovery keys and backup codes can unlock accounts and must stay private.",
      "legacySource": "old"
    },
    {
      "id": "old-recovery-work",
      "type": "recoveryKeyPuzzle",
      "title": "Recovery Key Puzzle: Work",
      "category": "Business Email",
      "difficulty": "hard",
      "command": "PROTECT RECOVERY CODES",
      "directions": "Choose the recovery-code-safe move.",
      "seconds": 8,
      "scenario": "A fake IT ticket asks for MFA backup codes.",
      "options": [
        [
          "Upload codes",
          false
        ],
        [
          "Verify through official IT channel",
          true
        ],
        [
          "Forward codes to manager",
          false
        ],
        [
          "Disable MFA",
          false
        ]
      ],
      "lesson": "Recovery keys and backup codes can unlock accounts and must stay private.",
      "legacySource": "old"
    },
    {
      "id": "old-captcha-prize",
      "type": "captchaTrap",
      "title": "Captcha Trap: Prize Site",
      "category": "Prize Scam",
      "difficulty": "easy",
      "command": "ESCAPE FAKE CAPTCHA",
      "directions": "Choose the safe way out of the fake captcha.",
      "seconds": 10,
      "scenario": "A prize site says to complete a captcha by installing an extension.",
      "options": [
        [
          "Install captcha extension",
          false
        ],
        [
          "Exit page",
          true
        ],
        [
          "Allow notifications",
          false
        ],
        [
          "Enter card first",
          false
        ]
      ],
      "lesson": "Fake captchas can push malware, permissions, fees, or account-code theft.",
      "legacySource": "old"
    },
    {
      "id": "old-captcha-video",
      "type": "captchaTrap",
      "title": "Captcha Trap: Video Player",
      "category": "Streaming Malware",
      "difficulty": "medium",
      "command": "ESCAPE FAKE CAPTCHA",
      "directions": "Choose the safe way out of the fake captcha.",
      "seconds": 10,
      "scenario": "A video page says the captcha requires downloading a player.",
      "options": [
        [
          "Download player",
          false
        ],
        [
          "Close page",
          true
        ],
        [
          "Allow pop-ups",
          false
        ],
        [
          "Enter email password",
          false
        ]
      ],
      "lesson": "Fake captchas can push malware, permissions, fees, or account-code theft.",
      "legacySource": "old"
    },
    {
      "id": "old-captcha-ai",
      "type": "captchaTrap",
      "title": "Captcha Trap: AI Tool",
      "category": "AI Scam",
      "difficulty": "medium",
      "command": "ESCAPE FAKE CAPTCHA",
      "directions": "Choose the safe way out of the fake captcha.",
      "seconds": 10,
      "scenario": "A free AI site says the captcha needs clipboard access.",
      "options": [
        [
          "Allow clipboard",
          false
        ],
        [
          "Leave site",
          true
        ],
        [
          "Connect bank",
          false
        ],
        [
          "Install unlocker",
          false
        ]
      ],
      "lesson": "Fake captchas can push malware, permissions, fees, or account-code theft.",
      "legacySource": "old"
    },
    {
      "id": "old-captcha-job",
      "type": "captchaTrap",
      "title": "Captcha Trap: Job Application",
      "category": "Job Scam",
      "difficulty": "hard",
      "command": "ESCAPE FAKE CAPTCHA",
      "directions": "Choose the safe way out of the fake captcha.",
      "seconds": 8,
      "scenario": "A job page says captcha unlock requires a background-check fee.",
      "options": [
        [
          "Pay fee",
          false
        ],
        [
          "Exit and verify company site",
          true
        ],
        [
          "Enter SSN",
          false
        ],
        [
          "Call fake number",
          false
        ]
      ],
      "lesson": "Fake captchas can push malware, permissions, fees, or account-code theft.",
      "legacySource": "old"
    },
    {
      "id": "old-captcha-school",
      "type": "captchaTrap",
      "title": "Captcha Trap: Campus Login",
      "category": "University Phishing",
      "difficulty": "medium",
      "command": "ESCAPE FAKE CAPTCHA",
      "directions": "Choose the safe way out of the fake captcha.",
      "seconds": 10,
      "scenario": "A campus-looking page says captcha failed and asks for MFA code.",
      "options": [
        [
          "Enter MFA code",
          false
        ],
        [
          "Open official portal separately",
          true
        ],
        [
          "Reply to email",
          false
        ],
        [
          "Share backup code",
          false
        ]
      ],
      "lesson": "Fake captchas can push malware, permissions, fees, or account-code theft.",
      "legacySource": "old"
    },
    {
      "id": "old-spam-hunt-chat",
      "type": "spamBlockHunt",
      "title": "Spam Flood: Find Block",
      "category": "Spam Safety",
      "difficulty": "easy",
      "command": "FIND BLOCK BUTTON",
      "directions": "Find the real block/report button before spam fills the screen. Wrong buttons cost trust.",
      "seconds": 11,
      "scenario": "A spammer floods chat with fake prize links.",
      "lesson": "Blocking and reporting spam quickly reduces exposure to malicious links.",
      "legacySource": "old"
    },
    {
      "id": "old-spam-hunt-email",
      "type": "spamBlockHunt",
      "title": "Email Flood: Block Sender",
      "category": "Email Spam",
      "difficulty": "medium",
      "command": "FIND BLOCK BUTTON",
      "directions": "Find the real block/report button before spam fills the screen. Wrong buttons cost trust.",
      "seconds": 11,
      "scenario": "A fake sender keeps sending account-lock emails.",
      "lesson": "Blocking and reporting spam quickly reduces exposure to malicious links.",
      "legacySource": "old"
    },
    {
      "id": "old-spam-hunt-game",
      "type": "spamBlockHunt",
      "title": "Game Chat Spam Rush",
      "category": "Gaming Scam",
      "difficulty": "medium",
      "command": "FIND BLOCK BUTTON",
      "directions": "Find the real block/report button before spam fills the screen. Wrong buttons cost trust.",
      "seconds": 11,
      "scenario": "A player keeps posting free-skin links.",
      "lesson": "Blocking and reporting spam quickly reduces exposure to malicious links.",
      "legacySource": "old"
    },
    {
      "id": "old-spam-hunt-ai",
      "type": "spamBlockHunt",
      "title": "AI Bot Spam Rush",
      "category": "AI Scam",
      "difficulty": "hard",
      "command": "FIND BLOCK BUTTON",
      "directions": "Find the real block/report button before spam fills the screen. Wrong buttons cost trust.",
      "seconds": 9,
      "scenario": "An AI bot posts fake refund and AI-cleaner links.",
      "lesson": "Blocking and reporting spam quickly reduces exposure to malicious links.",
      "legacySource": "old"
    },
    {
      "id": "old-spam-hunt-senior",
      "type": "spamBlockHunt",
      "title": "Community Board Spam Rush",
      "category": "Community Safety",
      "difficulty": "medium",
      "command": "FIND BLOCK BUTTON",
      "directions": "Find the real block/report button before spam fills the screen. Wrong buttons cost trust.",
      "seconds": 11,
      "scenario": "A community board is flooded with fake senior-benefit links.",
      "lesson": "Blocking and reporting spam quickly reduces exposure to malicious links.",
      "legacySource": "old"
    },
    {
      "id": "old-rush-stop-codec",
      "type": "rushStopDownload",
      "title": "Rush Stop: Video Codec",
      "category": "Streaming Malware",
      "difficulty": "medium",
      "command": "CLOSE POPUPS \u2192 DOWNLOADS \u2192 STOP",
      "directions": "Close blocking pop-ups, switch to Downloads, then press STOP before the percentage reaches 100%.",
      "seconds": 13,
      "scenario": "A fake video codec is downloading while pop-ups cover the stop button.",
      "lesson": "Scam sites use confusion and pop-ups to hide dangerous downloads.",
      "legacySource": "old"
    },
    {
      "id": "old-rush-stop-ai",
      "type": "rushStopDownload",
      "title": "Rush Stop: AI Cleaner",
      "category": "AI Malware",
      "difficulty": "hard",
      "command": "CLOSE POPUPS \u2192 DOWNLOADS \u2192 STOP",
      "directions": "Close blocking pop-ups, switch to Downloads, then press STOP before the percentage reaches 100%.",
      "seconds": 10,
      "scenario": "A fake AI cleaner starts downloading and opens multiple tabs.",
      "lesson": "Scam sites use confusion and pop-ups to hide dangerous downloads.",
      "legacySource": "old"
    },
    {
      "id": "old-rush-stop-game",
      "type": "rushStopDownload",
      "title": "Rush Stop: Game Mod",
      "category": "Gaming Malware",
      "difficulty": "hard",
      "command": "CLOSE POPUPS \u2192 DOWNLOADS \u2192 STOP",
      "directions": "Close blocking pop-ups, switch to Downloads, then press STOP before the percentage reaches 100%.",
      "seconds": 10,
      "scenario": "A free game mod starts downloading while pop-ups distract you.",
      "lesson": "Scam sites use confusion and pop-ups to hide dangerous downloads.",
      "legacySource": "old"
    },
    {
      "id": "old-rush-stop-refund",
      "type": "rushStopDownload",
      "title": "Rush Stop: Refund Tool",
      "category": "Refund Scam",
      "difficulty": "medium",
      "command": "CLOSE POPUPS \u2192 DOWNLOADS \u2192 STOP",
      "directions": "Close blocking pop-ups, switch to Downloads, then press STOP before the percentage reaches 100%.",
      "seconds": 13,
      "scenario": "A refund tool downloads after a fake support page appears.",
      "lesson": "Scam sites use confusion and pop-ups to hide dangerous downloads.",
      "legacySource": "old"
    },
    {
      "id": "old-rush-stop-school",
      "type": "rushStopDownload",
      "title": "Rush Stop: Campus Security Tool",
      "category": "University Phishing",
      "difficulty": "medium",
      "command": "CLOSE POPUPS \u2192 DOWNLOADS \u2192 STOP",
      "directions": "Close blocking pop-ups, switch to Downloads, then press STOP before the percentage reaches 100%.",
      "seconds": 13,
      "scenario": "A fake campus security tool starts downloading from a password email.",
      "lesson": "Scam sites use confusion and pop-ups to hide dangerous downloads.",
      "legacySource": "old"
    },
    {
      "id": "old-maze-spy-browser",
      "type": "spywareMaze",
      "title": "Spyware Maze: Browser",
      "category": "Spyware",
      "difficulty": "easy",
      "command": "AVOID SPYWARE \u2192 REACH ANTIVIRUS",
      "directions": "Move through the maze, avoid spyware, and reach the antivirus. Use arrows, buttons, touch-drag, or motion tilt.",
      "seconds": 14,
      "lesson": "Malware avoidance is about navigating away from traps before they touch your device.",
      "legacySource": "old"
    },
    {
      "id": "old-maze-spy-phone",
      "type": "spywareMaze",
      "title": "Spyware Maze: Phone",
      "category": "Spyware",
      "difficulty": "medium",
      "command": "AVOID SPYWARE \u2192 REACH ANTIVIRUS",
      "directions": "Avoid tracking apps and reach the antivirus shield. Use arrows, buttons, touch-drag, or motion tilt.",
      "seconds": 14,
      "lesson": "Malware avoidance is about navigating away from traps before they touch your device.",
      "legacySource": "old"
    },
    {
      "id": "old-maze-spy-game",
      "type": "spywareMaze",
      "title": "Spyware Maze: Game Cheat",
      "category": "Gaming Malware",
      "difficulty": "medium",
      "command": "AVOID SPYWARE \u2192 REACH ANTIVIRUS",
      "directions": "Avoid cheat-tool spyware and reach protection. Use arrows, buttons, touch-drag, or motion tilt.",
      "seconds": 14,
      "lesson": "Malware avoidance is about navigating away from traps before they touch your device.",
      "legacySource": "old"
    },
    {
      "id": "old-maze-spy-ai",
      "type": "spywareMaze",
      "title": "Spyware Maze: AI Tool",
      "category": "AI Malware",
      "difficulty": "hard",
      "command": "AVOID SPYWARE \u2192 REACH ANTIVIRUS",
      "directions": "Avoid AI spy bots and reach the antivirus endpoint. Use arrows, buttons, touch-drag, or motion tilt.",
      "seconds": 12,
      "lesson": "Malware avoidance is about navigating away from traps before they touch your device.",
      "legacySource": "old"
    },
    {
      "id": "old-maze-spy-work",
      "type": "spywareMaze",
      "title": "Spyware Maze: Work Device",
      "category": "Business Security",
      "difficulty": "hard",
      "command": "AVOID SPYWARE \u2192 REACH ANTIVIRUS",
      "directions": "Avoid fake business tools and reach endpoint protection. Use arrows, buttons, touch-drag, or motion tilt.",
      "seconds": 12,
      "lesson": "Malware avoidance is about navigating away from traps before they touch your device.",
      "legacySource": "old"
    },
    {
      "id": "old-vpn-public-wifi",
      "type": "vpnTunnelSwitch",
      "title": "VPN Tunnel: Public Wi-Fi",
      "category": "VPN Safety",
      "difficulty": "easy",
      "command": "ROUTE THROUGH SAFE TUNNEL",
      "directions": "Choose the protected tunnel/path. Avoid fake VPN ads or open networks.",
      "seconds": 10,
      "scenario": "You are on public Wi-Fi. Route traffic through the protected VPN tunnel.",
      "target": "Trusted VPN",
      "lesson": "A trusted VPN can help on public networks, but fake VPN installers are also scams.",
      "legacySource": "old"
    },
    {
      "id": "old-vpn-airport",
      "type": "vpnTunnelSwitch",
      "title": "VPN Tunnel: Airport",
      "category": "VPN Safety",
      "difficulty": "medium",
      "command": "ROUTE THROUGH SAFE TUNNEL",
      "directions": "Choose the protected tunnel/path. Avoid fake VPN ads or open networks.",
      "seconds": 10,
      "scenario": "Airport Wi-Fi has fake portals nearby. Choose the protected tunnel.",
      "target": "Trusted VPN",
      "lesson": "A trusted VPN can help on public networks, but fake VPN installers are also scams.",
      "legacySource": "old"
    },
    {
      "id": "old-vpn-hotel",
      "type": "vpnTunnelSwitch",
      "title": "VPN Tunnel: Hotel Wi-Fi",
      "category": "Travel Safety",
      "difficulty": "medium",
      "command": "ROUTE THROUGH SAFE TUNNEL",
      "directions": "Choose the protected tunnel/path. Avoid fake VPN ads or open networks.",
      "seconds": 10,
      "scenario": "Hotel Wi-Fi has lookalike hotspots. Route through VPN.",
      "target": "Trusted VPN",
      "lesson": "A trusted VPN can help on public networks, but fake VPN installers are also scams.",
      "legacySource": "old"
    },
    {
      "id": "old-vpn-bait",
      "type": "vpnTunnelSwitch",
      "title": "VPN Tunnel: Fake VPN Ad",
      "category": "VPN Safety",
      "difficulty": "hard",
      "command": "ROUTE THROUGH SAFE TUNNEL",
      "directions": "Choose the protected tunnel/path. Avoid fake VPN ads or open networks.",
      "seconds": 8,
      "scenario": "A fake VPN ad appears. Choose the trusted VPN app, not the fake installer.",
      "target": "Trusted VPN",
      "lesson": "A trusted VPN can help on public networks, but fake VPN installers are also scams.",
      "legacySource": "old"
    },
    {
      "id": "old-firewall-email",
      "type": "firewallPatchGrid",
      "title": "Firewall Patch: Email Attack",
      "category": "Firewall",
      "difficulty": "easy",
      "command": "PATCH FIREWALL HOLES",
      "directions": "Click all red holes, not the green safe tiles.",
      "seconds": 12,
      "lesson": "Firewalls reduce exposure, but risky traffic still needs attention.",
      "legacySource": "old"
    },
    {
      "id": "old-firewall-game",
      "type": "firewallPatchGrid",
      "title": "Firewall Patch: Game Links",
      "category": "Gaming Scam",
      "difficulty": "medium",
      "command": "PATCH FIREWALL HOLES",
      "directions": "Click all red holes, not the green safe tiles.",
      "seconds": 12,
      "lesson": "Firewalls reduce exposure, but risky traffic still needs attention.",
      "legacySource": "old"
    },
    {
      "id": "old-firewall-ai",
      "type": "firewallPatchGrid",
      "title": "Firewall Patch: AI Botnet",
      "category": "AI Malware",
      "difficulty": "hard",
      "command": "PATCH FIREWALL HOLES",
      "directions": "Click all red holes, not the green safe tiles.",
      "seconds": 10,
      "lesson": "Firewalls reduce exposure, but risky traffic still needs attention.",
      "legacySource": "old"
    },
    {
      "id": "old-firewall-business",
      "type": "firewallPatchGrid",
      "title": "Firewall Patch: Work Network",
      "category": "Business Security",
      "difficulty": "hard",
      "command": "PATCH FIREWALL HOLES",
      "directions": "Click all red holes, not the green safe tiles.",
      "seconds": 10,
      "lesson": "Firewalls reduce exposure, but risky traffic still needs attention.",
      "legacySource": "old"
    },
    {
      "id": "old-mfa-bank",
      "type": "mfaApprovalGate",
      "title": "MFA Gate: Bank Login",
      "category": "MFA Safety",
      "difficulty": "easy",
      "command": "APPROVE ONLY IF EXPECTED",
      "directions": "Approve trusted login attempts. Deny unexpected MFA pushes.",
      "seconds": 9,
      "scenario": "You did not try to log in, but an approval request appears.",
      "approve": false,
      "lesson": "MFA is powerful, but unexpected approval prompts should be denied.",
      "legacySource": "old"
    },
    {
      "id": "old-mfa-school",
      "type": "mfaApprovalGate",
      "title": "MFA Gate: University Login",
      "category": "University Phishing",
      "difficulty": "medium",
      "command": "APPROVE ONLY IF EXPECTED",
      "directions": "Approve trusted login attempts. Deny unexpected MFA pushes.",
      "seconds": 9,
      "scenario": "A login approval appears right after a fake password email.",
      "approve": false,
      "lesson": "MFA is powerful, but unexpected approval prompts should be denied.",
      "legacySource": "old"
    },
    {
      "id": "old-mfa-work",
      "type": "mfaApprovalGate",
      "title": "MFA Gate: Work Login",
      "category": "Business Security",
      "difficulty": "hard",
      "command": "APPROVE ONLY IF EXPECTED",
      "directions": "Approve trusted login attempts. Deny unexpected MFA pushes.",
      "seconds": 7,
      "scenario": "You are logging into work from your own device at the expected time.",
      "approve": true,
      "lesson": "MFA is powerful, but unexpected approval prompts should be denied.",
      "legacySource": "old"
    },
    {
      "id": "old-mfa-travel",
      "type": "mfaApprovalGate",
      "title": "MFA Gate: Travel App",
      "category": "Account Security",
      "difficulty": "medium",
      "command": "APPROVE ONLY IF EXPECTED",
      "directions": "Approve trusted login attempts. Deny unexpected MFA pushes.",
      "seconds": 9,
      "scenario": "A travel account login appears from a country you are not in.",
      "approve": false,
      "lesson": "MFA is powerful, but unexpected approval prompts should be denied.",
      "legacySource": "old"
    },
    {
      "id": "old-mfa-family",
      "type": "mfaApprovalGate",
      "title": "MFA Gate: Family Account",
      "category": "Family Safety",
      "difficulty": "medium",
      "command": "APPROVE ONLY IF EXPECTED",
      "directions": "Approve trusted login attempts. Deny unexpected MFA pushes.",
      "seconds": 9,
      "scenario": "A known family password reset was started by you, and the approval appears immediately.",
      "approve": true,
      "lesson": "MFA is powerful, but unexpected approval prompts should be denied.",
      "legacySource": "old"
    },
    {
      "id": "old-pm-bank",
      "type": "passwordManagerFill",
      "title": "Password Manager: Bank Domain",
      "category": "Password Manager",
      "difficulty": "easy",
      "command": "AUTOFILL ONLY OFFICIAL DOMAIN",
      "directions": "Choose where the password manager should autofill. Do not fill lookalike domains.",
      "seconds": 10,
      "official": "bankofamerica.com",
      "domains": [
        "bankofamerica.com",
        "bank-login-help.co",
        "bankofamerica-secure.net"
      ],
      "lesson": "Password managers help because they avoid autofilling on lookalike domains.",
      "legacySource": "old"
    },
    {
      "id": "old-pm-school",
      "type": "passwordManagerFill",
      "title": "Password Manager: School Domain",
      "category": "University Phishing",
      "difficulty": "medium",
      "command": "AUTOFILL ONLY OFFICIAL DOMAIN",
      "directions": "Choose where the password manager should autofill. Do not fill lookalike domains.",
      "seconds": 10,
      "official": "official-school.edu",
      "domains": [
        "campus-password-reset.net",
        "official-school.edu",
        "school-login-help.co"
      ],
      "lesson": "Password managers help because they avoid autofilling on lookalike domains.",
      "legacySource": "old"
    },
    {
      "id": "old-pm-work",
      "type": "passwordManagerFill",
      "title": "Password Manager: Work Domain",
      "category": "Business Security",
      "difficulty": "hard",
      "command": "AUTOFILL ONLY OFFICIAL DOMAIN",
      "directions": "Choose where the password manager should autofill. Do not fill lookalike domains.",
      "seconds": 8,
      "official": "company.com",
      "domains": [
        "cornpany.com",
        "company.com",
        "company-payroll-reset.net"
      ],
      "lesson": "Password managers help because they avoid autofilling on lookalike domains.",
      "legacySource": "old"
    },
    {
      "id": "old-pm-ai",
      "type": "passwordManagerFill",
      "title": "Password Manager: AI Tool",
      "category": "AI Scam",
      "difficulty": "medium",
      "command": "AUTOFILL ONLY OFFICIAL DOMAIN",
      "directions": "Choose where the password manager should autofill. Do not fill lookalike domains.",
      "seconds": 10,
      "official": "trusted-ai.example",
      "domains": [
        "trusted-ai.example",
        "free-ai-unlocker.net",
        "ai-cleaner-login.co"
      ],
      "lesson": "Password managers help because they avoid autofilling on lookalike domains.",
      "legacySource": "old"
    },
    {
      "id": "old-pm-game",
      "type": "passwordManagerFill",
      "title": "Password Manager: Game Account",
      "category": "Gaming Scam",
      "difficulty": "medium",
      "command": "AUTOFILL ONLY OFFICIAL DOMAIN",
      "directions": "Choose where the password manager should autofill. Do not fill lookalike domains.",
      "seconds": 10,
      "official": "officialgame.com",
      "domains": [
        "free-skins-login.net",
        "officialgame.com",
        "game-prize-verify.co"
      ],
      "lesson": "Password managers help because they avoid autofilling on lookalike domains.",
      "legacySource": "old"
    },
    {
      "id": "old-taskbar-attachment",
      "type": "taskbarFileDelete",
      "title": "Taskbar Delete: Unknown Attachment",
      "category": "Download Safety",
      "difficulty": "easy",
      "command": "TASKBAR \u2192 FILE EXPLORER \u2192 DELETE",
      "directions": "Open the mock taskbar, open File Explorer, select the unknown download, then delete it.",
      "seconds": 13,
      "fileName": "Unknown_Attachment.exe",
      "lesson": "If a suspicious file appears, do not open it. Locate and delete it safely.",
      "legacySource": "old"
    },
    {
      "id": "old-taskbar-codec",
      "type": "taskbarFileDelete",
      "title": "Taskbar Delete: Video Codec",
      "category": "Streaming Malware",
      "difficulty": "medium",
      "command": "TASKBAR \u2192 FILE EXPLORER \u2192 DELETE",
      "directions": "Open the mock taskbar, open File Explorer, select the unknown download, then delete it.",
      "seconds": 13,
      "fileName": "HD_Video_Codec.exe",
      "lesson": "If a suspicious file appears, do not open it. Locate and delete it safely.",
      "legacySource": "old"
    },
    {
      "id": "old-taskbar-ai",
      "type": "taskbarFileDelete",
      "title": "Taskbar Delete: AI Cleaner",
      "category": "AI Malware",
      "difficulty": "hard",
      "command": "TASKBAR \u2192 FILE EXPLORER \u2192 DELETE",
      "directions": "Open the mock taskbar, open File Explorer, select the unknown download, then delete it.",
      "seconds": 11,
      "fileName": "AI_Security_Cleaner.exe",
      "lesson": "If a suspicious file appears, do not open it. Locate and delete it safely.",
      "legacySource": "old"
    },
    {
      "id": "old-taskbar-school",
      "type": "taskbarFileDelete",
      "title": "Taskbar Delete: Campus Tool",
      "category": "University Phishing",
      "difficulty": "medium",
      "command": "TASKBAR \u2192 FILE EXPLORER \u2192 DELETE",
      "directions": "Open the mock taskbar, open File Explorer, select the unknown download, then delete it.",
      "seconds": 13,
      "fileName": "Campus_Password_Tool.exe",
      "lesson": "If a suspicious file appears, do not open it. Locate and delete it safely.",
      "legacySource": "old"
    },
    {
      "id": "old-taskbar-game",
      "type": "taskbarFileDelete",
      "title": "Taskbar Delete: Game Mod",
      "category": "Gaming Malware",
      "difficulty": "hard",
      "command": "TASKBAR \u2192 FILE EXPLORER \u2192 DELETE",
      "directions": "Open the mock taskbar, open File Explorer, select the unknown download, then delete it.",
      "seconds": 11,
      "fileName": "Free_Coins_Mod.apk",
      "lesson": "If a suspicious file appears, do not open it. Locate and delete it safely.",
      "legacySource": "old"
    },
    {
      "id": "old-qr-lens-parking",
      "type": "qrLensFocus",
      "title": "QR Lens: Parking Meter",
      "category": "QR Scam",
      "difficulty": "easy",
      "command": "SCAN OFFICIAL QR ONLY",
      "directions": "Scan only the official QR sticker and reject the suspicious sticker.",
      "seconds": 10,
      "lesson": "QR codes hide their destination, so official context matters.",
      "legacySource": "old"
    },
    {
      "id": "old-qr-lens-restaurant",
      "type": "qrLensFocus",
      "title": "QR Lens: Restaurant Menu",
      "category": "QR Safety",
      "difficulty": "medium",
      "command": "SCAN OFFICIAL QR ONLY",
      "directions": "Find the official menu QR, not the payment-card trap.",
      "seconds": 10,
      "lesson": "QR codes hide their destination, so official context matters.",
      "legacySource": "old"
    },
    {
      "id": "old-qr-lens-charity",
      "type": "qrLensFocus",
      "title": "QR Lens: Charity Poster",
      "category": "Charity Scam",
      "difficulty": "medium",
      "command": "SCAN OFFICIAL QR ONLY",
      "directions": "Find the official charity QR and avoid the fake donation QR.",
      "seconds": 10,
      "lesson": "QR codes hide their destination, so official context matters.",
      "legacySource": "old"
    },
    {
      "id": "old-qr-lens-campus",
      "type": "qrLensFocus",
      "title": "QR Lens: Campus Poster",
      "category": "University Phishing",
      "difficulty": "medium",
      "command": "SCAN OFFICIAL QR ONLY",
      "directions": "Choose the official event QR, not the login-theft QR.",
      "seconds": 10,
      "lesson": "QR codes hide their destination, so official context matters.",
      "legacySource": "old"
    },
    {
      "id": "old-clip-bank",
      "type": "clipboardCleaner",
      "title": "Clipboard Cleaner: Bank Code",
      "category": "Privacy",
      "difficulty": "easy",
      "command": "CLEAR SENSITIVE CLIPS",
      "directions": "Select sensitive clipboard items to clear. Leave normal text alone.",
      "seconds": 12,
      "clips": [
        [
          "2FA code: 482119",
          true
        ],
        [
          "Grocery list",
          false
        ],
        [
          "Bank account number",
          true
        ]
      ],
      "needed": 2,
      "lesson": "Clipboard contents can leak codes, addresses, account numbers, or private IDs.",
      "legacySource": "old"
    },
    {
      "id": "old-clip-wallet",
      "type": "clipboardCleaner",
      "title": "Clipboard Cleaner: Wallet",
      "category": "Crypto Scam",
      "difficulty": "hard",
      "command": "CLEAR SENSITIVE CLIPS",
      "directions": "Select sensitive clipboard items to clear. Leave normal text alone.",
      "seconds": 10,
      "clips": [
        [
          "Seed phrase words",
          true
        ],
        [
          "Recipe link",
          false
        ],
        [
          "Wallet address from unknown page",
          true
        ]
      ],
      "needed": 2,
      "lesson": "Clipboard contents can leak codes, addresses, account numbers, or private IDs.",
      "legacySource": "old"
    },
    {
      "id": "old-clip-school",
      "type": "clipboardCleaner",
      "title": "Clipboard Cleaner: Campus",
      "category": "University Phishing",
      "difficulty": "medium",
      "command": "CLEAR SENSITIVE CLIPS",
      "directions": "Select sensitive clipboard items to clear. Leave normal text alone.",
      "seconds": 12,
      "clips": [
        [
          "Student ID",
          true
        ],
        [
          "Classroom location",
          false
        ],
        [
          "Login backup code",
          true
        ]
      ],
      "needed": 2,
      "lesson": "Clipboard contents can leak codes, addresses, account numbers, or private IDs.",
      "legacySource": "old"
    },
    {
      "id": "old-clip-work",
      "type": "clipboardCleaner",
      "title": "Clipboard Cleaner: Work",
      "category": "Business Security",
      "difficulty": "hard",
      "command": "CLEAR SENSITIVE CLIPS",
      "directions": "Select sensitive clipboard items to clear. Leave normal text alone.",
      "seconds": 10,
      "clips": [
        [
          "VPN code",
          true
        ],
        [
          "Meeting agenda",
          false
        ],
        [
          "Client account number",
          true
        ]
      ],
      "needed": 2,
      "lesson": "Clipboard contents can leak codes, addresses, account numbers, or private IDs.",
      "legacySource": "old"
    },
    {
      "id": "old-safeword-family",
      "type": "safeWordChallenge",
      "title": "Safe Word Check: Family Emergency",
      "category": "Family Emergency",
      "difficulty": "easy",
      "command": "TYPE FAMILY SAFE WORD",
      "directions": "Use the safe word to verify before money or sensitive action.",
      "seconds": 11,
      "word": "pineapple",
      "scenario": "A new number says it is your relative and needs money.",
      "lesson": "Family safe words help defeat impersonation and AI voice scams.",
      "legacySource": "old"
    },
    {
      "id": "old-safeword-ai",
      "type": "safeWordChallenge",
      "title": "Safe Word Check: AI Voice",
      "category": "AI Voice Scam",
      "difficulty": "hard",
      "command": "TYPE FAMILY SAFE WORD",
      "directions": "Use the safe word to verify before money or sensitive action.",
      "seconds": 9,
      "word": "sunrise",
      "scenario": "A familiar voice asks for urgent money.",
      "lesson": "Family safe words help defeat impersonation and AI voice scams.",
      "legacySource": "old"
    },
    {
      "id": "old-safeword-travel",
      "type": "safeWordChallenge",
      "title": "Safe Word Check: Travel Emergency",
      "category": "Travel Scam",
      "difficulty": "medium",
      "command": "TYPE FAMILY SAFE WORD",
      "directions": "Use the safe word to verify before money or sensitive action.",
      "seconds": 11,
      "word": "lantern",
      "scenario": "A caller claims a family member is stranded while traveling.",
      "lesson": "Family safe words help defeat impersonation and AI voice scams.",
      "legacySource": "old"
    },
    {
      "id": "old-safeword-medical",
      "type": "safeWordChallenge",
      "title": "Safe Word Check: Medical Emergency",
      "category": "Health Fraud",
      "difficulty": "hard",
      "command": "TYPE FAMILY SAFE WORD",
      "directions": "Use the safe word to verify before money or sensitive action.",
      "seconds": 9,
      "word": "harbor",
      "scenario": "A caller claims there is an emergency medical bill.",
      "lesson": "Family safe words help defeat impersonation and AI voice scams.",
      "legacySource": "old"
    },
    {
      "id": "old-calib-real-bank",
      "type": "legitOrScamCalibration",
      "title": "Calibrate: Real Bank Habit",
      "category": "Bank Safety",
      "difficulty": "easy",
      "command": "LEGIT OR SCAM?",
      "directions": "Some rounds are trustworthy. Judge the context, not just fear.",
      "seconds": 9,
      "scenario": "You opened the official bank app yourself and see a normal security prompt.",
      "legit": true,
      "lesson": "Good fraud awareness means recognizing both danger and trustworthy verified context.",
      "legacySource": "old"
    },
    {
      "id": "old-calib-real-charity",
      "type": "legitOrScamCalibration",
      "title": "Calibrate: Real Charity",
      "category": "Charity",
      "difficulty": "medium",
      "command": "LEGIT OR SCAM?",
      "directions": "Some rounds are trustworthy. Judge the context, not just fear.",
      "seconds": 9,
      "scenario": "You searched the charity independently and are on its official website.",
      "legit": true,
      "lesson": "Good fraud awareness means recognizing both danger and trustworthy verified context.",
      "legacySource": "old"
    },
    {
      "id": "old-calib-fake-prize",
      "type": "legitOrScamCalibration",
      "title": "Calibrate: Fake Prize",
      "category": "Prize Scam",
      "difficulty": "easy",
      "command": "LEGIT OR SCAM?",
      "directions": "Some rounds are trustworthy. Judge the context, not just fear.",
      "seconds": 9,
      "scenario": "A text says you won a prize but must pay a claim fee.",
      "legit": false,
      "lesson": "Good fraud awareness means recognizing both danger and trustworthy verified context.",
      "legacySource": "old"
    },
    {
      "id": "old-calib-real-family",
      "type": "legitOrScamCalibration",
      "title": "Calibrate: Verified Family",
      "category": "Family Safety",
      "difficulty": "medium",
      "command": "LEGIT OR SCAM?",
      "directions": "Some rounds are trustworthy. Judge the context, not just fear.",
      "seconds": 9,
      "scenario": "A saved contact confirms a small planned payment on a normal call.",
      "legit": true,
      "lesson": "Good fraud awareness means recognizing both danger and trustworthy verified context.",
      "legacySource": "old"
    },
    {
      "id": "old-calib-fake-job",
      "type": "legitOrScamCalibration",
      "title": "Calibrate: Fake Job",
      "category": "Job Scam",
      "difficulty": "medium",
      "command": "LEGIT OR SCAM?",
      "directions": "Some rounds are trustworthy. Judge the context, not just fear.",
      "seconds": 9,
      "scenario": "A job asks for a payment before an interview.",
      "legit": false,
      "lesson": "Good fraud awareness means recognizing both danger and trustworthy verified context.",
      "legacySource": "old"
    },
    {
      "id": "old-swipe-dating-v9",
      "type": "swipeJudge",
      "title": "Dating Swipe: Too Fast Too Secret",
      "category": "Romance Scam",
      "difficulty": "medium",
      "command": "LEFT = SCAM, RIGHT = OK",
      "directions": "Swipe left on suspicious dating profiles and right on safer ones.",
      "seconds": 13,
      "profiles": [
        [
          "Maya",
          "Wants to meet in public and video chat first.",
          false
        ],
        [
          "Chris",
          "Says love happened instantly and asks for gift cards.",
          true
        ],
        [
          "Riley",
          "Wants to keep everything on the dating app for now.",
          false
        ],
        [
          "Sam",
          "Has emergency bills and says not to tell friends.",
          true
        ]
      ],
      "lesson": "Dating scams often move too fast, ask for secrecy, money, crypto, or gift cards.",
      "legacySource": "old"
    },
    {
      "id": "old-boss-ai-voice-v9",
      "type": "legacyBossRush",
      "title": "Legacy Boss: The Voice Clone",
      "category": "Boss",
      "difficulty": "boss",
      "command": "DEFEAT AI IMPERSONATION",
      "directions": "Beat the voice clone through verification, safe word, money control, and code protection.",
      "seconds": 38,
      "bossIcon": "\ud83c\udfad",
      "phases": [
        {
          "mini": "tap",
          "prompt": "Tap 3 strongest warning signs.",
          "message": "It sounds like your relative. I need $2,000 now. Do not call anyone. Use this link.",
          "chips": [
            [
              "sounds like your relative",
              true
            ],
            [
              "$2,000 now",
              true
            ],
            [
              "Do not call anyone",
              true
            ],
            [
              "payment link",
              true
            ],
            [
              "relative",
              false
            ]
          ],
          "needed": 3
        },
        {
          "mini": "choose",
          "prompt": "What defeats the voice clone?",
          "options": [
            [
              "Call a known saved number",
              true
            ],
            [
              "Send money immediately",
              false
            ],
            [
              "Keep it secret",
              false
            ],
            [
              "Share a code",
              false
            ]
          ]
        },
        {
          "mini": "money",
          "prompt": "How much should you send before verification?",
          "targetAmount": 0
        },
        {
          "mini": "choose",
          "prompt": "Final move?",
          "options": [
            [
              "Use safe word and verify",
              true
            ],
            [
              "Trust the voice",
              false
            ],
            [
              "Pay with gift cards",
              false
            ],
            [
              "Click link",
              false
            ]
          ]
        }
      ],
      "lesson": "AI voice scams can sound convincing. Verification through a known contact defeats the pressure.",
      "legacySource": "old"
    },
    {
      "id": "old-boss-malware-v9",
      "type": "legacyBossRush",
      "title": "Legacy Boss: Malware Hydra",
      "category": "Boss",
      "difficulty": "boss",
      "command": "STOP DOWNLOADS AND POPUPS",
      "directions": "Beat the malware boss by stopping downloads, closing bait, and choosing official sources.",
      "seconds": 38,
      "bossIcon": "\ud83d\udc0d",
      "phases": [
        {
          "mini": "choose",
          "prompt": "A video says you need an HD codec. What now?",
          "options": [
            [
              "Close the page",
              true
            ],
            [
              "Install codec",
              false
            ],
            [
              "Allow notifications",
              false
            ],
            [
              "Enter card",
              false
            ]
          ]
        },
        {
          "mini": "tap",
          "prompt": "Tap 3 malware warning signs.",
          "message": "Install AI Cleaner. Disable antivirus. Free premium unlock. Verified safe!",
          "chips": [
            [
              "Install AI Cleaner",
              true
            ],
            [
              "Disable antivirus",
              true
            ],
            [
              "Free premium unlock",
              true
            ],
            [
              "Verified safe",
              true
            ],
            [
              "AI",
              false
            ]
          ],
          "needed": 3
        },
        {
          "mini": "money",
          "prompt": "How much should you pay for the fake cleanup?",
          "targetAmount": 0
        },
        {
          "mini": "choose",
          "prompt": "Best defense?",
          "options": [
            [
              "Stop download and use trusted security tools",
              true
            ],
            [
              "Call pop-up number",
              false
            ],
            [
              "Install extension",
              false
            ],
            [
              "Share screen",
              false
            ]
          ]
        }
      ],
      "lesson": "Malware bosses rely on speed, pop-ups, fake tools, and panic. Stop downloads and exit safely.",
      "legacySource": "old"
    },
    {
      "id": "old-boss-account-takeover-v9",
      "type": "legacyBossRush",
      "title": "Legacy Boss: Account Takeover Phantom",
      "category": "Boss",
      "difficulty": "boss",
      "command": "PROTECT PASSWORDS AND MFA",
      "directions": "Defeat credential theft through official domains, MFA denial, and recovery-code safety.",
      "seconds": 38,
      "bossIcon": "\ud83d\udc7b",
      "phases": [
        {
          "mini": "choose",
          "prompt": "A password manager sees school-login-help.co. Autofill?",
          "options": [
            [
              "No, verify official domain",
              true
            ],
            [
              "Autofill",
              false
            ],
            [
              "Share backup code",
              false
            ],
            [
              "Disable MFA",
              false
            ]
          ]
        },
        {
          "mini": "tap",
          "prompt": "Tap 3 takeover warning signs.",
          "message": "Reply with MFA code. Password expires today. Use this unknown link. Do not report.",
          "chips": [
            [
              "Reply with MFA code",
              true
            ],
            [
              "Password expires today",
              true
            ],
            [
              "unknown link",
              true
            ],
            [
              "Do not report",
              true
            ],
            [
              "MFA exists",
              false
            ]
          ],
          "needed": 3
        },
        {
          "mini": "money",
          "prompt": "How much should you pay to keep your account open?",
          "targetAmount": 0
        },
        {
          "mini": "choose",
          "prompt": "Final defense?",
          "options": [
            [
              "Open official portal separately",
              true
            ],
            [
              "Reply with code",
              false
            ],
            [
              "Send recovery key",
              false
            ],
            [
              "Click login link",
              false
            ]
          ]
        }
      ],
      "lesson": "Account takeover is stopped by official domains, MFA caution, and never sharing recovery codes.",
      "legacySource": "old"
    },
    {
      "id": "v12-ai-grandparent-voice",
      "type": "evidenceTokenSelect",
      "title": "AI Grandparent Voice Check",
      "category": "AI Voice Scam",
      "difficulty": "hard",
      "command": "SELECT REAL RED FLAGS",
      "directions": "Select the real evidence tokens, not surface-level details.",
      "scenario": "A caller sounds like your grandparent and says they need bail money but you must keep it secret.",
      "flags": [
        [
          "Voice sounds familiar",
          false
        ],
        [
          "Asks for secrecy",
          true
        ],
        [
          "Urgent money request",
          true
        ],
        [
          "Unknown number",
          true
        ],
        [
          "Uses your name",
          false
        ]
      ],
      "needed": 3,
      "lesson": "Voice is not enough proof. Secrecy, urgency, unknown numbers, and money requests are evidence.",
      "seconds": 10,
      "legacySource": "v12"
    },
    {
      "id": "v12-fake-invoice-evidence",
      "type": "evidenceTokenSelect",
      "title": "Invoice Evidence Split",
      "category": "Business Email",
      "difficulty": "hard",
      "command": "SELECT REAL RED FLAGS",
      "directions": "Select the real red flags.",
      "scenario": "A vendor invoice asks for a new wire account by 5 PM.",
      "flags": [
        [
          "New payment account",
          true
        ],
        [
          "Urgent deadline",
          true
        ],
        [
          "External sender domain",
          true
        ],
        [
          "PDF icon",
          false
        ],
        [
          "Polite greeting",
          false
        ]
      ],
      "needed": 3,
      "lesson": "Payment changes need trusted verification outside the email thread.",
      "seconds": 10,
      "legacySource": "v12"
    },
    {
      "id": "v12-student-scholarship-evidence",
      "type": "evidenceTokenSelect",
      "title": "Scholarship Evidence Scan",
      "category": "Student Scam",
      "difficulty": "medium",
      "command": "SELECT REAL RED FLAGS",
      "directions": "Select the evidence tokens.",
      "scenario": "A scholarship page says you won but asks for bank login to release funds.",
      "flags": [
        [
          "Bank login request",
          true
        ],
        [
          "Prize pressure",
          true
        ],
        [
          "Lookalike school domain",
          true
        ],
        [
          "School colors",
          false
        ],
        [
          "Confetti graphic",
          false
        ]
      ],
      "needed": 3,
      "lesson": "Legitimate scholarships do not ask for bank logins.",
      "seconds": 12,
      "legacySource": "v12"
    },
    {
      "id": "v12-marketplace-overpay-evidence",
      "type": "evidenceTokenSelect",
      "title": "Marketplace Overpay Evidence",
      "category": "Marketplace Scam",
      "difficulty": "medium",
      "command": "SELECT REAL RED FLAGS",
      "directions": "Select the evidence tokens.",
      "scenario": "A buyer overpays by check and asks you to refund extra money immediately.",
      "flags": [
        [
          "Overpayment",
          true
        ],
        [
          "Refund before clearance",
          true
        ],
        [
          "Pressure to act fast",
          true
        ],
        [
          "Friendly buyer name",
          false
        ],
        [
          "Normal item photo",
          false
        ]
      ],
      "needed": 3,
      "lesson": "Wait for payment to fully clear and keep transactions on trusted platforms.",
      "seconds": 12,
      "legacySource": "v12"
    },
    {
      "id": "v12-romance-mule-evidence",
      "type": "evidenceTokenSelect",
      "title": "Romance Mule Evidence",
      "category": "Romance Scam",
      "difficulty": "hard",
      "command": "SELECT REAL RED FLAGS",
      "directions": "Select the evidence tokens.",
      "scenario": "An online partner asks you to receive packages and forward them while keeping it private.",
      "flags": [
        [
          "Package forwarding",
          true
        ],
        [
          "Secrecy",
          true
        ],
        [
          "Relationship pressure",
          true
        ],
        [
          "Says good morning",
          false
        ],
        [
          "Uses heart emoji",
          false
        ]
      ],
      "needed": 3,
      "lesson": "Package forwarding can be a romance scam or mule activity.",
      "seconds": 10,
      "legacySource": "v12"
    },
    {
      "id": "v12-fake-job-evidence",
      "type": "evidenceTokenSelect",
      "title": "Fake Job Evidence",
      "category": "Job Scam",
      "difficulty": "medium",
      "command": "SELECT REAL RED FLAGS",
      "directions": "Select the evidence tokens.",
      "scenario": "A remote job hires you instantly and asks you to buy equipment with their check.",
      "flags": [
        [
          "Instant hire",
          true
        ],
        [
          "Check overpayment",
          true
        ],
        [
          "Equipment purchase request",
          true
        ],
        [
          "Remote work option",
          false
        ],
        [
          "Interview calendar link",
          false
        ]
      ],
      "needed": 3,
      "lesson": "Fake jobs often use check scams and equipment purchase pressure.",
      "seconds": 12,
      "legacySource": "v12"
    },
    {
      "id": "v12-charity-crypto-evidence",
      "type": "evidenceTokenSelect",
      "title": "Charity Crypto Evidence",
      "category": "Charity Scam",
      "difficulty": "medium",
      "command": "SELECT REAL RED FLAGS",
      "directions": "Select the evidence tokens.",
      "scenario": "A disaster charity page asks for crypto only and has no registration information.",
      "flags": [
        [
          "Crypto-only donation",
          true
        ],
        [
          "No registration info",
          true
        ],
        [
          "Urgent pressure",
          true
        ],
        [
          "Sad photo",
          false
        ],
        [
          "Donate button",
          false
        ]
      ],
      "needed": 3,
      "lesson": "Verify charities independently before donating.",
      "seconds": 12,
      "legacySource": "v12"
    },
    {
      "id": "v12-qr-parking-evidence",
      "type": "evidenceTokenSelect",
      "title": "QR Sticker Evidence",
      "category": "QR Scam",
      "difficulty": "medium",
      "command": "SELECT REAL RED FLAGS",
      "directions": "Select the evidence tokens.",
      "scenario": "A QR sticker covers the original parking-meter code and opens a weird payment site.",
      "flags": [
        [
          "Sticker over official code",
          true
        ],
        [
          "Unknown payment domain",
          true
        ],
        [
          "Card-save request",
          true
        ],
        [
          "QR shape",
          false
        ],
        [
          "Parking meter nearby",
          false
        ]
      ],
      "needed": 3,
      "lesson": "Use official parking apps or city websites for payments.",
      "seconds": 12,
      "legacySource": "v12"
    },
    {
      "id": "v12-sequence-family-voice",
      "type": "sequenceBuilder",
      "title": "Build Family Voice Scam Response",
      "category": "AI Voice Scam",
      "difficulty": "hard",
      "command": "BUILD SAFE RESPONSE ORDER",
      "directions": "Build the first three safe steps in order.",
      "scenario": "A familiar voice asks for emergency money and says not to call anyone.",
      "steps": [
        "Pause",
        "Call saved number",
        "Ask family safe question",
        "Send money",
        "Keep secret"
      ],
      "answer": [
        "Pause",
        "Call saved number",
        "Ask family safe question"
      ],
      "lesson": "A verification sequence defeats panic and voice cloning.",
      "seconds": 12,
      "legacySource": "v12"
    },
    {
      "id": "v12-sequence-bank-text",
      "type": "sequenceBuilder",
      "title": "Build Bank Text Response",
      "category": "Bank Phishing",
      "difficulty": "medium",
      "command": "BUILD SAFE RESPONSE ORDER",
      "directions": "Build the first three safe steps in order.",
      "scenario": "A bank text says your account will close unless you click a link.",
      "steps": [
        "Open official bank app",
        "Check alerts",
        "Report/delete text",
        "Click link",
        "Reply with code"
      ],
      "answer": [
        "Open official bank app",
        "Check alerts",
        "Report/delete text"
      ],
      "lesson": "Official apps and reports beat surprise links.",
      "seconds": 14,
      "legacySource": "v12"
    },
    {
      "id": "v12-sequence-bad-download",
      "type": "sequenceBuilder",
      "title": "Build Bad Download Response",
      "category": "Malware",
      "difficulty": "medium",
      "command": "BUILD SAFE RESPONSE ORDER",
      "directions": "Build the first three safe steps in order.",
      "scenario": "A fake video codec has downloaded to your computer.",
      "steps": [
        "Do not open it",
        "Delete the file",
        "Run trusted security scan",
        "Disable antivirus",
        "Install codec"
      ],
      "answer": [
        "Do not open it",
        "Delete the file",
        "Run trusted security scan"
      ],
      "lesson": "Never run surprise downloads.",
      "seconds": 14,
      "legacySource": "v12"
    },
    {
      "id": "v12-sequence-romance-money",
      "type": "sequenceBuilder",
      "title": "Build Romance Money Response",
      "category": "Romance Scam",
      "difficulty": "hard",
      "command": "BUILD SAFE RESPONSE ORDER",
      "directions": "Build the first three safe steps in order.",
      "scenario": "An online partner asks for crypto to visit you.",
      "steps": [
        "Pause",
        "Refuse payment",
        "Talk to trusted person/report",
        "Buy crypto",
        "Keep it secret"
      ],
      "answer": [
        "Pause",
        "Refuse payment",
        "Talk to trusted person/report"
      ],
      "lesson": "Romance pressure should be slowed down and verified with support.",
      "seconds": 12,
      "legacySource": "v12"
    },
    {
      "id": "v12-sequence-game-chat",
      "type": "sequenceBuilder",
      "title": "Build Game Chat Safety Response",
      "category": "Game Chat",
      "difficulty": "medium",
      "command": "BUILD SAFE RESPONSE ORDER",
      "directions": "Build the first three safe steps in order.",
      "scenario": "A player offers free coins through a login link.",
      "steps": [
        "Do not open link",
        "Select player",
        "Mute/report",
        "Add friend",
        "Log in"
      ],
      "answer": [
        "Do not open link",
        "Select player",
        "Mute/report"
      ],
      "lesson": "Report reward-link spam instead of engaging.",
      "seconds": 14,
      "legacySource": "v12"
    },
    {
      "id": "v12-domain-bank-lookalike",
      "type": "domainDuel",
      "title": "Domain Duel: Bank",
      "category": "Bank Phishing",
      "difficulty": "medium",
      "command": "PICK THE REAL DOMAIN",
      "directions": "Pick the official-looking safe destination.",
      "scenario": "Pick the official-looking safe destination.",
      "official": "bankofamerica.com",
      "domains": [
        "bankofamerica.com",
        "bankofamerica-login-help.co",
        "secure-bankofamerica-alert.net"
      ],
      "lesson": "Password managers and typed URLs help avoid lookalike domains.",
      "seconds": 10,
      "legacySource": "v12"
    },
    {
      "id": "v12-domain-school-lookalike",
      "type": "domainDuel",
      "title": "Domain Duel: Campus",
      "category": "University Phishing",
      "difficulty": "medium",
      "command": "PICK THE REAL DOMAIN",
      "directions": "Pick the official school destination.",
      "scenario": "Pick the official school destination.",
      "official": "purdue.edu",
      "domains": [
        "purdue.edu",
        "purdue-password-reset.co",
        "my-purdue-login.net"
      ],
      "lesson": "Lookalike domains steal school logins.",
      "seconds": 10,
      "legacySource": "v12"
    },
    {
      "id": "v12-domain-game-rewards",
      "type": "domainDuel",
      "title": "Domain Duel: Game Rewards",
      "category": "Gaming Scam",
      "difficulty": "hard",
      "command": "PICK THE REAL DOMAIN",
      "directions": "Pick the safe destination for account login.",
      "scenario": "Pick the safe destination for account login.",
      "official": "officialgame.com",
      "domains": [
        "free-coins-official.net",
        "officialgame.com",
        "game-login-prize.co"
      ],
      "lesson": "Free reward domains are often credential traps.",
      "seconds": 10,
      "legacySource": "v12"
    },
    {
      "id": "v12-domain-shopping",
      "type": "domainDuel",
      "title": "Domain Duel: Shopping",
      "category": "Shopping Scam",
      "difficulty": "medium",
      "command": "PICK THE REAL DOMAIN",
      "directions": "Pick the safer checkout context.",
      "scenario": "Pick the safer checkout context.",
      "official": "brand.com",
      "domains": [
        "brand-clearance-90.shop",
        "brand.com",
        "brand-pay-wire.biz"
      ],
      "lesson": "Extreme sale lookalikes and wire payment pages are risky.",
      "seconds": 10,
      "legacySource": "v12"
    },
    {
      "id": "v12-privacy-camera-coupon",
      "type": "privacyCleaner",
      "title": "Privacy Panel: Coupon Site",
      "category": "Privacy",
      "difficulty": "medium",
      "command": "SELECT RISKY ITEMS",
      "directions": "Turn off risky permissions that a coupon page does not need.",
      "scenario": "Turn off risky permissions that a coupon page does not need.",
      "permissions": [
        [
          "Notifications",
          true
        ],
        [
          "Location",
          true
        ],
        [
          "Camera",
          false
        ],
        [
          "Microphone",
          false
        ],
        [
          "Contacts",
          true
        ]
      ],
      "needed": 3,
      "lesson": "Select only the sensitive or unnecessary items, then confirm.",
      "seconds": 13,
      "legacySource": "v12"
    },
    {
      "id": "v12-privacy-ai-tool",
      "type": "privacyCleaner",
      "title": "Privacy Panel: AI Tool",
      "category": "AI Malware",
      "difficulty": "hard",
      "command": "SELECT RISKY ITEMS",
      "directions": "Turn off risky extension permissions.",
      "scenario": "Turn off risky extension permissions.",
      "permissions": [
        [
          "Read all websites",
          true
        ],
        [
          "Manage downloads",
          true
        ],
        [
          "Change search engine",
          true
        ],
        [
          "Dark mode",
          false
        ],
        [
          "Spellcheck",
          false
        ]
      ],
      "needed": 3,
      "lesson": "Select only the sensitive or unnecessary items, then confirm.",
      "seconds": 13,
      "legacySource": "v12"
    },
    {
      "id": "v12-clipboard-codes",
      "type": "privacyCleaner",
      "title": "Clipboard Cleaner Pro",
      "category": "Privacy",
      "difficulty": "medium",
      "command": "SELECT RISKY ITEMS",
      "directions": "Clear sensitive clipboard data only.",
      "scenario": "Clear sensitive clipboard data only.",
      "clips": [
        [
          "MFA code: 118204",
          true
        ],
        [
          "Grandma birthday note",
          false
        ],
        [
          "Bank routing number",
          true
        ],
        [
          "Password reset link",
          true
        ],
        [
          "Shopping list",
          false
        ]
      ],
      "needed": 3,
      "lesson": "Select only the sensitive or unnecessary items, then confirm.",
      "seconds": 13,
      "legacySource": "v12"
    },
    {
      "id": "v12-clipboard-address",
      "type": "privacyCleaner",
      "title": "Clipboard Address Leak",
      "category": "Privacy",
      "difficulty": "medium",
      "command": "SELECT RISKY ITEMS",
      "directions": "Clear sensitive clipboard data only.",
      "scenario": "Clear sensitive clipboard data only.",
      "clips": [
        [
          "Home address",
          true
        ],
        [
          "Class notes title",
          false
        ],
        [
          "SSN fragment",
          true
        ],
        [
          "Meeting agenda",
          false
        ],
        [
          "One-time code",
          true
        ]
      ],
      "needed": 3,
      "lesson": "Select only the sensitive or unnecessary items, then confirm.",
      "seconds": 13,
      "legacySource": "v12"
    },
    {
      "id": "v12-amount-refund-overpay",
      "type": "safeAmount",
      "title": "Safe Amount: Refund Caller",
      "category": "Refund Scam",
      "difficulty": "medium",
      "command": "SET THE SAFE AMOUNT",
      "directions": "Use + / - buttons and send the safe amount.",
      "scenario": "A caller claims they overpaid you and asks for $499 back now.",
      "targetAmount": 0,
      "lesson": "Scammer-requested refunds get $0 until independently verified.",
      "seconds": 13,
      "legacySource": "v12"
    },
    {
      "id": "v12-amount-charity-verified",
      "type": "safeAmount",
      "title": "Safe Amount: Verified Charity",
      "category": "Charity",
      "difficulty": "medium",
      "command": "SET THE SAFE AMOUNT",
      "directions": "Use + / - buttons and send the safe amount.",
      "scenario": "You independently found the official charity page and planned a $20 donation.",
      "targetAmount": 20,
      "lesson": "Verified donations are different from pressure links.",
      "seconds": 13,
      "legacySource": "v12"
    },
    {
      "id": "v12-amount-romance-giftcard",
      "type": "safeAmount",
      "title": "Safe Amount: Romance Gift Card",
      "category": "Romance Scam",
      "difficulty": "hard",
      "command": "SET THE SAFE AMOUNT",
      "directions": "Use + / - buttons and send the safe amount.",
      "scenario": "An online partner asks for $100 in gift cards to fix a travel issue.",
      "targetAmount": 0,
      "lesson": "Romance gift-card pressure should get $0.",
      "seconds": 13,
      "legacySource": "v12"
    },
    {
      "id": "v12-amount-marketplace-shipping",
      "type": "safeAmount",
      "title": "Safe Amount: Marketplace Shipping",
      "category": "Marketplace Scam",
      "difficulty": "medium",
      "command": "SET THE SAFE AMOUNT",
      "directions": "Use + / - buttons and send the safe amount.",
      "scenario": "A buyer sends an off-platform shipping fee link for $35.",
      "targetAmount": 0,
      "lesson": "Off-platform payment links are risky.",
      "seconds": 13,
      "legacySource": "v12"
    },
    {
      "id": "shield-cursor-bank",
      "type": "shieldCursor",
      "title": "Shield Cursor: Bank Phishing",
      "category": "Bank Phishing",
      "difficulty": "easy",
      "command": "MOVE SHIELD \u2192 BLOCK SCAM TEXTS",
      "directions": "Move the shield with mouse/touch or WASD. Block scam texts, but avoid blocking safe messages.",
      "seconds": 15,
      "scenario": "A bank alert says your account will close unless you act now",
      "scamLabels": [
        "VERIFY NOW",
        "FREE COINS",
        "PAY FEE",
        "SEND CODE",
        "REMOTE ACCESS"
      ],
      "safeLabels": [
        "Official app",
        "Saved number",
        "Trusted relative",
        "Known portal",
        "Report button"
      ],
      "target": 5,
      "lesson": "Use the official bank app or saved number, never a surprise link."
    },
    {
      "id": "text-dodge-bank",
      "type": "textDodge",
      "title": "Falling Text Dodge: Bank Phishing",
      "category": "Bank Phishing",
      "difficulty": "medium",
      "command": "LEFT/RIGHT \u2192 DODGE SCAMS, COLLECT VERIFY",
      "directions": "Move with A/D, arrow keys, or onscreen buttons. Dodge scam texts and collect verification stars.",
      "seconds": 16,
      "scenario": "A bank alert says your account will close unless you act now",
      "scamLabels": [
        "PAY FEE",
        "SEND CODE",
        "REMOTE ACCESS",
        "GIFT CARD",
        "URGENT REFUND"
      ],
      "target": 3,
      "lesson": "Use the official bank app or saved number, never a surprise link."
    },
    {
      "id": "packet-paddle-bank",
      "type": "packetPaddle",
      "title": "Firewall Paddle: Bank Phishing",
      "category": "Bank Phishing",
      "difficulty": "hard",
      "command": "MOVE FIREWALL \u2192 BLOCK SCAM PACKETS",
      "directions": "Move the firewall paddle with mouse/touch or arrows. Block scam packets and let safe packets pass.",
      "seconds": 16,
      "scenario": "A bank alert says your account will close unless you act now",
      "scamLabels": [
        "FREE COINS",
        "PAY FEE",
        "SEND CODE",
        "REMOTE ACCESS",
        "GIFT CARD"
      ],
      "safeLabels": [
        "Newsletter",
        "Known friend",
        "Receipt",
        "Class note",
        "Family photo"
      ],
      "target": 5,
      "lesson": "Use the official bank app or saved number, never a surprise link."
    },
    {
      "id": "phone-sequence-bank",
      "type": "phoneTapSequence",
      "title": "Phone Report Path: Bank Phishing",
      "category": "Bank Phishing",
      "difficulty": "easy",
      "command": "PHONE PATH \u2192 REPORT SAFELY",
      "directions": "Navigate the phone in the correct order: message, options, report/block, confirm.",
      "seconds": 17,
      "scenario": "A bank alert says your account will close unless you act now",
      "message": "A bank alert says your account will close unless you act now. Tap to claim: bank-verify-fast.net",
      "sender": "Unknown",
      "steps": [
        "Open suspicious message",
        "Open sender options",
        "Report or block",
        "Confirm safety action"
      ],
      "lesson": "Use the official bank app or saved number, never a surprise link."
    },
    {
      "id": "browser-patch-bank",
      "type": "browserPatchRun",
      "title": "Browser Patch Run: Bank Phishing",
      "category": "Bank Phishing",
      "difficulty": "medium",
      "command": "CLOSE BAIT \u2192 STOP DOWNLOAD \u2192 CLEAR PERMISSION",
      "directions": "Fix the browser in the correct order while the danger meter rises.",
      "seconds": 16,
      "scenario": "A bank alert says your account will close unless you act now",
      "lesson": "Use the official bank app or saved number, never a surprise link."
    },
    {
      "id": "romance-evidence-bank",
      "type": "romanceEvidenceChat",
      "title": "Live Chat Evidence: Bank Phishing",
      "category": "Bank Phishing",
      "difficulty": "hard",
      "command": "COLLECT RED FLAGS \u2192 REPORT",
      "directions": "Messages appear one at a time. Tap scam red flags, then report/block the profile.",
      "seconds": 18,
      "scenario": "A bank alert says your account will close unless you act now",
      "profile": "Alex",
      "flags": [
        "money request",
        "secrecy",
        "urgent deadline",
        "external app",
        "fake emergency"
      ],
      "lesson": "Use the official bank app or saved number, never a surprise link."
    },
    {
      "id": "scam-whack-bank",
      "type": "scamWhack",
      "title": "Scam Whack: Bank Phishing",
      "category": "Bank Phishing",
      "difficulty": "easy",
      "command": "WHACK SCAMS ONLY",
      "directions": "Tap only scam popups as they appear. Do not hit safe reminders.",
      "seconds": 15,
      "scenario": "A bank alert says your account will close unless you act now",
      "scamLabels": [
        "VERIFY NOW",
        "FREE COINS",
        "PAY FEE",
        "SEND CODE",
        "REMOTE ACCESS",
        "GIFT CARD"
      ],
      "safeLabels": [
        "Calendar",
        "Known contact",
        "Official app",
        "School portal"
      ],
      "target": 6,
      "lesson": "Use the official bank app or saved number, never a surprise link."
    },
    {
      "id": "fake-ad-clean-bank",
      "type": "fakeAdClean",
      "title": "Ad Cleaner: Bank Phishing",
      "category": "Bank Phishing",
      "difficulty": "medium",
      "command": "CLOSE REAL X BUTTONS",
      "directions": "Clean the screen by closing real X buttons. Avoid fake download/allow buttons.",
      "seconds": 15,
      "scenario": "A bank alert says your account will close unless you act now",
      "lesson": "Use the official bank app or saved number, never a surprise link."
    },
    {
      "id": "shield-cursor-parcel",
      "type": "shieldCursor",
      "title": "Shield Cursor: Package Scam",
      "category": "Package Scam",
      "difficulty": "medium",
      "command": "MOVE SHIELD \u2192 BLOCK SCAM TEXTS",
      "directions": "Move the shield with mouse/touch or WASD. Block scam texts, but avoid blocking safe messages.",
      "seconds": 15,
      "scenario": "A delivery notice demands a small fee before tonight",
      "scamLabels": [
        "FREE COINS",
        "PAY FEE",
        "SEND CODE",
        "REMOTE ACCESS",
        "GIFT CARD"
      ],
      "safeLabels": [
        "Official app",
        "Saved number",
        "Trusted relative",
        "Known portal",
        "Report button"
      ],
      "target": 6,
      "lesson": "Use the official carrier website or app, not the text link."
    },
    {
      "id": "text-dodge-parcel",
      "type": "textDodge",
      "title": "Falling Text Dodge: Package Scam",
      "category": "Package Scam",
      "difficulty": "hard",
      "command": "LEFT/RIGHT \u2192 DODGE SCAMS, COLLECT VERIFY",
      "directions": "Move with A/D, arrow keys, or onscreen buttons. Dodge scam texts and collect verification stars.",
      "seconds": 16,
      "scenario": "A delivery notice demands a small fee before tonight",
      "scamLabels": [
        "SEND CODE",
        "REMOTE ACCESS",
        "GIFT CARD",
        "URGENT REFUND",
        "LOGIN FAST"
      ],
      "target": 4,
      "lesson": "Use the official carrier website or app, not the text link."
    },
    {
      "id": "packet-paddle-parcel",
      "type": "packetPaddle",
      "title": "Firewall Paddle: Package Scam",
      "category": "Package Scam",
      "difficulty": "easy",
      "command": "MOVE FIREWALL \u2192 BLOCK SCAM PACKETS",
      "directions": "Move the firewall paddle with mouse/touch or arrows. Block scam packets and let safe packets pass.",
      "seconds": 16,
      "scenario": "A delivery notice demands a small fee before tonight",
      "scamLabels": [
        "PAY FEE",
        "SEND CODE",
        "REMOTE ACCESS",
        "GIFT CARD",
        "URGENT REFUND"
      ],
      "safeLabels": [
        "Newsletter",
        "Known friend",
        "Receipt",
        "Class note",
        "Family photo"
      ],
      "target": 6,
      "lesson": "Use the official carrier website or app, not the text link."
    },
    {
      "id": "phone-sequence-parcel",
      "type": "phoneTapSequence",
      "title": "Phone Report Path: Package Scam",
      "category": "Package Scam",
      "difficulty": "medium",
      "command": "PHONE PATH \u2192 REPORT SAFELY",
      "directions": "Navigate the phone in the correct order: message, options, report/block, confirm.",
      "seconds": 17,
      "scenario": "A delivery notice demands a small fee before tonight",
      "message": "A delivery notice demands a small fee before tonight. Tap to claim: parcel-verify-fast.net",
      "sender": "PrizeBot",
      "steps": [
        "Open suspicious message",
        "Open sender options",
        "Report or block",
        "Confirm safety action"
      ],
      "lesson": "Use the official carrier website or app, not the text link."
    },
    {
      "id": "browser-patch-parcel",
      "type": "browserPatchRun",
      "title": "Browser Patch Run: Package Scam",
      "category": "Package Scam",
      "difficulty": "hard",
      "command": "CLOSE BAIT \u2192 STOP DOWNLOAD \u2192 CLEAR PERMISSION",
      "directions": "Fix the browser in the correct order while the danger meter rises.",
      "seconds": 16,
      "scenario": "A delivery notice demands a small fee before tonight",
      "lesson": "Use the official carrier website or app, not the text link."
    },
    {
      "id": "romance-evidence-parcel",
      "type": "romanceEvidenceChat",
      "title": "Live Chat Evidence: Package Scam",
      "category": "Package Scam",
      "difficulty": "easy",
      "command": "COLLECT RED FLAGS \u2192 REPORT",
      "directions": "Messages appear one at a time. Tap scam red flags, then report/block the profile.",
      "seconds": 18,
      "scenario": "A delivery notice demands a small fee before tonight",
      "profile": "Mia",
      "flags": [
        "money request",
        "secrecy",
        "urgent deadline",
        "external app",
        "fake emergency"
      ],
      "lesson": "Use the official carrier website or app, not the text link."
    },
    {
      "id": "scam-whack-parcel",
      "type": "scamWhack",
      "title": "Scam Whack: Package Scam",
      "category": "Package Scam",
      "difficulty": "medium",
      "command": "WHACK SCAMS ONLY",
      "directions": "Tap only scam popups as they appear. Do not hit safe reminders.",
      "seconds": 15,
      "scenario": "A delivery notice demands a small fee before tonight",
      "scamLabels": [
        "VERIFY NOW",
        "FREE COINS",
        "PAY FEE",
        "SEND CODE",
        "REMOTE ACCESS",
        "GIFT CARD"
      ],
      "safeLabels": [
        "Calendar",
        "Known contact",
        "Official app",
        "School portal"
      ],
      "target": 7,
      "lesson": "Use the official carrier website or app, not the text link."
    },
    {
      "id": "fake-ad-clean-parcel",
      "type": "fakeAdClean",
      "title": "Ad Cleaner: Package Scam",
      "category": "Package Scam",
      "difficulty": "hard",
      "command": "CLOSE REAL X BUTTONS",
      "directions": "Clean the screen by closing real X buttons. Avoid fake download/allow buttons.",
      "seconds": 15,
      "scenario": "A delivery notice demands a small fee before tonight",
      "lesson": "Use the official carrier website or app, not the text link."
    },
    {
      "id": "shield-cursor-game",
      "type": "shieldCursor",
      "title": "Shield Cursor: Gaming Scam",
      "category": "Gaming Scam",
      "difficulty": "hard",
      "command": "MOVE SHIELD \u2192 BLOCK SCAM TEXTS",
      "directions": "Move the shield with mouse/touch or WASD. Block scam texts, but avoid blocking safe messages.",
      "seconds": 13,
      "scenario": "A player offers free coins if you open a prize link",
      "scamLabels": [
        "PAY FEE",
        "SEND CODE",
        "REMOTE ACCESS",
        "GIFT CARD",
        "URGENT REFUND"
      ],
      "safeLabels": [
        "Official app",
        "Saved number",
        "Trusted relative",
        "Known portal",
        "Report button"
      ],
      "target": 7,
      "lesson": "Report the player and never log in through prize links."
    },
    {
      "id": "text-dodge-game",
      "type": "textDodge",
      "title": "Falling Text Dodge: Gaming Scam",
      "category": "Gaming Scam",
      "difficulty": "easy",
      "command": "LEFT/RIGHT \u2192 DODGE SCAMS, COLLECT VERIFY",
      "directions": "Move with A/D, arrow keys, or onscreen buttons. Dodge scam texts and collect verification stars.",
      "seconds": 13,
      "scenario": "A player offers free coins if you open a prize link",
      "scamLabels": [
        "REMOTE ACCESS",
        "GIFT CARD",
        "URGENT REFUND",
        "LOGIN FAST",
        "SECRET DEAL"
      ],
      "target": 5,
      "lesson": "Report the player and never log in through prize links."
    },
    {
      "id": "packet-paddle-game",
      "type": "packetPaddle",
      "title": "Firewall Paddle: Gaming Scam",
      "category": "Gaming Scam",
      "difficulty": "medium",
      "command": "MOVE FIREWALL \u2192 BLOCK SCAM PACKETS",
      "directions": "Move the firewall paddle with mouse/touch or arrows. Block scam packets and let safe packets pass.",
      "seconds": 14,
      "scenario": "A player offers free coins if you open a prize link",
      "scamLabels": [
        "SEND CODE",
        "REMOTE ACCESS",
        "GIFT CARD",
        "URGENT REFUND",
        "LOGIN FAST"
      ],
      "safeLabels": [
        "Newsletter",
        "Known friend",
        "Receipt",
        "Class note",
        "Family photo"
      ],
      "target": 7,
      "lesson": "Report the player and never log in through prize links."
    },
    {
      "id": "phone-sequence-game",
      "type": "phoneTapSequence",
      "title": "Phone Report Path: Gaming Scam",
      "category": "Gaming Scam",
      "difficulty": "hard",
      "command": "PHONE PATH \u2192 REPORT SAFELY",
      "directions": "Navigate the phone in the correct order: message, options, report/block, confirm.",
      "seconds": 14,
      "scenario": "A player offers free coins if you open a prize link",
      "message": "A player offers free coins if you open a prize link. Tap to claim: game-verify-fast.net",
      "sender": "Security Alert",
      "steps": [
        "Open suspicious message",
        "Open sender options",
        "Report or block",
        "Confirm safety action"
      ],
      "lesson": "Report the player and never log in through prize links."
    },
    {
      "id": "browser-patch-game",
      "type": "browserPatchRun",
      "title": "Browser Patch Run: Gaming Scam",
      "category": "Gaming Scam",
      "difficulty": "easy",
      "command": "CLOSE BAIT \u2192 STOP DOWNLOAD \u2192 CLEAR PERMISSION",
      "directions": "Fix the browser in the correct order while the danger meter rises.",
      "seconds": 13,
      "scenario": "A player offers free coins if you open a prize link",
      "lesson": "Report the player and never log in through prize links."
    },
    {
      "id": "romance-evidence-game",
      "type": "romanceEvidenceChat",
      "title": "Live Chat Evidence: Gaming Scam",
      "category": "Gaming Scam",
      "difficulty": "medium",
      "command": "COLLECT RED FLAGS \u2192 REPORT",
      "directions": "Messages appear one at a time. Tap scam red flags, then report/block the profile.",
      "seconds": 15,
      "scenario": "A player offers free coins if you open a prize link",
      "profile": "Jordan",
      "flags": [
        "money request",
        "secrecy",
        "urgent deadline",
        "external app",
        "fake emergency"
      ],
      "lesson": "Report the player and never log in through prize links."
    },
    {
      "id": "scam-whack-game",
      "type": "scamWhack",
      "title": "Scam Whack: Gaming Scam",
      "category": "Gaming Scam",
      "difficulty": "hard",
      "command": "WHACK SCAMS ONLY",
      "directions": "Tap only scam popups as they appear. Do not hit safe reminders.",
      "seconds": 12,
      "scenario": "A player offers free coins if you open a prize link",
      "scamLabels": [
        "VERIFY NOW",
        "FREE COINS",
        "PAY FEE",
        "SEND CODE",
        "REMOTE ACCESS",
        "GIFT CARD"
      ],
      "safeLabels": [
        "Calendar",
        "Known contact",
        "Official app",
        "School portal"
      ],
      "target": 8,
      "lesson": "Report the player and never log in through prize links."
    },
    {
      "id": "fake-ad-clean-game",
      "type": "fakeAdClean",
      "title": "Ad Cleaner: Gaming Scam",
      "category": "Gaming Scam",
      "difficulty": "easy",
      "command": "CLOSE REAL X BUTTONS",
      "directions": "Clean the screen by closing real X buttons. Avoid fake download/allow buttons.",
      "seconds": 12,
      "scenario": "A player offers free coins if you open a prize link",
      "lesson": "Report the player and never log in through prize links."
    },
    {
      "id": "shield-cursor-romance",
      "type": "shieldCursor",
      "title": "Shield Cursor: Romance Scam",
      "category": "Romance Scam",
      "difficulty": "easy",
      "command": "MOVE SHIELD \u2192 BLOCK SCAM TEXTS",
      "directions": "Move the shield with mouse/touch or WASD. Block scam texts, but avoid blocking safe messages.",
      "seconds": 15,
      "scenario": "A new online match starts asking for help and money",
      "scamLabels": [
        "SEND CODE",
        "REMOTE ACCESS",
        "GIFT CARD",
        "URGENT REFUND",
        "LOGIN FAST"
      ],
      "safeLabels": [
        "Official app",
        "Saved number",
        "Trusted relative",
        "Known portal",
        "Report button"
      ],
      "target": 5,
      "lesson": "Romance pressure plus money requests are red flags."
    },
    {
      "id": "text-dodge-romance",
      "type": "textDodge",
      "title": "Falling Text Dodge: Romance Scam",
      "category": "Romance Scam",
      "difficulty": "medium",
      "command": "LEFT/RIGHT \u2192 DODGE SCAMS, COLLECT VERIFY",
      "directions": "Move with A/D, arrow keys, or onscreen buttons. Dodge scam texts and collect verification stars.",
      "seconds": 16,
      "scenario": "A new online match starts asking for help and money",
      "scamLabels": [
        "VERIFY NOW",
        "FREE COINS",
        "PAY FEE",
        "SEND CODE",
        "REMOTE ACCESS"
      ],
      "target": 3,
      "lesson": "Romance pressure plus money requests are red flags."
    },
    {
      "id": "packet-paddle-romance",
      "type": "packetPaddle",
      "title": "Firewall Paddle: Romance Scam",
      "category": "Romance Scam",
      "difficulty": "hard",
      "command": "MOVE FIREWALL \u2192 BLOCK SCAM PACKETS",
      "directions": "Move the firewall paddle with mouse/touch or arrows. Block scam packets and let safe packets pass.",
      "seconds": 16,
      "scenario": "A new online match starts asking for help and money",
      "scamLabels": [
        "VERIFY NOW",
        "FREE COINS",
        "PAY FEE",
        "SEND CODE",
        "REMOTE ACCESS"
      ],
      "safeLabels": [
        "Newsletter",
        "Known friend",
        "Receipt",
        "Class note",
        "Family photo"
      ],
      "target": 5,
      "lesson": "Romance pressure plus money requests are red flags."
    },
    {
      "id": "phone-sequence-romance",
      "type": "phoneTapSequence",
      "title": "Phone Report Path: Romance Scam",
      "category": "Romance Scam",
      "difficulty": "easy",
      "command": "PHONE PATH \u2192 REPORT SAFELY",
      "directions": "Navigate the phone in the correct order: message, options, report/block, confirm.",
      "seconds": 17,
      "scenario": "A new online match starts asking for help and money",
      "message": "A new online match starts asking for help and money. Tap to claim: romance-verify-fast.net",
      "sender": "New Number",
      "steps": [
        "Open suspicious message",
        "Open sender options",
        "Report or block",
        "Confirm safety action"
      ],
      "lesson": "Romance pressure plus money requests are red flags."
    },
    {
      "id": "browser-patch-romance",
      "type": "browserPatchRun",
      "title": "Browser Patch Run: Romance Scam",
      "category": "Romance Scam",
      "difficulty": "medium",
      "command": "CLOSE BAIT \u2192 STOP DOWNLOAD \u2192 CLEAR PERMISSION",
      "directions": "Fix the browser in the correct order while the danger meter rises.",
      "seconds": 16,
      "scenario": "A new online match starts asking for help and money",
      "lesson": "Romance pressure plus money requests are red flags."
    },
    {
      "id": "romance-evidence-romance",
      "type": "romanceEvidenceChat",
      "title": "Live Chat Evidence: Romance Scam",
      "category": "Romance Scam",
      "difficulty": "hard",
      "command": "COLLECT RED FLAGS \u2192 REPORT",
      "directions": "Messages appear one at a time. Tap scam red flags, then report/block the profile.",
      "seconds": 18,
      "scenario": "A new online match starts asking for help and money",
      "profile": "Sam",
      "flags": [
        "money request",
        "secrecy",
        "urgent deadline",
        "external app",
        "fake emergency"
      ],
      "lesson": "Romance pressure plus money requests are red flags."
    },
    {
      "id": "scam-whack-romance",
      "type": "scamWhack",
      "title": "Scam Whack: Romance Scam",
      "category": "Romance Scam",
      "difficulty": "easy",
      "command": "WHACK SCAMS ONLY",
      "directions": "Tap only scam popups as they appear. Do not hit safe reminders.",
      "seconds": 15,
      "scenario": "A new online match starts asking for help and money",
      "scamLabels": [
        "VERIFY NOW",
        "FREE COINS",
        "PAY FEE",
        "SEND CODE",
        "REMOTE ACCESS",
        "GIFT CARD"
      ],
      "safeLabels": [
        "Calendar",
        "Known contact",
        "Official app",
        "School portal"
      ],
      "target": 6,
      "lesson": "Romance pressure plus money requests are red flags."
    },
    {
      "id": "fake-ad-clean-romance",
      "type": "fakeAdClean",
      "title": "Ad Cleaner: Romance Scam",
      "category": "Romance Scam",
      "difficulty": "medium",
      "command": "CLOSE REAL X BUTTONS",
      "directions": "Clean the screen by closing real X buttons. Avoid fake download/allow buttons.",
      "seconds": 15,
      "scenario": "A new online match starts asking for help and money",
      "lesson": "Romance pressure plus money requests are red flags."
    },
    {
      "id": "shield-cursor-job",
      "type": "shieldCursor",
      "title": "Shield Cursor: Job Scam",
      "category": "Job Scam",
      "difficulty": "medium",
      "command": "MOVE SHIELD \u2192 BLOCK SCAM TEXTS",
      "directions": "Move the shield with mouse/touch or WASD. Block scam texts, but avoid blocking safe messages.",
      "seconds": 15,
      "scenario": "A remote job says you must buy equipment before interview",
      "scamLabels": [
        "VERIFY NOW",
        "FREE COINS",
        "PAY FEE",
        "SEND CODE",
        "REMOTE ACCESS"
      ],
      "safeLabels": [
        "Official app",
        "Saved number",
        "Trusted relative",
        "Known portal",
        "Report button"
      ],
      "target": 6,
      "lesson": "Real employers do not require upfront payment."
    },
    {
      "id": "text-dodge-job",
      "type": "textDodge",
      "title": "Falling Text Dodge: Job Scam",
      "category": "Job Scam",
      "difficulty": "hard",
      "command": "LEFT/RIGHT \u2192 DODGE SCAMS, COLLECT VERIFY",
      "directions": "Move with A/D, arrow keys, or onscreen buttons. Dodge scam texts and collect verification stars.",
      "seconds": 16,
      "scenario": "A remote job says you must buy equipment before interview",
      "scamLabels": [
        "FREE COINS",
        "PAY FEE",
        "SEND CODE",
        "REMOTE ACCESS",
        "GIFT CARD"
      ],
      "target": 4,
      "lesson": "Real employers do not require upfront payment."
    },
    {
      "id": "packet-paddle-job",
      "type": "packetPaddle",
      "title": "Firewall Paddle: Job Scam",
      "category": "Job Scam",
      "difficulty": "easy",
      "command": "MOVE FIREWALL \u2192 BLOCK SCAM PACKETS",
      "directions": "Move the firewall paddle with mouse/touch or arrows. Block scam packets and let safe packets pass.",
      "seconds": 16,
      "scenario": "A remote job says you must buy equipment before interview",
      "scamLabels": [
        "FREE COINS",
        "PAY FEE",
        "SEND CODE",
        "REMOTE ACCESS",
        "GIFT CARD"
      ],
      "safeLabels": [
        "Newsletter",
        "Known friend",
        "Receipt",
        "Class note",
        "Family photo"
      ],
      "target": 6,
      "lesson": "Real employers do not require upfront payment."
    },
    {
      "id": "phone-sequence-job",
      "type": "phoneTapSequence",
      "title": "Phone Report Path: Job Scam",
      "category": "Job Scam",
      "difficulty": "medium",
      "command": "PHONE PATH \u2192 REPORT SAFELY",
      "directions": "Navigate the phone in the correct order: message, options, report/block, confirm.",
      "seconds": 17,
      "scenario": "A remote job says you must buy equipment before interview",
      "message": "A remote job says you must buy equipment before interview. Tap to claim: job-verify-fast.net",
      "sender": "Unknown",
      "steps": [
        "Open suspicious message",
        "Open sender options",
        "Report or block",
        "Confirm safety action"
      ],
      "lesson": "Real employers do not require upfront payment."
    },
    {
      "id": "browser-patch-job",
      "type": "browserPatchRun",
      "title": "Browser Patch Run: Job Scam",
      "category": "Job Scam",
      "difficulty": "hard",
      "command": "CLOSE BAIT \u2192 STOP DOWNLOAD \u2192 CLEAR PERMISSION",
      "directions": "Fix the browser in the correct order while the danger meter rises.",
      "seconds": 16,
      "scenario": "A remote job says you must buy equipment before interview",
      "lesson": "Real employers do not require upfront payment."
    },
    {
      "id": "romance-evidence-job",
      "type": "romanceEvidenceChat",
      "title": "Live Chat Evidence: Job Scam",
      "category": "Job Scam",
      "difficulty": "easy",
      "command": "COLLECT RED FLAGS \u2192 REPORT",
      "directions": "Messages appear one at a time. Tap scam red flags, then report/block the profile.",
      "seconds": 18,
      "scenario": "A remote job says you must buy equipment before interview",
      "profile": "Taylor",
      "flags": [
        "money request",
        "secrecy",
        "urgent deadline",
        "external app",
        "fake emergency"
      ],
      "lesson": "Real employers do not require upfront payment."
    },
    {
      "id": "scam-whack-job",
      "type": "scamWhack",
      "title": "Scam Whack: Job Scam",
      "category": "Job Scam",
      "difficulty": "medium",
      "command": "WHACK SCAMS ONLY",
      "directions": "Tap only scam popups as they appear. Do not hit safe reminders.",
      "seconds": 15,
      "scenario": "A remote job says you must buy equipment before interview",
      "scamLabels": [
        "VERIFY NOW",
        "FREE COINS",
        "PAY FEE",
        "SEND CODE",
        "REMOTE ACCESS",
        "GIFT CARD"
      ],
      "safeLabels": [
        "Calendar",
        "Known contact",
        "Official app",
        "School portal"
      ],
      "target": 7,
      "lesson": "Real employers do not require upfront payment."
    },
    {
      "id": "fake-ad-clean-job",
      "type": "fakeAdClean",
      "title": "Ad Cleaner: Job Scam",
      "category": "Job Scam",
      "difficulty": "hard",
      "command": "CLOSE REAL X BUTTONS",
      "directions": "Clean the screen by closing real X buttons. Avoid fake download/allow buttons.",
      "seconds": 15,
      "scenario": "A remote job says you must buy equipment before interview",
      "lesson": "Real employers do not require upfront payment."
    },
    {
      "id": "shield-cursor-crypto",
      "type": "shieldCursor",
      "title": "Shield Cursor: Investment Scam",
      "category": "Investment Scam",
      "difficulty": "hard",
      "command": "MOVE SHIELD \u2192 BLOCK SCAM TEXTS",
      "directions": "Move the shield with mouse/touch or WASD. Block scam texts, but avoid blocking safe messages.",
      "seconds": 13,
      "scenario": "An advisor promises guaranteed returns before midnight",
      "scamLabels": [
        "FREE COINS",
        "PAY FEE",
        "SEND CODE",
        "REMOTE ACCESS",
        "GIFT CARD"
      ],
      "safeLabels": [
        "Official app",
        "Saved number",
        "Trusted relative",
        "Known portal",
        "Report button"
      ],
      "target": 7,
      "lesson": "Guaranteed returns and urgency are scam signals."
    },
    {
      "id": "text-dodge-crypto",
      "type": "textDodge",
      "title": "Falling Text Dodge: Investment Scam",
      "category": "Investment Scam",
      "difficulty": "easy",
      "command": "LEFT/RIGHT \u2192 DODGE SCAMS, COLLECT VERIFY",
      "directions": "Move with A/D, arrow keys, or onscreen buttons. Dodge scam texts and collect verification stars.",
      "seconds": 13,
      "scenario": "An advisor promises guaranteed returns before midnight",
      "scamLabels": [
        "PAY FEE",
        "SEND CODE",
        "REMOTE ACCESS",
        "GIFT CARD",
        "URGENT REFUND"
      ],
      "target": 5,
      "lesson": "Guaranteed returns and urgency are scam signals."
    },
    {
      "id": "packet-paddle-crypto",
      "type": "packetPaddle",
      "title": "Firewall Paddle: Investment Scam",
      "category": "Investment Scam",
      "difficulty": "medium",
      "command": "MOVE FIREWALL \u2192 BLOCK SCAM PACKETS",
      "directions": "Move the firewall paddle with mouse/touch or arrows. Block scam packets and let safe packets pass.",
      "seconds": 14,
      "scenario": "An advisor promises guaranteed returns before midnight",
      "scamLabels": [
        "PAY FEE",
        "SEND CODE",
        "REMOTE ACCESS",
        "GIFT CARD",
        "URGENT REFUND"
      ],
      "safeLabels": [
        "Newsletter",
        "Known friend",
        "Receipt",
        "Class note",
        "Family photo"
      ],
      "target": 7,
      "lesson": "Guaranteed returns and urgency are scam signals."
    },
    {
      "id": "phone-sequence-crypto",
      "type": "phoneTapSequence",
      "title": "Phone Report Path: Investment Scam",
      "category": "Investment Scam",
      "difficulty": "hard",
      "command": "PHONE PATH \u2192 REPORT SAFELY",
      "directions": "Navigate the phone in the correct order: message, options, report/block, confirm.",
      "seconds": 14,
      "scenario": "An advisor promises guaranteed returns before midnight",
      "message": "An advisor promises guaranteed returns before midnight. Tap to claim: crypto-verify-fast.net",
      "sender": "PrizeBot",
      "steps": [
        "Open suspicious message",
        "Open sender options",
        "Report or block",
        "Confirm safety action"
      ],
      "lesson": "Guaranteed returns and urgency are scam signals."
    },
    {
      "id": "browser-patch-crypto",
      "type": "browserPatchRun",
      "title": "Browser Patch Run: Investment Scam",
      "category": "Investment Scam",
      "difficulty": "easy",
      "command": "CLOSE BAIT \u2192 STOP DOWNLOAD \u2192 CLEAR PERMISSION",
      "directions": "Fix the browser in the correct order while the danger meter rises.",
      "seconds": 13,
      "scenario": "An advisor promises guaranteed returns before midnight",
      "lesson": "Guaranteed returns and urgency are scam signals."
    },
    {
      "id": "romance-evidence-crypto",
      "type": "romanceEvidenceChat",
      "title": "Live Chat Evidence: Investment Scam",
      "category": "Investment Scam",
      "difficulty": "medium",
      "command": "COLLECT RED FLAGS \u2192 REPORT",
      "directions": "Messages appear one at a time. Tap scam red flags, then report/block the profile.",
      "seconds": 15,
      "scenario": "An advisor promises guaranteed returns before midnight",
      "profile": "Riley",
      "flags": [
        "money request",
        "secrecy",
        "urgent deadline",
        "external app",
        "fake emergency"
      ],
      "lesson": "Guaranteed returns and urgency are scam signals."
    },
    {
      "id": "scam-whack-crypto",
      "type": "scamWhack",
      "title": "Scam Whack: Investment Scam",
      "category": "Investment Scam",
      "difficulty": "hard",
      "command": "WHACK SCAMS ONLY",
      "directions": "Tap only scam popups as they appear. Do not hit safe reminders.",
      "seconds": 12,
      "scenario": "An advisor promises guaranteed returns before midnight",
      "scamLabels": [
        "VERIFY NOW",
        "FREE COINS",
        "PAY FEE",
        "SEND CODE",
        "REMOTE ACCESS",
        "GIFT CARD"
      ],
      "safeLabels": [
        "Calendar",
        "Known contact",
        "Official app",
        "School portal"
      ],
      "target": 8,
      "lesson": "Guaranteed returns and urgency are scam signals."
    },
    {
      "id": "fake-ad-clean-crypto",
      "type": "fakeAdClean",
      "title": "Ad Cleaner: Investment Scam",
      "category": "Investment Scam",
      "difficulty": "easy",
      "command": "CLOSE REAL X BUTTONS",
      "directions": "Clean the screen by closing real X buttons. Avoid fake download/allow buttons.",
      "seconds": 12,
      "scenario": "An advisor promises guaranteed returns before midnight",
      "lesson": "Guaranteed returns and urgency are scam signals."
    },
    {
      "id": "shield-cursor-school",
      "type": "shieldCursor",
      "title": "Shield Cursor: University Phishing",
      "category": "University Phishing",
      "difficulty": "easy",
      "command": "MOVE SHIELD \u2192 BLOCK SCAM TEXTS",
      "directions": "Move the shield with mouse/touch or WASD. Block scam texts, but avoid blocking safe messages.",
      "seconds": 15,
      "scenario": "A campus message asks for your password or MFA code",
      "scamLabels": [
        "PAY FEE",
        "SEND CODE",
        "REMOTE ACCESS",
        "GIFT CARD",
        "URGENT REFUND"
      ],
      "safeLabels": [
        "Official app",
        "Saved number",
        "Trusted relative",
        "Known portal",
        "Report button"
      ],
      "target": 5,
      "lesson": "Use the official portal and never share codes."
    },
    {
      "id": "text-dodge-school",
      "type": "textDodge",
      "title": "Falling Text Dodge: University Phishing",
      "category": "University Phishing",
      "difficulty": "medium",
      "command": "LEFT/RIGHT \u2192 DODGE SCAMS, COLLECT VERIFY",
      "directions": "Move with A/D, arrow keys, or onscreen buttons. Dodge scam texts and collect verification stars.",
      "seconds": 16,
      "scenario": "A campus message asks for your password or MFA code",
      "scamLabels": [
        "SEND CODE",
        "REMOTE ACCESS",
        "GIFT CARD",
        "URGENT REFUND",
        "LOGIN FAST"
      ],
      "target": 3,
      "lesson": "Use the official portal and never share codes."
    },
    {
      "id": "packet-paddle-school",
      "type": "packetPaddle",
      "title": "Firewall Paddle: University Phishing",
      "category": "University Phishing",
      "difficulty": "hard",
      "command": "MOVE FIREWALL \u2192 BLOCK SCAM PACKETS",
      "directions": "Move the firewall paddle with mouse/touch or arrows. Block scam packets and let safe packets pass.",
      "seconds": 16,
      "scenario": "A campus message asks for your password or MFA code",
      "scamLabels": [
        "SEND CODE",
        "REMOTE ACCESS",
        "GIFT CARD",
        "URGENT REFUND",
        "LOGIN FAST"
      ],
      "safeLabels": [
        "Newsletter",
        "Known friend",
        "Receipt",
        "Class note",
        "Family photo"
      ],
      "target": 5,
      "lesson": "Use the official portal and never share codes."
    },
    {
      "id": "phone-sequence-school",
      "type": "phoneTapSequence",
      "title": "Phone Report Path: University Phishing",
      "category": "University Phishing",
      "difficulty": "easy",
      "command": "PHONE PATH \u2192 REPORT SAFELY",
      "directions": "Navigate the phone in the correct order: message, options, report/block, confirm.",
      "seconds": 17,
      "scenario": "A campus message asks for your password or MFA code",
      "message": "A campus message asks for your password or MFA code. Tap to claim: school-verify-fast.net",
      "sender": "Security Alert",
      "steps": [
        "Open suspicious message",
        "Open sender options",
        "Report or block",
        "Confirm safety action"
      ],
      "lesson": "Use the official portal and never share codes."
    },
    {
      "id": "browser-patch-school",
      "type": "browserPatchRun",
      "title": "Browser Patch Run: University Phishing",
      "category": "University Phishing",
      "difficulty": "medium",
      "command": "CLOSE BAIT \u2192 STOP DOWNLOAD \u2192 CLEAR PERMISSION",
      "directions": "Fix the browser in the correct order while the danger meter rises.",
      "seconds": 16,
      "scenario": "A campus message asks for your password or MFA code",
      "lesson": "Use the official portal and never share codes."
    },
    {
      "id": "romance-evidence-school",
      "type": "romanceEvidenceChat",
      "title": "Live Chat Evidence: University Phishing",
      "category": "University Phishing",
      "difficulty": "hard",
      "command": "COLLECT RED FLAGS \u2192 REPORT",
      "directions": "Messages appear one at a time. Tap scam red flags, then report/block the profile.",
      "seconds": 18,
      "scenario": "A campus message asks for your password or MFA code",
      "profile": "Alex",
      "flags": [
        "money request",
        "secrecy",
        "urgent deadline",
        "external app",
        "fake emergency"
      ],
      "lesson": "Use the official portal and never share codes."
    },
    {
      "id": "scam-whack-school",
      "type": "scamWhack",
      "title": "Scam Whack: University Phishing",
      "category": "University Phishing",
      "difficulty": "easy",
      "command": "WHACK SCAMS ONLY",
      "directions": "Tap only scam popups as they appear. Do not hit safe reminders.",
      "seconds": 15,
      "scenario": "A campus message asks for your password or MFA code",
      "scamLabels": [
        "VERIFY NOW",
        "FREE COINS",
        "PAY FEE",
        "SEND CODE",
        "REMOTE ACCESS",
        "GIFT CARD"
      ],
      "safeLabels": [
        "Calendar",
        "Known contact",
        "Official app",
        "School portal"
      ],
      "target": 6,
      "lesson": "Use the official portal and never share codes."
    },
    {
      "id": "fake-ad-clean-school",
      "type": "fakeAdClean",
      "title": "Ad Cleaner: University Phishing",
      "category": "University Phishing",
      "difficulty": "medium",
      "command": "CLOSE REAL X BUTTONS",
      "directions": "Clean the screen by closing real X buttons. Avoid fake download/allow buttons.",
      "seconds": 15,
      "scenario": "A campus message asks for your password or MFA code",
      "lesson": "Use the official portal and never share codes."
    },
    {
      "id": "shield-cursor-health",
      "type": "shieldCursor",
      "title": "Shield Cursor: Health Fraud",
      "category": "Health Fraud",
      "difficulty": "medium",
      "command": "MOVE SHIELD \u2192 BLOCK SCAM TEXTS",
      "directions": "Move the shield with mouse/touch or WASD. Block scam texts, but avoid blocking safe messages.",
      "seconds": 15,
      "scenario": "A health update page asks for Medicare or SSN details",
      "scamLabels": [
        "SEND CODE",
        "REMOTE ACCESS",
        "GIFT CARD",
        "URGENT REFUND",
        "LOGIN FAST"
      ],
      "safeLabels": [
        "Official app",
        "Saved number",
        "Trusted relative",
        "Known portal",
        "Report button"
      ],
      "target": 6,
      "lesson": "Verify benefits through official sources."
    },
    {
      "id": "text-dodge-health",
      "type": "textDodge",
      "title": "Falling Text Dodge: Health Fraud",
      "category": "Health Fraud",
      "difficulty": "hard",
      "command": "LEFT/RIGHT \u2192 DODGE SCAMS, COLLECT VERIFY",
      "directions": "Move with A/D, arrow keys, or onscreen buttons. Dodge scam texts and collect verification stars.",
      "seconds": 16,
      "scenario": "A health update page asks for Medicare or SSN details",
      "scamLabels": [
        "REMOTE ACCESS",
        "GIFT CARD",
        "URGENT REFUND",
        "LOGIN FAST",
        "SECRET DEAL"
      ],
      "target": 4,
      "lesson": "Verify benefits through official sources."
    },
    {
      "id": "packet-paddle-health",
      "type": "packetPaddle",
      "title": "Firewall Paddle: Health Fraud",
      "category": "Health Fraud",
      "difficulty": "easy",
      "command": "MOVE FIREWALL \u2192 BLOCK SCAM PACKETS",
      "directions": "Move the firewall paddle with mouse/touch or arrows. Block scam packets and let safe packets pass.",
      "seconds": 16,
      "scenario": "A health update page asks for Medicare or SSN details",
      "scamLabels": [
        "VERIFY NOW",
        "FREE COINS",
        "PAY FEE",
        "SEND CODE",
        "REMOTE ACCESS"
      ],
      "safeLabels": [
        "Newsletter",
        "Known friend",
        "Receipt",
        "Class note",
        "Family photo"
      ],
      "target": 6,
      "lesson": "Verify benefits through official sources."
    },
    {
      "id": "phone-sequence-health",
      "type": "phoneTapSequence",
      "title": "Phone Report Path: Health Fraud",
      "category": "Health Fraud",
      "difficulty": "medium",
      "command": "PHONE PATH \u2192 REPORT SAFELY",
      "directions": "Navigate the phone in the correct order: message, options, report/block, confirm.",
      "seconds": 17,
      "scenario": "A health update page asks for Medicare or SSN details",
      "message": "A health update page asks for Medicare or SSN details. Tap to claim: health-verify-fast.net",
      "sender": "New Number",
      "steps": [
        "Open suspicious message",
        "Open sender options",
        "Report or block",
        "Confirm safety action"
      ],
      "lesson": "Verify benefits through official sources."
    },
    {
      "id": "browser-patch-health",
      "type": "browserPatchRun",
      "title": "Browser Patch Run: Health Fraud",
      "category": "Health Fraud",
      "difficulty": "hard",
      "command": "CLOSE BAIT \u2192 STOP DOWNLOAD \u2192 CLEAR PERMISSION",
      "directions": "Fix the browser in the correct order while the danger meter rises.",
      "seconds": 16,
      "scenario": "A health update page asks for Medicare or SSN details",
      "lesson": "Verify benefits through official sources."
    },
    {
      "id": "romance-evidence-health",
      "type": "romanceEvidenceChat",
      "title": "Live Chat Evidence: Health Fraud",
      "category": "Health Fraud",
      "difficulty": "easy",
      "command": "COLLECT RED FLAGS \u2192 REPORT",
      "directions": "Messages appear one at a time. Tap scam red flags, then report/block the profile.",
      "seconds": 18,
      "scenario": "A health update page asks for Medicare or SSN details",
      "profile": "Mia",
      "flags": [
        "money request",
        "secrecy",
        "urgent deadline",
        "external app",
        "fake emergency"
      ],
      "lesson": "Verify benefits through official sources."
    },
    {
      "id": "scam-whack-health",
      "type": "scamWhack",
      "title": "Scam Whack: Health Fraud",
      "category": "Health Fraud",
      "difficulty": "medium",
      "command": "WHACK SCAMS ONLY",
      "directions": "Tap only scam popups as they appear. Do not hit safe reminders.",
      "seconds": 15,
      "scenario": "A health update page asks for Medicare or SSN details",
      "scamLabels": [
        "VERIFY NOW",
        "FREE COINS",
        "PAY FEE",
        "SEND CODE",
        "REMOTE ACCESS",
        "GIFT CARD"
      ],
      "safeLabels": [
        "Calendar",
        "Known contact",
        "Official app",
        "School portal"
      ],
      "target": 7,
      "lesson": "Verify benefits through official sources."
    },
    {
      "id": "fake-ad-clean-health",
      "type": "fakeAdClean",
      "title": "Ad Cleaner: Health Fraud",
      "category": "Health Fraud",
      "difficulty": "hard",
      "command": "CLOSE REAL X BUTTONS",
      "directions": "Clean the screen by closing real X buttons. Avoid fake download/allow buttons.",
      "seconds": 15,
      "scenario": "A health update page asks for Medicare or SSN details",
      "lesson": "Verify benefits through official sources."
    },
    {
      "id": "shield-cursor-ai",
      "type": "shieldCursor",
      "title": "Shield Cursor: AI Tool Malware",
      "category": "AI Tool Malware",
      "difficulty": "hard",
      "command": "MOVE SHIELD \u2192 BLOCK SCAM TEXTS",
      "directions": "Move the shield with mouse/touch or WASD. Block scam texts, but avoid blocking safe messages.",
      "seconds": 13,
      "scenario": "A free AI unlocker wants you to install a helper app",
      "scamLabels": [
        "VERIFY NOW",
        "FREE COINS",
        "PAY FEE",
        "SEND CODE",
        "REMOTE ACCESS"
      ],
      "safeLabels": [
        "Official app",
        "Saved number",
        "Trusted relative",
        "Known portal",
        "Report button"
      ],
      "target": 7,
      "lesson": "Cracked AI tools and unlockers are malware risks."
    },
    {
      "id": "text-dodge-ai",
      "type": "textDodge",
      "title": "Falling Text Dodge: AI Tool Malware",
      "category": "AI Tool Malware",
      "difficulty": "easy",
      "command": "LEFT/RIGHT \u2192 DODGE SCAMS, COLLECT VERIFY",
      "directions": "Move with A/D, arrow keys, or onscreen buttons. Dodge scam texts and collect verification stars.",
      "seconds": 13,
      "scenario": "A free AI unlocker wants you to install a helper app",
      "scamLabels": [
        "VERIFY NOW",
        "FREE COINS",
        "PAY FEE",
        "SEND CODE",
        "REMOTE ACCESS"
      ],
      "target": 5,
      "lesson": "Cracked AI tools and unlockers are malware risks."
    },
    {
      "id": "packet-paddle-ai",
      "type": "packetPaddle",
      "title": "Firewall Paddle: AI Tool Malware",
      "category": "AI Tool Malware",
      "difficulty": "medium",
      "command": "MOVE FIREWALL \u2192 BLOCK SCAM PACKETS",
      "directions": "Move the firewall paddle with mouse/touch or arrows. Block scam packets and let safe packets pass.",
      "seconds": 14,
      "scenario": "A free AI unlocker wants you to install a helper app",
      "scamLabels": [
        "FREE COINS",
        "PAY FEE",
        "SEND CODE",
        "REMOTE ACCESS",
        "GIFT CARD"
      ],
      "safeLabels": [
        "Newsletter",
        "Known friend",
        "Receipt",
        "Class note",
        "Family photo"
      ],
      "target": 7,
      "lesson": "Cracked AI tools and unlockers are malware risks."
    },
    {
      "id": "phone-sequence-ai",
      "type": "phoneTapSequence",
      "title": "Phone Report Path: AI Tool Malware",
      "category": "AI Tool Malware",
      "difficulty": "hard",
      "command": "PHONE PATH \u2192 REPORT SAFELY",
      "directions": "Navigate the phone in the correct order: message, options, report/block, confirm.",
      "seconds": 14,
      "scenario": "A free AI unlocker wants you to install a helper app",
      "message": "A free AI unlocker wants you to install a helper app. Tap to claim: ai-verify-fast.net",
      "sender": "Unknown",
      "steps": [
        "Open suspicious message",
        "Open sender options",
        "Report or block",
        "Confirm safety action"
      ],
      "lesson": "Cracked AI tools and unlockers are malware risks."
    },
    {
      "id": "browser-patch-ai",
      "type": "browserPatchRun",
      "title": "Browser Patch Run: AI Tool Malware",
      "category": "AI Tool Malware",
      "difficulty": "easy",
      "command": "CLOSE BAIT \u2192 STOP DOWNLOAD \u2192 CLEAR PERMISSION",
      "directions": "Fix the browser in the correct order while the danger meter rises.",
      "seconds": 13,
      "scenario": "A free AI unlocker wants you to install a helper app",
      "lesson": "Cracked AI tools and unlockers are malware risks."
    },
    {
      "id": "romance-evidence-ai",
      "type": "romanceEvidenceChat",
      "title": "Live Chat Evidence: AI Tool Malware",
      "category": "AI Tool Malware",
      "difficulty": "medium",
      "command": "COLLECT RED FLAGS \u2192 REPORT",
      "directions": "Messages appear one at a time. Tap scam red flags, then report/block the profile.",
      "seconds": 15,
      "scenario": "A free AI unlocker wants you to install a helper app",
      "profile": "Jordan",
      "flags": [
        "money request",
        "secrecy",
        "urgent deadline",
        "external app",
        "fake emergency"
      ],
      "lesson": "Cracked AI tools and unlockers are malware risks."
    },
    {
      "id": "scam-whack-ai",
      "type": "scamWhack",
      "title": "Scam Whack: AI Tool Malware",
      "category": "AI Tool Malware",
      "difficulty": "hard",
      "command": "WHACK SCAMS ONLY",
      "directions": "Tap only scam popups as they appear. Do not hit safe reminders.",
      "seconds": 12,
      "scenario": "A free AI unlocker wants you to install a helper app",
      "scamLabels": [
        "VERIFY NOW",
        "FREE COINS",
        "PAY FEE",
        "SEND CODE",
        "REMOTE ACCESS",
        "GIFT CARD"
      ],
      "safeLabels": [
        "Calendar",
        "Known contact",
        "Official app",
        "School portal"
      ],
      "target": 8,
      "lesson": "Cracked AI tools and unlockers are malware risks."
    },
    {
      "id": "fake-ad-clean-ai",
      "type": "fakeAdClean",
      "title": "Ad Cleaner: AI Tool Malware",
      "category": "AI Tool Malware",
      "difficulty": "easy",
      "command": "CLOSE REAL X BUTTONS",
      "directions": "Clean the screen by closing real X buttons. Avoid fake download/allow buttons.",
      "seconds": 12,
      "scenario": "A free AI unlocker wants you to install a helper app",
      "lesson": "Cracked AI tools and unlockers are malware risks."
    },
    {
      "id": "shield-cursor-family",
      "type": "shieldCursor",
      "title": "Shield Cursor: Family Emergency",
      "category": "Family Emergency",
      "difficulty": "easy",
      "command": "MOVE SHIELD \u2192 BLOCK SCAM TEXTS",
      "directions": "Move the shield with mouse/touch or WASD. Block scam texts, but avoid blocking safe messages.",
      "seconds": 15,
      "scenario": "A new number claims to be family and asks for secret help",
      "scamLabels": [
        "FREE COINS",
        "PAY FEE",
        "SEND CODE",
        "REMOTE ACCESS",
        "GIFT CARD"
      ],
      "safeLabels": [
        "Official app",
        "Saved number",
        "Trusted relative",
        "Known portal",
        "Report button"
      ],
      "target": 5,
      "lesson": "Call a saved number or trusted relative before acting."
    },
    {
      "id": "text-dodge-family",
      "type": "textDodge",
      "title": "Falling Text Dodge: Family Emergency",
      "category": "Family Emergency",
      "difficulty": "medium",
      "command": "LEFT/RIGHT \u2192 DODGE SCAMS, COLLECT VERIFY",
      "directions": "Move with A/D, arrow keys, or onscreen buttons. Dodge scam texts and collect verification stars.",
      "seconds": 16,
      "scenario": "A new number claims to be family and asks for secret help",
      "scamLabels": [
        "FREE COINS",
        "PAY FEE",
        "SEND CODE",
        "REMOTE ACCESS",
        "GIFT CARD"
      ],
      "target": 3,
      "lesson": "Call a saved number or trusted relative before acting."
    },
    {
      "id": "packet-paddle-family",
      "type": "packetPaddle",
      "title": "Firewall Paddle: Family Emergency",
      "category": "Family Emergency",
      "difficulty": "hard",
      "command": "MOVE FIREWALL \u2192 BLOCK SCAM PACKETS",
      "directions": "Move the firewall paddle with mouse/touch or arrows. Block scam packets and let safe packets pass.",
      "seconds": 16,
      "scenario": "A new number claims to be family and asks for secret help",
      "scamLabels": [
        "PAY FEE",
        "SEND CODE",
        "REMOTE ACCESS",
        "GIFT CARD",
        "URGENT REFUND"
      ],
      "safeLabels": [
        "Newsletter",
        "Known friend",
        "Receipt",
        "Class note",
        "Family photo"
      ],
      "target": 5,
      "lesson": "Call a saved number or trusted relative before acting."
    },
    {
      "id": "phone-sequence-family",
      "type": "phoneTapSequence",
      "title": "Phone Report Path: Family Emergency",
      "category": "Family Emergency",
      "difficulty": "easy",
      "command": "PHONE PATH \u2192 REPORT SAFELY",
      "directions": "Navigate the phone in the correct order: message, options, report/block, confirm.",
      "seconds": 17,
      "scenario": "A new number claims to be family and asks for secret help",
      "message": "A new number claims to be family and asks for secret help. Tap to claim: family-verify-fast.net",
      "sender": "PrizeBot",
      "steps": [
        "Open suspicious message",
        "Open sender options",
        "Report or block",
        "Confirm safety action"
      ],
      "lesson": "Call a saved number or trusted relative before acting."
    },
    {
      "id": "browser-patch-family",
      "type": "browserPatchRun",
      "title": "Browser Patch Run: Family Emergency",
      "category": "Family Emergency",
      "difficulty": "medium",
      "command": "CLOSE BAIT \u2192 STOP DOWNLOAD \u2192 CLEAR PERMISSION",
      "directions": "Fix the browser in the correct order while the danger meter rises.",
      "seconds": 16,
      "scenario": "A new number claims to be family and asks for secret help",
      "lesson": "Call a saved number or trusted relative before acting."
    },
    {
      "id": "romance-evidence-family",
      "type": "romanceEvidenceChat",
      "title": "Live Chat Evidence: Family Emergency",
      "category": "Family Emergency",
      "difficulty": "hard",
      "command": "COLLECT RED FLAGS \u2192 REPORT",
      "directions": "Messages appear one at a time. Tap scam red flags, then report/block the profile.",
      "seconds": 18,
      "scenario": "A new number claims to be family and asks for secret help",
      "profile": "Sam",
      "flags": [
        "money request",
        "secrecy",
        "urgent deadline",
        "external app",
        "fake emergency"
      ],
      "lesson": "Call a saved number or trusted relative before acting."
    },
    {
      "id": "scam-whack-family",
      "type": "scamWhack",
      "title": "Scam Whack: Family Emergency",
      "category": "Family Emergency",
      "difficulty": "easy",
      "command": "WHACK SCAMS ONLY",
      "directions": "Tap only scam popups as they appear. Do not hit safe reminders.",
      "seconds": 15,
      "scenario": "A new number claims to be family and asks for secret help",
      "scamLabels": [
        "VERIFY NOW",
        "FREE COINS",
        "PAY FEE",
        "SEND CODE",
        "REMOTE ACCESS",
        "GIFT CARD"
      ],
      "safeLabels": [
        "Calendar",
        "Known contact",
        "Official app",
        "School portal"
      ],
      "target": 6,
      "lesson": "Call a saved number or trusted relative before acting."
    },
    {
      "id": "fake-ad-clean-family",
      "type": "fakeAdClean",
      "title": "Ad Cleaner: Family Emergency",
      "category": "Family Emergency",
      "difficulty": "medium",
      "command": "CLOSE REAL X BUTTONS",
      "directions": "Clean the screen by closing real X buttons. Avoid fake download/allow buttons.",
      "seconds": 15,
      "scenario": "A new number claims to be family and asks for secret help",
      "lesson": "Call a saved number or trusted relative before acting."
    },
    {
      "id": "live-game-room-free-skins",
      "type": "gameChatReport",
      "title": "Live Game Room: free skins",
      "category": "Game Scam",
      "difficulty": "medium",
      "command": "WATCH CHAT \u2192 MUTE + REPORT",
      "directions": "Messages now appear one at a time. Identify the suspicious player and mute/report before they keep spamming.",
      "seconds": 18,
      "message": "Free skins drop! login at skin-prize-fast.net",
      "players": [
        "PixelPat",
        "GardenMom",
        "Runner42",
        "StudyBuddy",
        "ScamBot99",
        "NovaKid",
        "CraftyCat",
        "RapidFox"
      ],
      "lesson": "Prize links in game chat are often credential theft."
    },
    {
      "id": "live-game-room-nitro",
      "type": "gameChatReport",
      "title": "Live Game Room: nitro",
      "category": "Account Takeover",
      "difficulty": "medium",
      "command": "WATCH CHAT \u2192 MUTE + REPORT",
      "directions": "Messages now appear one at a time. Identify the suspicious player and mute/report before they keep spamming.",
      "seconds": 18,
      "message": "Free Nitro expires in 2 minutes. verify-discord-gift.net",
      "players": [
        "PixelPat",
        "GardenMom",
        "Runner42",
        "StudyBuddy",
        "ScamBot99",
        "NovaKid",
        "CraftyCat",
        "RapidFox"
      ],
      "lesson": "Free premium offers often steal accounts."
    },
    {
      "id": "live-game-room-trade",
      "type": "gameChatReport",
      "title": "Live Game Room: trade",
      "category": "Marketplace Scam",
      "difficulty": "medium",
      "command": "WATCH CHAT \u2192 MUTE + REPORT",
      "directions": "Messages now appear one at a time. Identify the suspicious player and mute/report before they keep spamming.",
      "seconds": 18,
      "message": "Rare item trade, send deposit first and do not use escrow",
      "players": [
        "PixelPat",
        "GardenMom",
        "Runner42",
        "StudyBuddy",
        "ScamBot99",
        "NovaKid",
        "CraftyCat",
        "RapidFox"
      ],
      "lesson": "Deposits outside protected trade systems are risky."
    },
    {
      "id": "live-game-room-tournament",
      "type": "gameChatReport",
      "title": "Live Game Room: tournament",
      "category": "Gaming Scam",
      "difficulty": "medium",
      "command": "WATCH CHAT \u2192 MUTE + REPORT",
      "directions": "Messages now appear one at a time. Identify the suspicious player and mute/report before they keep spamming.",
      "seconds": 18,
      "message": "Tournament invite requires anti-cheat installer from my link",
      "players": [
        "PixelPat",
        "GardenMom",
        "Runner42",
        "StudyBuddy",
        "ScamBot99",
        "NovaKid",
        "CraftyCat",
        "RapidFox"
      ],
      "lesson": "Unknown installers from players can be malware."
    },
    {
      "id": "live-game-room-coins",
      "type": "gameChatReport",
      "title": "Live Game Room: coins",
      "category": "Game Scam",
      "difficulty": "easy",
      "command": "WATCH CHAT \u2192 MUTE + REPORT",
      "directions": "Messages now appear one at a time. Identify the suspicious player and mute/report before they keep spamming.",
      "seconds": 18,
      "message": "FREE COINS! log in at game-prize-fast.net",
      "players": [
        "PixelPat",
        "GardenMom",
        "Runner42",
        "StudyBuddy",
        "ScamBot99",
        "NovaKid",
        "CraftyCat",
        "RapidFox"
      ],
      "lesson": "Report/block prize spam instead of opening links."
    },
    {
      "id": "live-game-room-dupe",
      "type": "gameChatReport",
      "title": "Live Game Room: dupe",
      "category": "Gaming Scam",
      "difficulty": "medium",
      "command": "WATCH CHAT \u2192 MUTE + REPORT",
      "directions": "Messages now appear one at a time. Identify the suspicious player and mute/report before they keep spamming.",
      "seconds": 18,
      "message": "I can duplicate your inventory if you share your code",
      "players": [
        "PixelPat",
        "GardenMom",
        "Runner42",
        "StudyBuddy",
        "ScamBot99",
        "NovaKid",
        "CraftyCat",
        "RapidFox"
      ],
      "lesson": "Never share codes or credentials with players."
    },
    {
      "id": "live-game-room-mod",
      "type": "gameChatReport",
      "title": "Live Game Room: mod",
      "category": "Impersonation",
      "difficulty": "hard",
      "command": "WATCH CHAT \u2192 MUTE + REPORT",
      "directions": "Messages now appear one at a time. Identify the suspicious player and mute/report before they keep spamming.",
      "seconds": 18,
      "message": "I am a moderator. DM your password or you will be banned",
      "players": [
        "PixelPat",
        "GardenMom",
        "Runner42",
        "StudyBuddy",
        "ScamBot99",
        "NovaKid",
        "CraftyCat",
        "RapidFox"
      ],
      "lesson": "Real moderators do not ask for passwords."
    },
    {
      "id": "live-game-room-voice",
      "type": "gameChatReport",
      "title": "Live Game Room: voice",
      "category": "Social Engineering",
      "difficulty": "medium",
      "command": "WATCH CHAT \u2192 MUTE + REPORT",
      "directions": "Messages now appear one at a time. Identify the suspicious player and mute/report before they keep spamming.",
      "seconds": 18,
      "message": "Join this voice server and scan the QR to verify",
      "players": [
        "PixelPat",
        "GardenMom",
        "Runner42",
        "StudyBuddy",
        "ScamBot99",
        "NovaKid",
        "CraftyCat",
        "RapidFox"
      ],
      "lesson": "Unexpected QR verification can steal sessions."
    },
    {
      "id": "browser-patch-extra-checkout",
      "type": "browserPatchRun",
      "title": "Browser Rescue: checkout",
      "category": "Shopping Scam",
      "difficulty": "medium",
      "command": "FIX THE BROWSER SAFELY",
      "directions": "Close bait, stop risky action, then clear permission.",
      "seconds": 15,
      "scenario": "The checkout swaps from card protection to wire transfer only.",
      "lesson": "Browser scams become safer when you close bait, stop downloads, and remove suspicious permissions."
    },
    {
      "id": "link-bridge-checkout",
      "type": "linkBridge",
      "title": "Link Bridge: checkout",
      "category": "Shopping Scam",
      "difficulty": "medium",
      "command": "STEP ONLY ON SAFE DOMAINS",
      "directions": "Move across the bridge by choosing official/safe tiles. One bad domain collapses the bridge.",
      "seconds": 18,
      "scenario": "The checkout swaps from card protection to wire transfer only.",
      "official": "official-source.com",
      "domains": [
        "official-source.com",
        "secure-login-fast.net",
        "helpdesk-refund.biz",
        "account-verify.co",
        "real-company.com",
        "gift-claim-now.info"
      ],
      "lesson": "Lookalike domains are a major phishing signal."
    },
    {
      "id": "browser-patch-extra-cloud",
      "type": "browserPatchRun",
      "title": "Browser Rescue: cloud",
      "category": "Cloud Storage Phishing",
      "difficulty": "medium",
      "command": "FIX THE BROWSER SAFELY",
      "directions": "Close bait, stop risky action, then clear permission.",
      "seconds": 15,
      "scenario": "A fake file-share page asks for your email password.",
      "lesson": "Browser scams become safer when you close bait, stop downloads, and remove suspicious permissions."
    },
    {
      "id": "link-bridge-cloud",
      "type": "linkBridge",
      "title": "Link Bridge: cloud",
      "category": "Cloud Storage Phishing",
      "difficulty": "medium",
      "command": "STEP ONLY ON SAFE DOMAINS",
      "directions": "Move across the bridge by choosing official/safe tiles. One bad domain collapses the bridge.",
      "seconds": 18,
      "scenario": "A fake file-share page asks for your email password.",
      "official": "official-source.com",
      "domains": [
        "official-source.com",
        "secure-login-fast.net",
        "helpdesk-refund.biz",
        "account-verify.co",
        "real-company.com",
        "gift-claim-now.info"
      ],
      "lesson": "Lookalike domains are a major phishing signal."
    },
    {
      "id": "browser-patch-extra-stream",
      "type": "browserPatchRun",
      "title": "Browser Rescue: stream",
      "category": "Streaming Malware",
      "difficulty": "medium",
      "command": "FIX THE BROWSER SAFELY",
      "directions": "Close bait, stop risky action, then clear permission.",
      "seconds": 15,
      "scenario": "A stream page says HD requires a codec download.",
      "lesson": "Browser scams become safer when you close bait, stop downloads, and remove suspicious permissions."
    },
    {
      "id": "link-bridge-stream",
      "type": "linkBridge",
      "title": "Link Bridge: stream",
      "category": "Streaming Malware",
      "difficulty": "medium",
      "command": "STEP ONLY ON SAFE DOMAINS",
      "directions": "Move across the bridge by choosing official/safe tiles. One bad domain collapses the bridge.",
      "seconds": 18,
      "scenario": "A stream page says HD requires a codec download.",
      "official": "official-source.com",
      "domains": [
        "official-source.com",
        "secure-login-fast.net",
        "helpdesk-refund.biz",
        "account-verify.co",
        "real-company.com",
        "gift-claim-now.info"
      ],
      "lesson": "Lookalike domains are a major phishing signal."
    },
    {
      "id": "browser-patch-extra-coupon",
      "type": "browserPatchRun",
      "title": "Browser Rescue: coupon",
      "category": "Coupon Scam",
      "difficulty": "easy",
      "command": "FIX THE BROWSER SAFELY",
      "directions": "Close bait, stop risky action, then clear permission.",
      "seconds": 15,
      "scenario": "A coupon page wants notification permission and your card.",
      "lesson": "Browser scams become safer when you close bait, stop downloads, and remove suspicious permissions."
    },
    {
      "id": "link-bridge-coupon",
      "type": "linkBridge",
      "title": "Link Bridge: coupon",
      "category": "Coupon Scam",
      "difficulty": "medium",
      "command": "STEP ONLY ON SAFE DOMAINS",
      "directions": "Move across the bridge by choosing official/safe tiles. One bad domain collapses the bridge.",
      "seconds": 18,
      "scenario": "A coupon page wants notification permission and your card.",
      "official": "official-source.com",
      "domains": [
        "official-source.com",
        "secure-login-fast.net",
        "helpdesk-refund.biz",
        "account-verify.co",
        "real-company.com",
        "gift-claim-now.info"
      ],
      "lesson": "Lookalike domains are a major phishing signal."
    },
    {
      "id": "browser-patch-extra-tax",
      "type": "browserPatchRun",
      "title": "Browser Rescue: tax",
      "category": "Tax Scam",
      "difficulty": "medium",
      "command": "FIX THE BROWSER SAFELY",
      "directions": "Close bait, stop risky action, then clear permission.",
      "seconds": 15,
      "scenario": "A tax refund page asks for SSN and bank login.",
      "lesson": "Browser scams become safer when you close bait, stop downloads, and remove suspicious permissions."
    },
    {
      "id": "link-bridge-tax",
      "type": "linkBridge",
      "title": "Link Bridge: tax",
      "category": "Tax Scam",
      "difficulty": "medium",
      "command": "STEP ONLY ON SAFE DOMAINS",
      "directions": "Move across the bridge by choosing official/safe tiles. One bad domain collapses the bridge.",
      "seconds": 18,
      "scenario": "A tax refund page asks for SSN and bank login.",
      "official": "official-source.com",
      "domains": [
        "official-source.com",
        "secure-login-fast.net",
        "helpdesk-refund.biz",
        "account-verify.co",
        "real-company.com",
        "gift-claim-now.info"
      ],
      "lesson": "Lookalike domains are a major phishing signal."
    },
    {
      "id": "browser-patch-extra-event",
      "type": "browserPatchRun",
      "title": "Browser Rescue: event",
      "category": "Ticket Scam",
      "difficulty": "medium",
      "command": "FIX THE BROWSER SAFELY",
      "directions": "Close bait, stop risky action, then clear permission.",
      "seconds": 15,
      "scenario": "A ticket page pushes friends-and-family payment.",
      "lesson": "Browser scams become safer when you close bait, stop downloads, and remove suspicious permissions."
    },
    {
      "id": "link-bridge-event",
      "type": "linkBridge",
      "title": "Link Bridge: event",
      "category": "Ticket Scam",
      "difficulty": "medium",
      "command": "STEP ONLY ON SAFE DOMAINS",
      "directions": "Move across the bridge by choosing official/safe tiles. One bad domain collapses the bridge.",
      "seconds": 18,
      "scenario": "A ticket page pushes friends-and-family payment.",
      "official": "official-source.com",
      "domains": [
        "official-source.com",
        "secure-login-fast.net",
        "helpdesk-refund.biz",
        "account-verify.co",
        "real-company.com",
        "gift-claim-now.info"
      ],
      "lesson": "Lookalike domains are a major phishing signal."
    },
    {
      "id": "browser-patch-extra-rental",
      "type": "browserPatchRun",
      "title": "Browser Rescue: rental",
      "category": "Rental Scam",
      "difficulty": "medium",
      "command": "FIX THE BROWSER SAFELY",
      "directions": "Close bait, stop risky action, then clear permission.",
      "seconds": 15,
      "scenario": "A rental site wants deposit before touring.",
      "lesson": "Browser scams become safer when you close bait, stop downloads, and remove suspicious permissions."
    },
    {
      "id": "link-bridge-rental",
      "type": "linkBridge",
      "title": "Link Bridge: rental",
      "category": "Rental Scam",
      "difficulty": "medium",
      "command": "STEP ONLY ON SAFE DOMAINS",
      "directions": "Move across the bridge by choosing official/safe tiles. One bad domain collapses the bridge.",
      "seconds": 18,
      "scenario": "A rental site wants deposit before touring.",
      "official": "official-source.com",
      "domains": [
        "official-source.com",
        "secure-login-fast.net",
        "helpdesk-refund.biz",
        "account-verify.co",
        "real-company.com",
        "gift-claim-now.info"
      ],
      "lesson": "Lookalike domains are a major phishing signal."
    },
    {
      "id": "browser-patch-extra-ai",
      "type": "browserPatchRun",
      "title": "Browser Rescue: ai",
      "category": "AI Malware",
      "difficulty": "hard",
      "command": "FIX THE BROWSER SAFELY",
      "directions": "Close bait, stop risky action, then clear permission.",
      "seconds": 15,
      "scenario": "An AI extension asks to read every site and clipboard.",
      "lesson": "Browser scams become safer when you close bait, stop downloads, and remove suspicious permissions."
    },
    {
      "id": "link-bridge-ai",
      "type": "linkBridge",
      "title": "Link Bridge: ai",
      "category": "AI Malware",
      "difficulty": "hard",
      "command": "STEP ONLY ON SAFE DOMAINS",
      "directions": "Move across the bridge by choosing official/safe tiles. One bad domain collapses the bridge.",
      "seconds": 18,
      "scenario": "An AI extension asks to read every site and clipboard.",
      "official": "official-source.com",
      "domains": [
        "official-source.com",
        "secure-login-fast.net",
        "helpdesk-refund.biz",
        "account-verify.co",
        "real-company.com",
        "gift-claim-now.info"
      ],
      "lesson": "Lookalike domains are a major phishing signal."
    },
    {
      "id": "shield-extra-mfa-rain",
      "type": "shieldCursor",
      "title": "Shield Wall: Account Takeover",
      "category": "Account Takeover",
      "difficulty": "medium",
      "command": "MOVE SHIELD \u2192 PROTECT YOURSELF",
      "directions": "Use the shield to block scam pressure without blocking safe verification.",
      "seconds": 16,
      "scenario": "MFA prompts are raining from logins you did not start.",
      "scamLabels": [
        "VERIFY NOW",
        "FREE COINS",
        "PAY FEE",
        "SEND CODE",
        "REMOTE ACCESS",
        "GIFT CARD",
        "URGENT REFUND",
        "LOGIN FAST",
        "SECRET DEAL",
        "CRYPTO GUARANTEE"
      ],
      "safeLabels": [
        "Verify separately",
        "Report",
        "Saved number",
        "Official app"
      ],
      "target": 7,
      "lesson": "Deny unexpected MFA prompts and change passwords if they repeat."
    },
    {
      "id": "dodge-extra-mfa-rain",
      "type": "textDodge",
      "title": "Dodge Run: Account Takeover",
      "category": "Account Takeover",
      "difficulty": "hard",
      "command": "DODGE PRESSURE \u2192 COLLECT VERIFY",
      "directions": "Avoid the falling scam demands and collect verification stars.",
      "seconds": 15,
      "scenario": "MFA prompts are raining from logins you did not start.",
      "scamLabels": [
        "VERIFY NOW",
        "FREE COINS",
        "PAY FEE",
        "SEND CODE",
        "REMOTE ACCESS",
        "GIFT CARD",
        "URGENT REFUND",
        "LOGIN FAST",
        "SECRET DEAL",
        "CRYPTO GUARANTEE"
      ],
      "target": 4,
      "lesson": "Deny unexpected MFA prompts and change passwords if they repeat."
    },
    {
      "id": "shield-extra-refund-rain",
      "type": "shieldCursor",
      "title": "Shield Wall: Refund Scam",
      "category": "Refund Scam",
      "difficulty": "medium",
      "command": "MOVE SHIELD \u2192 PROTECT YOURSELF",
      "directions": "Use the shield to block scam pressure without blocking safe verification.",
      "seconds": 16,
      "scenario": "Fake refund windows are dropping remote-access requests.",
      "scamLabels": [
        "VERIFY NOW",
        "FREE COINS",
        "PAY FEE",
        "SEND CODE",
        "REMOTE ACCESS",
        "GIFT CARD",
        "URGENT REFUND",
        "LOGIN FAST",
        "SECRET DEAL",
        "CRYPTO GUARANTEE"
      ],
      "safeLabels": [
        "Verify separately",
        "Report",
        "Saved number",
        "Official app"
      ],
      "target": 7,
      "lesson": "Refund scams often push remote access and fake balances."
    },
    {
      "id": "dodge-extra-refund-rain",
      "type": "textDodge",
      "title": "Dodge Run: Refund Scam",
      "category": "Refund Scam",
      "difficulty": "hard",
      "command": "DODGE PRESSURE \u2192 COLLECT VERIFY",
      "directions": "Avoid the falling scam demands and collect verification stars.",
      "seconds": 15,
      "scenario": "Fake refund windows are dropping remote-access requests.",
      "scamLabels": [
        "VERIFY NOW",
        "FREE COINS",
        "PAY FEE",
        "SEND CODE",
        "REMOTE ACCESS",
        "GIFT CARD",
        "URGENT REFUND",
        "LOGIN FAST",
        "SECRET DEAL",
        "CRYPTO GUARANTEE"
      ],
      "target": 4,
      "lesson": "Refund scams often push remote access and fake balances."
    },
    {
      "id": "shield-extra-gift-rain",
      "type": "shieldCursor",
      "title": "Shield Wall: Gift Card Scam",
      "category": "Gift Card Scam",
      "difficulty": "medium",
      "command": "MOVE SHIELD \u2192 PROTECT YOURSELF",
      "directions": "Use the shield to block scam pressure without blocking safe verification.",
      "seconds": 16,
      "scenario": "Gift card demands fall faster as pressure increases.",
      "scamLabels": [
        "VERIFY NOW",
        "FREE COINS",
        "PAY FEE",
        "SEND CODE",
        "REMOTE ACCESS",
        "GIFT CARD",
        "URGENT REFUND",
        "LOGIN FAST",
        "SECRET DEAL",
        "CRYPTO GUARANTEE"
      ],
      "safeLabels": [
        "Verify separately",
        "Report",
        "Saved number",
        "Official app"
      ],
      "target": 7,
      "lesson": "No legitimate office asks for gift cards as payment."
    },
    {
      "id": "dodge-extra-gift-rain",
      "type": "textDodge",
      "title": "Dodge Run: Gift Card Scam",
      "category": "Gift Card Scam",
      "difficulty": "hard",
      "command": "DODGE PRESSURE \u2192 COLLECT VERIFY",
      "directions": "Avoid the falling scam demands and collect verification stars.",
      "seconds": 15,
      "scenario": "Gift card demands fall faster as pressure increases.",
      "scamLabels": [
        "VERIFY NOW",
        "FREE COINS",
        "PAY FEE",
        "SEND CODE",
        "REMOTE ACCESS",
        "GIFT CARD",
        "URGENT REFUND",
        "LOGIN FAST",
        "SECRET DEAL",
        "CRYPTO GUARANTEE"
      ],
      "target": 4,
      "lesson": "No legitimate office asks for gift cards as payment."
    },
    {
      "id": "shield-extra-qr-rain",
      "type": "shieldCursor",
      "title": "Shield Wall: QR Scam",
      "category": "QR Scam",
      "difficulty": "medium",
      "command": "MOVE SHIELD \u2192 PROTECT YOURSELF",
      "directions": "Use the shield to block scam pressure without blocking safe verification.",
      "seconds": 16,
      "scenario": "Fake QR stickers are falling over the official payment sign.",
      "scamLabels": [
        "VERIFY NOW",
        "FREE COINS",
        "PAY FEE",
        "SEND CODE",
        "REMOTE ACCESS",
        "GIFT CARD",
        "URGENT REFUND",
        "LOGIN FAST",
        "SECRET DEAL",
        "CRYPTO GUARANTEE"
      ],
      "safeLabels": [
        "Verify separately",
        "Report",
        "Saved number",
        "Official app"
      ],
      "target": 7,
      "lesson": "Check QR context and official source before scanning."
    },
    {
      "id": "dodge-extra-qr-rain",
      "type": "textDodge",
      "title": "Dodge Run: QR Scam",
      "category": "QR Scam",
      "difficulty": "hard",
      "command": "DODGE PRESSURE \u2192 COLLECT VERIFY",
      "directions": "Avoid the falling scam demands and collect verification stars.",
      "seconds": 15,
      "scenario": "Fake QR stickers are falling over the official payment sign.",
      "scamLabels": [
        "VERIFY NOW",
        "FREE COINS",
        "PAY FEE",
        "SEND CODE",
        "REMOTE ACCESS",
        "GIFT CARD",
        "URGENT REFUND",
        "LOGIN FAST",
        "SECRET DEAL",
        "CRYPTO GUARANTEE"
      ],
      "target": 4,
      "lesson": "Check QR context and official source before scanning."
    },
    {
      "id": "shield-extra-romance-rain",
      "type": "shieldCursor",
      "title": "Shield Wall: Romance Scam",
      "category": "Romance Scam",
      "difficulty": "medium",
      "command": "MOVE SHIELD \u2192 PROTECT YOURSELF",
      "directions": "Use the shield to block scam pressure without blocking safe verification.",
      "seconds": 16,
      "scenario": "Urgent travel-fee requests keep dropping into chat.",
      "scamLabels": [
        "VERIFY NOW",
        "FREE COINS",
        "PAY FEE",
        "SEND CODE",
        "REMOTE ACCESS",
        "GIFT CARD",
        "URGENT REFUND",
        "LOGIN FAST",
        "SECRET DEAL",
        "CRYPTO GUARANTEE"
      ],
      "safeLabels": [
        "Verify separately",
        "Report",
        "Saved number",
        "Official app"
      ],
      "target": 7,
      "lesson": "Never send money to a romance profile you cannot independently verify."
    },
    {
      "id": "dodge-extra-romance-rain",
      "type": "textDodge",
      "title": "Dodge Run: Romance Scam",
      "category": "Romance Scam",
      "difficulty": "hard",
      "command": "DODGE PRESSURE \u2192 COLLECT VERIFY",
      "directions": "Avoid the falling scam demands and collect verification stars.",
      "seconds": 15,
      "scenario": "Urgent travel-fee requests keep dropping into chat.",
      "scamLabels": [
        "VERIFY NOW",
        "FREE COINS",
        "PAY FEE",
        "SEND CODE",
        "REMOTE ACCESS",
        "GIFT CARD",
        "URGENT REFUND",
        "LOGIN FAST",
        "SECRET DEAL",
        "CRYPTO GUARANTEE"
      ],
      "target": 4,
      "lesson": "Never send money to a romance profile you cannot independently verify."
    },
    {
      "id": "shield-extra-job-rain",
      "type": "shieldCursor",
      "title": "Shield Wall: Job Scam",
      "category": "Job Scam",
      "difficulty": "medium",
      "command": "MOVE SHIELD \u2192 PROTECT YOURSELF",
      "directions": "Use the shield to block scam pressure without blocking safe verification.",
      "seconds": 16,
      "scenario": "Equipment-fee messages fall from fake recruiters.",
      "scamLabels": [
        "VERIFY NOW",
        "FREE COINS",
        "PAY FEE",
        "SEND CODE",
        "REMOTE ACCESS",
        "GIFT CARD",
        "URGENT REFUND",
        "LOGIN FAST",
        "SECRET DEAL",
        "CRYPTO GUARANTEE"
      ],
      "safeLabels": [
        "Verify separately",
        "Report",
        "Saved number",
        "Official app"
      ],
      "target": 7,
      "lesson": "Upfront job fees are a scam signal."
    },
    {
      "id": "dodge-extra-job-rain",
      "type": "textDodge",
      "title": "Dodge Run: Job Scam",
      "category": "Job Scam",
      "difficulty": "hard",
      "command": "DODGE PRESSURE \u2192 COLLECT VERIFY",
      "directions": "Avoid the falling scam demands and collect verification stars.",
      "seconds": 15,
      "scenario": "Equipment-fee messages fall from fake recruiters.",
      "scamLabels": [
        "VERIFY NOW",
        "FREE COINS",
        "PAY FEE",
        "SEND CODE",
        "REMOTE ACCESS",
        "GIFT CARD",
        "URGENT REFUND",
        "LOGIN FAST",
        "SECRET DEAL",
        "CRYPTO GUARANTEE"
      ],
      "target": 4,
      "lesson": "Upfront job fees are a scam signal."
    },
    {
      "id": "v15-platformHints-bank-login-storm-1",
      "type": "platformHints",
      "title": "Hint Platformer: Bank Login Storm",
      "category": "Arcade Movement",
      "difficulty": "easy",
      "command": "JUMP \u2192 COLLECT IRIS STARS",
      "directions": "Move with A/D or arrows, jump with Space/W, collect every star, and avoid scam traps. Each star rewards an Iris Hint.",
      "seconds": 25,
      "scenario": "A fake bank alert demands login and MFA code before midnight.",
      "targetStars": 4,
      "platforms": [
        [
          4,
          86,
          22
        ],
        [
          22,
          68,
          18
        ],
        [
          42,
          51,
          18
        ],
        [
          63,
          33,
          20
        ],
        [
          78,
          18,
          14
        ]
      ],
      "stars": [
        [
          25,
          58
        ],
        [
          47,
          41
        ],
        [
          68,
          24
        ],
        [
          84,
          10
        ]
      ],
      "hazards": [
        [
          36,
          78,
          "\ud83d\udea9"
        ],
        [
          57,
          60,
          "\u26a0\ufe0f"
        ],
        [
          74,
          43,
          "\ud83e\udde8"
        ]
      ],
      "lesson": "Use the official bank app or saved phone number; never use a surprise login link."
    },
    {
      "id": "v15-platformHints-game-prize-rush-2",
      "type": "platformHints",
      "title": "Hint Platformer: Game Prize Rush",
      "category": "Arcade Movement",
      "difficulty": "medium",
      "command": "JUMP \u2192 COLLECT IRIS STARS",
      "directions": "Move with A/D or arrows, jump with Space/W, collect every star, and avoid scam traps. Each star rewards an Iris Hint.",
      "seconds": 25,
      "scenario": "A player promises rare skins through a link outside the game.",
      "targetStars": 4,
      "platforms": [
        [
          5,
          84,
          19
        ],
        [
          28,
          69,
          17
        ],
        [
          12,
          53,
          18
        ],
        [
          41,
          39,
          18
        ],
        [
          67,
          26,
          18
        ]
      ],
      "stars": [
        [
          32,
          60
        ],
        [
          16,
          44
        ],
        [
          46,
          30
        ],
        [
          73,
          17
        ]
      ],
      "hazards": [
        [
          23,
          76,
          "\ud83d\udea9"
        ],
        [
          54,
          54,
          "\u26a0\ufe0f"
        ],
        [
          77,
          36,
          "\ud83d\udc80"
        ]
      ],
      "lesson": "Report reward links in game chat; official rewards stay inside official game systems."
    },
    {
      "id": "v15-platformHints-romance-travel-fee-3",
      "type": "platformHints",
      "title": "Hint Platformer: Romance Travel Fee",
      "category": "Arcade Movement",
      "difficulty": "hard",
      "command": "JUMP \u2192 COLLECT IRIS STARS",
      "directions": "Move with A/D or arrows, jump with Space/W, collect every star, and avoid scam traps. Each star rewards an Iris Hint.",
      "seconds": 22,
      "scenario": "A new match asks for travel money and wants secrecy.",
      "targetStars": 4,
      "platforms": [
        [
          3,
          87,
          24
        ],
        [
          31,
          72,
          15
        ],
        [
          50,
          57,
          16
        ],
        [
          69,
          42,
          17
        ],
        [
          36,
          28,
          17
        ]
      ],
      "stars": [
        [
          35,
          63
        ],
        [
          55,
          48
        ],
        [
          74,
          33
        ],
        [
          41,
          19
        ]
      ],
      "hazards": [
        [
          45,
          80,
          "\ud83d\udea9"
        ],
        [
          64,
          65,
          "\u26a0\ufe0f"
        ],
        [
          58,
          38,
          "\ud83e\udde8"
        ]
      ],
      "lesson": "Money, secrecy, and fast emotional pressure are romance-scam warning signs."
    },
    {
      "id": "v15-platformHints-marketplace-overpay-4",
      "type": "platformHints",
      "title": "Hint Platformer: Marketplace Overpay",
      "category": "Arcade Movement",
      "difficulty": "easy",
      "command": "JUMP \u2192 COLLECT IRIS STARS",
      "directions": "Move with A/D or arrows, jump with Space/W, collect every star, and avoid scam traps. Each star rewards an Iris Hint.",
      "seconds": 25,
      "scenario": "A buyer overpays and asks you to refund before payment clears.",
      "targetStars": 4,
      "platforms": [
        [
          6,
          85,
          18
        ],
        [
          24,
          69,
          18
        ],
        [
          46,
          55,
          18
        ],
        [
          18,
          39,
          18
        ],
        [
          61,
          24,
          20
        ]
      ],
      "stars": [
        [
          28,
          60
        ],
        [
          51,
          46
        ],
        [
          23,
          30
        ],
        [
          67,
          15
        ]
      ],
      "hazards": [
        [
          39,
          77,
          "\ud83d\udea9"
        ],
        [
          59,
          61,
          "\u26a0\ufe0f"
        ],
        [
          34,
          42,
          "\ud83d\udc80"
        ]
      ],
      "lesson": "Wait for cleared payment and stay on-platform; never refund fake overpayments."
    },
    {
      "id": "v15-platformHints-package-fee-trap-5",
      "type": "platformHints",
      "title": "Hint Platformer: Package Fee Trap",
      "category": "Arcade Movement",
      "difficulty": "medium",
      "command": "JUMP \u2192 COLLECT IRIS STARS",
      "directions": "Move with A/D or arrows, jump with Space/W, collect every star, and avoid scam traps. Each star rewards an Iris Hint.",
      "seconds": 25,
      "scenario": "A text asks for a tiny redelivery fee through an unknown link.",
      "targetStars": 4,
      "platforms": [
        [
          4,
          86,
          22
        ],
        [
          22,
          68,
          18
        ],
        [
          42,
          51,
          18
        ],
        [
          63,
          33,
          20
        ],
        [
          78,
          18,
          14
        ]
      ],
      "stars": [
        [
          25,
          58
        ],
        [
          47,
          41
        ],
        [
          68,
          24
        ],
        [
          84,
          10
        ]
      ],
      "hazards": [
        [
          36,
          78,
          "\ud83d\udea9"
        ],
        [
          57,
          60,
          "\u26a0\ufe0f"
        ],
        [
          74,
          43,
          "\ud83e\udde8"
        ]
      ],
      "lesson": "Use the official carrier app/site, not random text links."
    },
    {
      "id": "v15-platformHints-scholarship-portal-6",
      "type": "platformHints",
      "title": "Hint Platformer: Scholarship Portal",
      "category": "Arcade Movement",
      "difficulty": "hard",
      "command": "JUMP \u2192 COLLECT IRIS STARS",
      "directions": "Move with A/D or arrows, jump with Space/W, collect every star, and avoid scam traps. Each star rewards an Iris Hint.",
      "seconds": 22,
      "scenario": "A scholarship email asks for your school login and bank account today.",
      "targetStars": 4,
      "platforms": [
        [
          5,
          84,
          19
        ],
        [
          28,
          69,
          17
        ],
        [
          12,
          53,
          18
        ],
        [
          41,
          39,
          18
        ],
        [
          67,
          26,
          18
        ]
      ],
      "stars": [
        [
          32,
          60
        ],
        [
          16,
          44
        ],
        [
          46,
          30
        ],
        [
          73,
          17
        ]
      ],
      "hazards": [
        [
          23,
          76,
          "\ud83d\udea9"
        ],
        [
          54,
          54,
          "\u26a0\ufe0f"
        ],
        [
          77,
          36,
          "\ud83d\udc80"
        ]
      ],
      "lesson": "Use the official school portal and financial aid office, not lookalike scholarship forms."
    },
    {
      "id": "v15-platformHints-ai-tool-unlocker-7",
      "type": "platformHints",
      "title": "Hint Platformer: AI Tool Unlocker",
      "category": "Arcade Movement",
      "difficulty": "easy",
      "command": "JUMP \u2192 COLLECT IRIS STARS",
      "directions": "Move with A/D or arrows, jump with Space/W, collect every star, and avoid scam traps. Each star rewards an Iris Hint.",
      "seconds": 25,
      "scenario": "A free AI unlocker asks you to disable security and download a helper.",
      "targetStars": 4,
      "platforms": [
        [
          3,
          87,
          24
        ],
        [
          31,
          72,
          15
        ],
        [
          50,
          57,
          16
        ],
        [
          69,
          42,
          17
        ],
        [
          36,
          28,
          17
        ]
      ],
      "stars": [
        [
          35,
          63
        ],
        [
          55,
          48
        ],
        [
          74,
          33
        ],
        [
          41,
          19
        ]
      ],
      "hazards": [
        [
          45,
          80,
          "\ud83d\udea9"
        ],
        [
          64,
          65,
          "\u26a0\ufe0f"
        ],
        [
          58,
          38,
          "\ud83e\udde8"
        ]
      ],
      "lesson": "Cracked AI tools and unlockers are common malware traps."
    },
    {
      "id": "v15-platformHints-charity-countdown-8",
      "type": "platformHints",
      "title": "Hint Platformer: Charity Countdown",
      "category": "Arcade Movement",
      "difficulty": "medium",
      "command": "JUMP \u2192 COLLECT IRIS STARS",
      "directions": "Move with A/D or arrows, jump with Space/W, collect every star, and avoid scam traps. Each star rewards an Iris Hint.",
      "seconds": 25,
      "scenario": "A disaster charity page wants urgent crypto donations and has no verification.",
      "targetStars": 4,
      "platforms": [
        [
          6,
          85,
          18
        ],
        [
          24,
          69,
          18
        ],
        [
          46,
          55,
          18
        ],
        [
          18,
          39,
          18
        ],
        [
          61,
          24,
          20
        ]
      ],
      "stars": [
        [
          28,
          60
        ],
        [
          51,
          46
        ],
        [
          23,
          30
        ],
        [
          67,
          15
        ]
      ],
      "hazards": [
        [
          39,
          77,
          "\ud83d\udea9"
        ],
        [
          59,
          61,
          "\u26a0\ufe0f"
        ],
        [
          34,
          42,
          "\ud83d\udc80"
        ]
      ],
      "lesson": "Verify charities independently before donating; pressure and crypto-only payments are risky."
    },
    {
      "id": "v15-platformHints-fake-support-call-9",
      "type": "platformHints",
      "title": "Hint Platformer: Fake Support Call",
      "category": "Arcade Movement",
      "difficulty": "hard",
      "command": "JUMP \u2192 COLLECT IRIS STARS",
      "directions": "Move with A/D or arrows, jump with Space/W, collect every star, and avoid scam traps. Each star rewards an Iris Hint.",
      "seconds": 22,
      "scenario": "A popup says to call support and install remote access now.",
      "targetStars": 4,
      "platforms": [
        [
          4,
          86,
          22
        ],
        [
          22,
          68,
          18
        ],
        [
          42,
          51,
          18
        ],
        [
          63,
          33,
          20
        ],
        [
          78,
          18,
          14
        ]
      ],
      "stars": [
        [
          25,
          58
        ],
        [
          47,
          41
        ],
        [
          68,
          24
        ],
        [
          84,
          10
        ]
      ],
      "hazards": [
        [
          36,
          78,
          "\ud83d\udea9"
        ],
        [
          57,
          60,
          "\u26a0\ufe0f"
        ],
        [
          74,
          43,
          "\ud83e\udde8"
        ]
      ],
      "lesson": "Close fake warnings and use trusted support; never install surprise remote access tools."
    },
    {
      "id": "v15-platformHints-rental-deposit-rush-10",
      "type": "platformHints",
      "title": "Hint Platformer: Rental Deposit Rush",
      "category": "Arcade Movement",
      "difficulty": "easy",
      "command": "JUMP \u2192 COLLECT IRIS STARS",
      "directions": "Move with A/D or arrows, jump with Space/W, collect every star, and avoid scam traps. Each star rewards an Iris Hint.",
      "seconds": 25,
      "scenario": "A landlord refuses tours but wants a deposit by payment app today.",
      "targetStars": 4,
      "platforms": [
        [
          5,
          84,
          19
        ],
        [
          28,
          69,
          17
        ],
        [
          12,
          53,
          18
        ],
        [
          41,
          39,
          18
        ],
        [
          67,
          26,
          18
        ]
      ],
      "stars": [
        [
          32,
          60
        ],
        [
          16,
          44
        ],
        [
          46,
          30
        ],
        [
          73,
          17
        ]
      ],
      "hazards": [
        [
          23,
          76,
          "\ud83d\udea9"
        ],
        [
          54,
          54,
          "\u26a0\ufe0f"
        ],
        [
          77,
          36,
          "\ud83d\udc80"
        ]
      ],
      "lesson": "Verify property ownership and tour options before sending rental deposits."
    },
    {
      "id": "v15-platformHints-mfa-push-flood-11",
      "type": "platformHints",
      "title": "Hint Platformer: MFA Push Flood",
      "category": "Arcade Movement",
      "difficulty": "medium",
      "command": "JUMP \u2192 COLLECT IRIS STARS",
      "directions": "Move with A/D or arrows, jump with Space/W, collect every star, and avoid scam traps. Each star rewards an Iris Hint.",
      "seconds": 25,
      "scenario": "Repeated login prompts appear even though you did not sign in.",
      "targetStars": 4,
      "platforms": [
        [
          3,
          87,
          24
        ],
        [
          31,
          72,
          15
        ],
        [
          50,
          57,
          16
        ],
        [
          69,
          42,
          17
        ],
        [
          36,
          28,
          17
        ]
      ],
      "stars": [
        [
          35,
          63
        ],
        [
          55,
          48
        ],
        [
          74,
          33
        ],
        [
          41,
          19
        ]
      ],
      "hazards": [
        [
          45,
          80,
          "\ud83d\udea9"
        ],
        [
          64,
          65,
          "\u26a0\ufe0f"
        ],
        [
          58,
          38,
          "\ud83e\udde8"
        ]
      ],
      "lesson": "Deny MFA prompts you did not start, then change passwords and review sessions."
    },
    {
      "id": "v15-platformHints-qr-parking-swap-12",
      "type": "platformHints",
      "title": "Hint Platformer: QR Parking Swap",
      "category": "Arcade Movement",
      "difficulty": "hard",
      "command": "JUMP \u2192 COLLECT IRIS STARS",
      "directions": "Move with A/D or arrows, jump with Space/W, collect every star, and avoid scam traps. Each star rewards an Iris Hint.",
      "seconds": 22,
      "scenario": "A parking meter QR sticker leads to a strange payment page.",
      "targetStars": 4,
      "platforms": [
        [
          6,
          85,
          18
        ],
        [
          24,
          69,
          18
        ],
        [
          46,
          55,
          18
        ],
        [
          18,
          39,
          18
        ],
        [
          61,
          24,
          20
        ]
      ],
      "stars": [
        [
          28,
          60
        ],
        [
          51,
          46
        ],
        [
          23,
          30
        ],
        [
          67,
          15
        ]
      ],
      "hazards": [
        [
          39,
          77,
          "\ud83d\udea9"
        ],
        [
          59,
          61,
          "\u26a0\ufe0f"
        ],
        [
          34,
          42,
          "\ud83d\udc80"
        ]
      ],
      "lesson": "Use the official parking app or city website, not suspicious stickers."
    },
    {
      "id": "v15-starBridgeRun-bank-login-storm-13",
      "type": "starBridgeRun",
      "title": "Star Bridge Run: Bank Login Storm",
      "category": "Arcade Movement",
      "difficulty": "easy",
      "command": "JUMP \u2192 COLLECT IRIS STARS",
      "directions": "Move with A/D or arrows, jump with Space/W, collect every star, and avoid scam traps. Each star rewards an Iris Hint.",
      "seconds": 25,
      "scenario": "A fake bank alert demands login and MFA code before midnight.",
      "targetStars": 4,
      "platforms": [
        [
          4,
          86,
          22
        ],
        [
          22,
          68,
          18
        ],
        [
          42,
          51,
          18
        ],
        [
          63,
          33,
          20
        ],
        [
          78,
          18,
          14
        ]
      ],
      "stars": [
        [
          25,
          58
        ],
        [
          47,
          41
        ],
        [
          68,
          24
        ],
        [
          84,
          10
        ]
      ],
      "hazards": [
        [
          36,
          78,
          "\ud83d\udea9"
        ],
        [
          57,
          60,
          "\u26a0\ufe0f"
        ],
        [
          74,
          43,
          "\ud83e\udde8"
        ]
      ],
      "lesson": "Use the official bank app or saved phone number; never use a surprise login link."
    },
    {
      "id": "v15-starBridgeRun-game-prize-rush-14",
      "type": "starBridgeRun",
      "title": "Star Bridge Run: Game Prize Rush",
      "category": "Arcade Movement",
      "difficulty": "medium",
      "command": "JUMP \u2192 COLLECT IRIS STARS",
      "directions": "Move with A/D or arrows, jump with Space/W, collect every star, and avoid scam traps. Each star rewards an Iris Hint.",
      "seconds": 25,
      "scenario": "A player promises rare skins through a link outside the game.",
      "targetStars": 4,
      "platforms": [
        [
          5,
          84,
          19
        ],
        [
          28,
          69,
          17
        ],
        [
          12,
          53,
          18
        ],
        [
          41,
          39,
          18
        ],
        [
          67,
          26,
          18
        ]
      ],
      "stars": [
        [
          32,
          60
        ],
        [
          16,
          44
        ],
        [
          46,
          30
        ],
        [
          73,
          17
        ]
      ],
      "hazards": [
        [
          23,
          76,
          "\ud83d\udea9"
        ],
        [
          54,
          54,
          "\u26a0\ufe0f"
        ],
        [
          77,
          36,
          "\ud83d\udc80"
        ]
      ],
      "lesson": "Report reward links in game chat; official rewards stay inside official game systems."
    },
    {
      "id": "v15-starBridgeRun-romance-travel-fee-15",
      "type": "starBridgeRun",
      "title": "Star Bridge Run: Romance Travel Fee",
      "category": "Arcade Movement",
      "difficulty": "hard",
      "command": "JUMP \u2192 COLLECT IRIS STARS",
      "directions": "Move with A/D or arrows, jump with Space/W, collect every star, and avoid scam traps. Each star rewards an Iris Hint.",
      "seconds": 22,
      "scenario": "A new match asks for travel money and wants secrecy.",
      "targetStars": 4,
      "platforms": [
        [
          3,
          87,
          24
        ],
        [
          31,
          72,
          15
        ],
        [
          50,
          57,
          16
        ],
        [
          69,
          42,
          17
        ],
        [
          36,
          28,
          17
        ]
      ],
      "stars": [
        [
          35,
          63
        ],
        [
          55,
          48
        ],
        [
          74,
          33
        ],
        [
          41,
          19
        ]
      ],
      "hazards": [
        [
          45,
          80,
          "\ud83d\udea9"
        ],
        [
          64,
          65,
          "\u26a0\ufe0f"
        ],
        [
          58,
          38,
          "\ud83e\udde8"
        ]
      ],
      "lesson": "Money, secrecy, and fast emotional pressure are romance-scam warning signs."
    },
    {
      "id": "v15-starBridgeRun-marketplace-overpay-16",
      "type": "starBridgeRun",
      "title": "Star Bridge Run: Marketplace Overpay",
      "category": "Arcade Movement",
      "difficulty": "easy",
      "command": "JUMP \u2192 COLLECT IRIS STARS",
      "directions": "Move with A/D or arrows, jump with Space/W, collect every star, and avoid scam traps. Each star rewards an Iris Hint.",
      "seconds": 25,
      "scenario": "A buyer overpays and asks you to refund before payment clears.",
      "targetStars": 4,
      "platforms": [
        [
          6,
          85,
          18
        ],
        [
          24,
          69,
          18
        ],
        [
          46,
          55,
          18
        ],
        [
          18,
          39,
          18
        ],
        [
          61,
          24,
          20
        ]
      ],
      "stars": [
        [
          28,
          60
        ],
        [
          51,
          46
        ],
        [
          23,
          30
        ],
        [
          67,
          15
        ]
      ],
      "hazards": [
        [
          39,
          77,
          "\ud83d\udea9"
        ],
        [
          59,
          61,
          "\u26a0\ufe0f"
        ],
        [
          34,
          42,
          "\ud83d\udc80"
        ]
      ],
      "lesson": "Wait for cleared payment and stay on-platform; never refund fake overpayments."
    },
    {
      "id": "v15-starBridgeRun-package-fee-trap-17",
      "type": "starBridgeRun",
      "title": "Star Bridge Run: Package Fee Trap",
      "category": "Arcade Movement",
      "difficulty": "medium",
      "command": "JUMP \u2192 COLLECT IRIS STARS",
      "directions": "Move with A/D or arrows, jump with Space/W, collect every star, and avoid scam traps. Each star rewards an Iris Hint.",
      "seconds": 25,
      "scenario": "A text asks for a tiny redelivery fee through an unknown link.",
      "targetStars": 4,
      "platforms": [
        [
          4,
          86,
          22
        ],
        [
          22,
          68,
          18
        ],
        [
          42,
          51,
          18
        ],
        [
          63,
          33,
          20
        ],
        [
          78,
          18,
          14
        ]
      ],
      "stars": [
        [
          25,
          58
        ],
        [
          47,
          41
        ],
        [
          68,
          24
        ],
        [
          84,
          10
        ]
      ],
      "hazards": [
        [
          36,
          78,
          "\ud83d\udea9"
        ],
        [
          57,
          60,
          "\u26a0\ufe0f"
        ],
        [
          74,
          43,
          "\ud83e\udde8"
        ]
      ],
      "lesson": "Use the official carrier app/site, not random text links."
    },
    {
      "id": "v15-starBridgeRun-scholarship-portal-18",
      "type": "starBridgeRun",
      "title": "Star Bridge Run: Scholarship Portal",
      "category": "Arcade Movement",
      "difficulty": "hard",
      "command": "JUMP \u2192 COLLECT IRIS STARS",
      "directions": "Move with A/D or arrows, jump with Space/W, collect every star, and avoid scam traps. Each star rewards an Iris Hint.",
      "seconds": 22,
      "scenario": "A scholarship email asks for your school login and bank account today.",
      "targetStars": 4,
      "platforms": [
        [
          5,
          84,
          19
        ],
        [
          28,
          69,
          17
        ],
        [
          12,
          53,
          18
        ],
        [
          41,
          39,
          18
        ],
        [
          67,
          26,
          18
        ]
      ],
      "stars": [
        [
          32,
          60
        ],
        [
          16,
          44
        ],
        [
          46,
          30
        ],
        [
          73,
          17
        ]
      ],
      "hazards": [
        [
          23,
          76,
          "\ud83d\udea9"
        ],
        [
          54,
          54,
          "\u26a0\ufe0f"
        ],
        [
          77,
          36,
          "\ud83d\udc80"
        ]
      ],
      "lesson": "Use the official school portal and financial aid office, not lookalike scholarship forms."
    },
    {
      "id": "v15-starBridgeRun-ai-tool-unlocker-19",
      "type": "starBridgeRun",
      "title": "Star Bridge Run: AI Tool Unlocker",
      "category": "Arcade Movement",
      "difficulty": "easy",
      "command": "JUMP \u2192 COLLECT IRIS STARS",
      "directions": "Move with A/D or arrows, jump with Space/W, collect every star, and avoid scam traps. Each star rewards an Iris Hint.",
      "seconds": 25,
      "scenario": "A free AI unlocker asks you to disable security and download a helper.",
      "targetStars": 4,
      "platforms": [
        [
          3,
          87,
          24
        ],
        [
          31,
          72,
          15
        ],
        [
          50,
          57,
          16
        ],
        [
          69,
          42,
          17
        ],
        [
          36,
          28,
          17
        ]
      ],
      "stars": [
        [
          35,
          63
        ],
        [
          55,
          48
        ],
        [
          74,
          33
        ],
        [
          41,
          19
        ]
      ],
      "hazards": [
        [
          45,
          80,
          "\ud83d\udea9"
        ],
        [
          64,
          65,
          "\u26a0\ufe0f"
        ],
        [
          58,
          38,
          "\ud83e\udde8"
        ]
      ],
      "lesson": "Cracked AI tools and unlockers are common malware traps."
    },
    {
      "id": "v15-starBridgeRun-charity-countdown-20",
      "type": "starBridgeRun",
      "title": "Star Bridge Run: Charity Countdown",
      "category": "Arcade Movement",
      "difficulty": "medium",
      "command": "JUMP \u2192 COLLECT IRIS STARS",
      "directions": "Move with A/D or arrows, jump with Space/W, collect every star, and avoid scam traps. Each star rewards an Iris Hint.",
      "seconds": 25,
      "scenario": "A disaster charity page wants urgent crypto donations and has no verification.",
      "targetStars": 4,
      "platforms": [
        [
          6,
          85,
          18
        ],
        [
          24,
          69,
          18
        ],
        [
          46,
          55,
          18
        ],
        [
          18,
          39,
          18
        ],
        [
          61,
          24,
          20
        ]
      ],
      "stars": [
        [
          28,
          60
        ],
        [
          51,
          46
        ],
        [
          23,
          30
        ],
        [
          67,
          15
        ]
      ],
      "hazards": [
        [
          39,
          77,
          "\ud83d\udea9"
        ],
        [
          59,
          61,
          "\u26a0\ufe0f"
        ],
        [
          34,
          42,
          "\ud83d\udc80"
        ]
      ],
      "lesson": "Verify charities independently before donating; pressure and crypto-only payments are risky."
    },
    {
      "id": "v15-starBridgeRun-fake-support-call-21",
      "type": "starBridgeRun",
      "title": "Star Bridge Run: Fake Support Call",
      "category": "Arcade Movement",
      "difficulty": "hard",
      "command": "JUMP \u2192 COLLECT IRIS STARS",
      "directions": "Move with A/D or arrows, jump with Space/W, collect every star, and avoid scam traps. Each star rewards an Iris Hint.",
      "seconds": 22,
      "scenario": "A popup says to call support and install remote access now.",
      "targetStars": 4,
      "platforms": [
        [
          4,
          86,
          22
        ],
        [
          22,
          68,
          18
        ],
        [
          42,
          51,
          18
        ],
        [
          63,
          33,
          20
        ],
        [
          78,
          18,
          14
        ]
      ],
      "stars": [
        [
          25,
          58
        ],
        [
          47,
          41
        ],
        [
          68,
          24
        ],
        [
          84,
          10
        ]
      ],
      "hazards": [
        [
          36,
          78,
          "\ud83d\udea9"
        ],
        [
          57,
          60,
          "\u26a0\ufe0f"
        ],
        [
          74,
          43,
          "\ud83e\udde8"
        ]
      ],
      "lesson": "Close fake warnings and use trusted support; never install surprise remote access tools."
    },
    {
      "id": "v15-starBridgeRun-rental-deposit-rush-22",
      "type": "starBridgeRun",
      "title": "Star Bridge Run: Rental Deposit Rush",
      "category": "Arcade Movement",
      "difficulty": "easy",
      "command": "JUMP \u2192 COLLECT IRIS STARS",
      "directions": "Move with A/D or arrows, jump with Space/W, collect every star, and avoid scam traps. Each star rewards an Iris Hint.",
      "seconds": 25,
      "scenario": "A landlord refuses tours but wants a deposit by payment app today.",
      "targetStars": 4,
      "platforms": [
        [
          5,
          84,
          19
        ],
        [
          28,
          69,
          17
        ],
        [
          12,
          53,
          18
        ],
        [
          41,
          39,
          18
        ],
        [
          67,
          26,
          18
        ]
      ],
      "stars": [
        [
          32,
          60
        ],
        [
          16,
          44
        ],
        [
          46,
          30
        ],
        [
          73,
          17
        ]
      ],
      "hazards": [
        [
          23,
          76,
          "\ud83d\udea9"
        ],
        [
          54,
          54,
          "\u26a0\ufe0f"
        ],
        [
          77,
          36,
          "\ud83d\udc80"
        ]
      ],
      "lesson": "Verify property ownership and tour options before sending rental deposits."
    },
    {
      "id": "v15-starBridgeRun-mfa-push-flood-23",
      "type": "starBridgeRun",
      "title": "Star Bridge Run: MFA Push Flood",
      "category": "Arcade Movement",
      "difficulty": "medium",
      "command": "JUMP \u2192 COLLECT IRIS STARS",
      "directions": "Move with A/D or arrows, jump with Space/W, collect every star, and avoid scam traps. Each star rewards an Iris Hint.",
      "seconds": 25,
      "scenario": "Repeated login prompts appear even though you did not sign in.",
      "targetStars": 4,
      "platforms": [
        [
          3,
          87,
          24
        ],
        [
          31,
          72,
          15
        ],
        [
          50,
          57,
          16
        ],
        [
          69,
          42,
          17
        ],
        [
          36,
          28,
          17
        ]
      ],
      "stars": [
        [
          35,
          63
        ],
        [
          55,
          48
        ],
        [
          74,
          33
        ],
        [
          41,
          19
        ]
      ],
      "hazards": [
        [
          45,
          80,
          "\ud83d\udea9"
        ],
        [
          64,
          65,
          "\u26a0\ufe0f"
        ],
        [
          58,
          38,
          "\ud83e\udde8"
        ]
      ],
      "lesson": "Deny MFA prompts you did not start, then change passwords and review sessions."
    },
    {
      "id": "v15-starBridgeRun-qr-parking-swap-24",
      "type": "starBridgeRun",
      "title": "Star Bridge Run: QR Parking Swap",
      "category": "Arcade Movement",
      "difficulty": "hard",
      "command": "JUMP \u2192 COLLECT IRIS STARS",
      "directions": "Move with A/D or arrows, jump with Space/W, collect every star, and avoid scam traps. Each star rewards an Iris Hint.",
      "seconds": 22,
      "scenario": "A parking meter QR sticker leads to a strange payment page.",
      "targetStars": 4,
      "platforms": [
        [
          6,
          85,
          18
        ],
        [
          24,
          69,
          18
        ],
        [
          46,
          55,
          18
        ],
        [
          18,
          39,
          18
        ],
        [
          61,
          24,
          20
        ]
      ],
      "stars": [
        [
          28,
          60
        ],
        [
          51,
          46
        ],
        [
          23,
          30
        ],
        [
          67,
          15
        ]
      ],
      "hazards": [
        [
          39,
          77,
          "\ud83d\udea9"
        ],
        [
          59,
          61,
          "\u26a0\ufe0f"
        ],
        [
          34,
          42,
          "\ud83d\udc80"
        ]
      ],
      "lesson": "Use the official parking app or city website, not suspicious stickers."
    },
    {
      "id": "v15-shield-bank-login-storm",
      "type": "shieldCursor",
      "title": "Mouse Shield Defense: Bank Login Storm",
      "category": "Bank Phishing",
      "difficulty": "easy",
      "command": "MOVE SHIELD \u2192 BLOCK SCAM PRESSURE",
      "directions": "Move the shield with mouse/touch or WASD. Block scam labels and let safe verification pass.",
      "seconds": 16,
      "scenario": "A fake bank alert demands login and MFA code before midnight.",
      "scamLabels": [
        "SEND CODE",
        "PAY NOW",
        "OPEN LINK",
        "GIFT CARD",
        "REMOTE ACCESS",
        "CRYPTO FAST"
      ],
      "safeLabels": [
        "Official app",
        "Saved number",
        "Known portal",
        "Report button",
        "Trusted adult"
      ],
      "target": 6,
      "lesson": "Use the official bank app or saved phone number; never use a surprise login link."
    },
    {
      "id": "v15-dodge-bank-login-storm",
      "type": "scamRainDodge",
      "title": "Scam Text Rain Dodge: Bank Login Storm",
      "category": "Bank Phishing",
      "difficulty": "easy",
      "command": "LEFT/RIGHT \u2192 DODGE SCAMS",
      "directions": "Move left/right, dodge scam text blocks, and collect verification stars.",
      "seconds": 17,
      "scenario": "A fake bank alert demands login and MFA code before midnight.",
      "scamLabels": [
        "URGENT",
        "PAY FEE",
        "SEND CODE",
        "LOGIN NOW",
        "SECRET",
        "DOWNLOAD"
      ],
      "target": 4,
      "lesson": "Use the official bank app or saved phone number; never use a surprise login link."
    },
    {
      "id": "v15-paddle-bank-login-storm",
      "type": "packetPaddle",
      "title": "Firewall Paddle: Bank Login Storm",
      "category": "Bank Phishing",
      "difficulty": "easy",
      "command": "MOVE FIREWALL \u2192 BLOCK SCAM PACKETS",
      "directions": "Block red scam packets and let safe packets pass.",
      "seconds": 16,
      "scenario": "A fake bank alert demands login and MFA code before midnight.",
      "scamLabels": [
        "phish",
        "malware",
        "fake-pay",
        "code-theft",
        "remote-access"
      ],
      "safeLabels": [
        "receipt",
        "known contact",
        "official notice",
        "class note"
      ],
      "target": 6,
      "lesson": "Use the official bank app or saved phone number; never use a surprise login link."
    },
    {
      "id": "v15-browser-bank-login-storm",
      "type": "browserPatchRun",
      "title": "Browser Rescue Run: Bank Login Storm",
      "category": "Bank Phishing",
      "difficulty": "easy",
      "command": "CLOSE BAIT \u2192 STOP DOWNLOAD \u2192 CLEAR PERMISSION",
      "directions": "Fix browser danger in the correct order while the meter rises.",
      "seconds": 16,
      "scenario": "A fake bank alert demands login and MFA code before midnight.",
      "lesson": "Use the official bank app or saved phone number; never use a surprise login link."
    },
    {
      "id": "v15-phone-bank-login-storm",
      "type": "phoneTapSequence",
      "title": "Phone Report Path: Bank Login Storm",
      "category": "Bank Phishing",
      "difficulty": "easy",
      "command": "PHONE PATH \u2192 REPORT SAFELY",
      "directions": "Navigate the phone menu in the safe order.",
      "seconds": 17,
      "scenario": "A fake bank alert demands login and MFA code before midnight.",
      "message": "A fake bank alert demands login and MFA code before midnight. Tap here: verify-fast-help.net",
      "sender": "Unknown",
      "steps": [
        "Open suspicious message",
        "Open sender options",
        "Report or block",
        "Confirm safety action"
      ],
      "lesson": "Use the official bank app or saved phone number; never use a surprise login link."
    },
    {
      "id": "v15-whack-bank-login-storm",
      "type": "scamWhack",
      "title": "Scam Whack: Bank Login Storm",
      "category": "Bank Phishing",
      "difficulty": "easy",
      "command": "WHACK SCAMS ONLY",
      "directions": "Tap scam popups only. Safe reminders are decoys.",
      "seconds": 15,
      "scenario": "A fake bank alert demands login and MFA code before midnight.",
      "scamLabels": [
        "PAY NOW",
        "SEND CODE",
        "FREE PRIZE",
        "LOGIN FAST",
        "ALLOW",
        "INSTALL"
      ],
      "safeLabels": [
        "Official app",
        "Known contact",
        "Calendar",
        "Report menu"
      ],
      "target": 6,
      "lesson": "Use the official bank app or saved phone number; never use a surprise login link."
    },
    {
      "id": "v15-adclean-bank-login-storm",
      "type": "fakeAdClean",
      "title": "Fake Ad Cleaner: Bank Login Storm",
      "category": "Bank Phishing",
      "difficulty": "easy",
      "command": "CLOSE REAL X BUTTONS",
      "directions": "Clean fake ads by pressing real X buttons only.",
      "seconds": 15,
      "scenario": "A fake bank alert demands login and MFA code before midnight.",
      "lesson": "Use the official bank app or saved phone number; never use a surprise login link."
    },
    {
      "id": "v15-linkbridge-bank-login-storm",
      "type": "browserRedirectMaze",
      "title": "Browser Redirect Maze: Bank Login Storm",
      "category": "Bank Phishing",
      "difficulty": "easy",
      "command": "STEP ONLY ON SAFE DOMAINS",
      "directions": "Choose safe domains across the bridge. One lookalike collapses the route.",
      "seconds": 18,
      "scenario": "A fake bank alert demands login and MFA code before midnight.",
      "official": "official-source.com",
      "domains": [
        "official-source.com",
        "real-company.com",
        "secure-login-fast.net",
        "account-verify.co",
        "gift-claim-now.info",
        "helpdesk-refund.biz"
      ],
      "lesson": "Use the official bank app or saved phone number; never use a surprise login link."
    },
    {
      "id": "v15-romancechat-bank-login-storm",
      "type": "romanceEvidenceChat",
      "title": "Live Evidence Chat: Bank Login Storm",
      "category": "Bank Phishing",
      "difficulty": "easy",
      "command": "COLLECT RED FLAGS \u2192 REPORT",
      "directions": "Messages appear one at a time. Tap red-flag evidence chips, then report/block.",
      "seconds": 18,
      "scenario": "A fake bank alert demands login and MFA code before midnight.",
      "profile": "Alex",
      "flags": [
        "money request",
        "secrecy",
        "urgent deadline",
        "external app",
        "fake emergency"
      ],
      "lesson": "Use the official bank app or saved phone number; never use a surprise login link."
    },
    {
      "id": "v15-gameroom-bank-login-storm",
      "type": "gameChatReport",
      "title": "Live Game Room: Bank Login Storm",
      "category": "Game Chat",
      "difficulty": "easy",
      "command": "WATCH CHAT \u2192 MUTE + REPORT",
      "directions": "Messages appear one at a time. The scammer is randomized every run.",
      "seconds": 16,
      "player": "ScamBot99",
      "message": "A fake bank alert demands login and MFA code before midnight. Use my link: prize-fast-verify.net",
      "decoys": [
        "PixelPat",
        "GardenMom",
        "Runner42",
        "StudyBuddy",
        "NovaKid",
        "CraftyCat"
      ],
      "lesson": "Use the official bank app or saved phone number; never use a surprise login link."
    },
    {
      "id": "v15-shield-game-prize-rush",
      "type": "shieldCursor",
      "title": "Mouse Shield Defense: Game Prize Rush",
      "category": "Gaming Scam",
      "difficulty": "medium",
      "command": "MOVE SHIELD \u2192 BLOCK SCAM PRESSURE",
      "directions": "Move the shield with mouse/touch or WASD. Block scam labels and let safe verification pass.",
      "seconds": 16,
      "scenario": "A player promises rare skins through a link outside the game.",
      "scamLabels": [
        "SEND CODE",
        "PAY NOW",
        "OPEN LINK",
        "GIFT CARD",
        "REMOTE ACCESS",
        "CRYPTO FAST"
      ],
      "safeLabels": [
        "Official app",
        "Saved number",
        "Known portal",
        "Report button",
        "Trusted adult"
      ],
      "target": 6,
      "lesson": "Report reward links in game chat; official rewards stay inside official game systems."
    },
    {
      "id": "v15-dodge-game-prize-rush",
      "type": "scamRainDodge",
      "title": "Scam Text Rain Dodge: Game Prize Rush",
      "category": "Gaming Scam",
      "difficulty": "medium",
      "command": "LEFT/RIGHT \u2192 DODGE SCAMS",
      "directions": "Move left/right, dodge scam text blocks, and collect verification stars.",
      "seconds": 17,
      "scenario": "A player promises rare skins through a link outside the game.",
      "scamLabels": [
        "URGENT",
        "PAY FEE",
        "SEND CODE",
        "LOGIN NOW",
        "SECRET",
        "DOWNLOAD"
      ],
      "target": 4,
      "lesson": "Report reward links in game chat; official rewards stay inside official game systems."
    },
    {
      "id": "v15-paddle-game-prize-rush",
      "type": "packetPaddle",
      "title": "Firewall Paddle: Game Prize Rush",
      "category": "Gaming Scam",
      "difficulty": "medium",
      "command": "MOVE FIREWALL \u2192 BLOCK SCAM PACKETS",
      "directions": "Block red scam packets and let safe packets pass.",
      "seconds": 16,
      "scenario": "A player promises rare skins through a link outside the game.",
      "scamLabels": [
        "phish",
        "malware",
        "fake-pay",
        "code-theft",
        "remote-access"
      ],
      "safeLabels": [
        "receipt",
        "known contact",
        "official notice",
        "class note"
      ],
      "target": 6,
      "lesson": "Report reward links in game chat; official rewards stay inside official game systems."
    },
    {
      "id": "v15-browser-game-prize-rush",
      "type": "browserPatchRun",
      "title": "Browser Rescue Run: Game Prize Rush",
      "category": "Gaming Scam",
      "difficulty": "medium",
      "command": "CLOSE BAIT \u2192 STOP DOWNLOAD \u2192 CLEAR PERMISSION",
      "directions": "Fix browser danger in the correct order while the meter rises.",
      "seconds": 16,
      "scenario": "A player promises rare skins through a link outside the game.",
      "lesson": "Report reward links in game chat; official rewards stay inside official game systems."
    },
    {
      "id": "v15-phone-game-prize-rush",
      "type": "phoneTapSequence",
      "title": "Phone Report Path: Game Prize Rush",
      "category": "Gaming Scam",
      "difficulty": "medium",
      "command": "PHONE PATH \u2192 REPORT SAFELY",
      "directions": "Navigate the phone menu in the safe order.",
      "seconds": 17,
      "scenario": "A player promises rare skins through a link outside the game.",
      "message": "A player promises rare skins through a link outside the game. Tap here: verify-fast-help.net",
      "sender": "Unknown",
      "steps": [
        "Open suspicious message",
        "Open sender options",
        "Report or block",
        "Confirm safety action"
      ],
      "lesson": "Report reward links in game chat; official rewards stay inside official game systems."
    },
    {
      "id": "v15-whack-game-prize-rush",
      "type": "scamWhack",
      "title": "Scam Whack: Game Prize Rush",
      "category": "Gaming Scam",
      "difficulty": "medium",
      "command": "WHACK SCAMS ONLY",
      "directions": "Tap scam popups only. Safe reminders are decoys.",
      "seconds": 15,
      "scenario": "A player promises rare skins through a link outside the game.",
      "scamLabels": [
        "PAY NOW",
        "SEND CODE",
        "FREE PRIZE",
        "LOGIN FAST",
        "ALLOW",
        "INSTALL"
      ],
      "safeLabels": [
        "Official app",
        "Known contact",
        "Calendar",
        "Report menu"
      ],
      "target": 6,
      "lesson": "Report reward links in game chat; official rewards stay inside official game systems."
    },
    {
      "id": "v15-adclean-game-prize-rush",
      "type": "fakeAdClean",
      "title": "Fake Ad Cleaner: Game Prize Rush",
      "category": "Gaming Scam",
      "difficulty": "medium",
      "command": "CLOSE REAL X BUTTONS",
      "directions": "Clean fake ads by pressing real X buttons only.",
      "seconds": 15,
      "scenario": "A player promises rare skins through a link outside the game.",
      "lesson": "Report reward links in game chat; official rewards stay inside official game systems."
    },
    {
      "id": "v15-linkbridge-game-prize-rush",
      "type": "browserRedirectMaze",
      "title": "Browser Redirect Maze: Game Prize Rush",
      "category": "Gaming Scam",
      "difficulty": "medium",
      "command": "STEP ONLY ON SAFE DOMAINS",
      "directions": "Choose safe domains across the bridge. One lookalike collapses the route.",
      "seconds": 18,
      "scenario": "A player promises rare skins through a link outside the game.",
      "official": "official-source.com",
      "domains": [
        "official-source.com",
        "real-company.com",
        "secure-login-fast.net",
        "account-verify.co",
        "gift-claim-now.info",
        "helpdesk-refund.biz"
      ],
      "lesson": "Report reward links in game chat; official rewards stay inside official game systems."
    },
    {
      "id": "v15-romancechat-game-prize-rush",
      "type": "romanceEvidenceChat",
      "title": "Live Evidence Chat: Game Prize Rush",
      "category": "Gaming Scam",
      "difficulty": "medium",
      "command": "COLLECT RED FLAGS \u2192 REPORT",
      "directions": "Messages appear one at a time. Tap red-flag evidence chips, then report/block.",
      "seconds": 18,
      "scenario": "A player promises rare skins through a link outside the game.",
      "profile": "Jordan",
      "flags": [
        "money request",
        "secrecy",
        "urgent deadline",
        "external app",
        "fake emergency"
      ],
      "lesson": "Report reward links in game chat; official rewards stay inside official game systems."
    },
    {
      "id": "v15-gameroom-game-prize-rush",
      "type": "gameChatReport",
      "title": "Live Game Room: Game Prize Rush",
      "category": "Game Chat",
      "difficulty": "medium",
      "command": "WATCH CHAT \u2192 MUTE + REPORT",
      "directions": "Messages appear one at a time. The scammer is randomized every run.",
      "seconds": 16,
      "player": "ScamBot99",
      "message": "A player promises rare skins through a link outside the game. Use my link: prize-fast-verify.net",
      "decoys": [
        "PixelPat",
        "GardenMom",
        "Runner42",
        "StudyBuddy",
        "NovaKid",
        "CraftyCat"
      ],
      "lesson": "Report reward links in game chat; official rewards stay inside official game systems."
    },
    {
      "id": "v15-shield-romance-travel-fee",
      "type": "shieldCursor",
      "title": "Mouse Shield Defense: Romance Travel Fee",
      "category": "Romance Scam",
      "difficulty": "hard",
      "command": "MOVE SHIELD \u2192 BLOCK SCAM PRESSURE",
      "directions": "Move the shield with mouse/touch or WASD. Block scam labels and let safe verification pass.",
      "seconds": 16,
      "scenario": "A new match asks for travel money and wants secrecy.",
      "scamLabels": [
        "SEND CODE",
        "PAY NOW",
        "OPEN LINK",
        "GIFT CARD",
        "REMOTE ACCESS",
        "CRYPTO FAST"
      ],
      "safeLabels": [
        "Official app",
        "Saved number",
        "Known portal",
        "Report button",
        "Trusted adult"
      ],
      "target": 7,
      "lesson": "Money, secrecy, and fast emotional pressure are romance-scam warning signs."
    },
    {
      "id": "v15-dodge-romance-travel-fee",
      "type": "scamRainDodge",
      "title": "Scam Text Rain Dodge: Romance Travel Fee",
      "category": "Romance Scam",
      "difficulty": "hard",
      "command": "LEFT/RIGHT \u2192 DODGE SCAMS",
      "directions": "Move left/right, dodge scam text blocks, and collect verification stars.",
      "seconds": 17,
      "scenario": "A new match asks for travel money and wants secrecy.",
      "scamLabels": [
        "URGENT",
        "PAY FEE",
        "SEND CODE",
        "LOGIN NOW",
        "SECRET",
        "DOWNLOAD"
      ],
      "target": 5,
      "lesson": "Money, secrecy, and fast emotional pressure are romance-scam warning signs."
    },
    {
      "id": "v15-paddle-romance-travel-fee",
      "type": "packetPaddle",
      "title": "Firewall Paddle: Romance Travel Fee",
      "category": "Romance Scam",
      "difficulty": "hard",
      "command": "MOVE FIREWALL \u2192 BLOCK SCAM PACKETS",
      "directions": "Block red scam packets and let safe packets pass.",
      "seconds": 16,
      "scenario": "A new match asks for travel money and wants secrecy.",
      "scamLabels": [
        "phish",
        "malware",
        "fake-pay",
        "code-theft",
        "remote-access"
      ],
      "safeLabels": [
        "receipt",
        "known contact",
        "official notice",
        "class note"
      ],
      "target": 6,
      "lesson": "Money, secrecy, and fast emotional pressure are romance-scam warning signs."
    },
    {
      "id": "v15-browser-romance-travel-fee",
      "type": "browserPatchRun",
      "title": "Browser Rescue Run: Romance Travel Fee",
      "category": "Romance Scam",
      "difficulty": "hard",
      "command": "CLOSE BAIT \u2192 STOP DOWNLOAD \u2192 CLEAR PERMISSION",
      "directions": "Fix browser danger in the correct order while the meter rises.",
      "seconds": 16,
      "scenario": "A new match asks for travel money and wants secrecy.",
      "lesson": "Money, secrecy, and fast emotional pressure are romance-scam warning signs."
    },
    {
      "id": "v15-phone-romance-travel-fee",
      "type": "phoneTapSequence",
      "title": "Phone Report Path: Romance Travel Fee",
      "category": "Romance Scam",
      "difficulty": "hard",
      "command": "PHONE PATH \u2192 REPORT SAFELY",
      "directions": "Navigate the phone menu in the safe order.",
      "seconds": 17,
      "scenario": "A new match asks for travel money and wants secrecy.",
      "message": "A new match asks for travel money and wants secrecy. Tap here: verify-fast-help.net",
      "sender": "Unknown",
      "steps": [
        "Open suspicious message",
        "Open sender options",
        "Report or block",
        "Confirm safety action"
      ],
      "lesson": "Money, secrecy, and fast emotional pressure are romance-scam warning signs."
    },
    {
      "id": "v15-whack-romance-travel-fee",
      "type": "scamWhack",
      "title": "Scam Whack: Romance Travel Fee",
      "category": "Romance Scam",
      "difficulty": "hard",
      "command": "WHACK SCAMS ONLY",
      "directions": "Tap scam popups only. Safe reminders are decoys.",
      "seconds": 15,
      "scenario": "A new match asks for travel money and wants secrecy.",
      "scamLabels": [
        "PAY NOW",
        "SEND CODE",
        "FREE PRIZE",
        "LOGIN FAST",
        "ALLOW",
        "INSTALL"
      ],
      "safeLabels": [
        "Official app",
        "Known contact",
        "Calendar",
        "Report menu"
      ],
      "target": 7,
      "lesson": "Money, secrecy, and fast emotional pressure are romance-scam warning signs."
    },
    {
      "id": "v15-adclean-romance-travel-fee",
      "type": "fakeAdClean",
      "title": "Fake Ad Cleaner: Romance Travel Fee",
      "category": "Romance Scam",
      "difficulty": "hard",
      "command": "CLOSE REAL X BUTTONS",
      "directions": "Clean fake ads by pressing real X buttons only.",
      "seconds": 15,
      "scenario": "A new match asks for travel money and wants secrecy.",
      "lesson": "Money, secrecy, and fast emotional pressure are romance-scam warning signs."
    },
    {
      "id": "v15-linkbridge-romance-travel-fee",
      "type": "browserRedirectMaze",
      "title": "Browser Redirect Maze: Romance Travel Fee",
      "category": "Romance Scam",
      "difficulty": "hard",
      "command": "STEP ONLY ON SAFE DOMAINS",
      "directions": "Choose safe domains across the bridge. One lookalike collapses the route.",
      "seconds": 18,
      "scenario": "A new match asks for travel money and wants secrecy.",
      "official": "official-source.com",
      "domains": [
        "official-source.com",
        "real-company.com",
        "secure-login-fast.net",
        "account-verify.co",
        "gift-claim-now.info",
        "helpdesk-refund.biz"
      ],
      "lesson": "Money, secrecy, and fast emotional pressure are romance-scam warning signs."
    },
    {
      "id": "v15-romancechat-romance-travel-fee",
      "type": "romanceEvidenceChat",
      "title": "Live Evidence Chat: Romance Travel Fee",
      "category": "Romance Scam",
      "difficulty": "hard",
      "command": "COLLECT RED FLAGS \u2192 REPORT",
      "directions": "Messages appear one at a time. Tap red-flag evidence chips, then report/block.",
      "seconds": 18,
      "scenario": "A new match asks for travel money and wants secrecy.",
      "profile": "Casey",
      "flags": [
        "money request",
        "secrecy",
        "urgent deadline",
        "external app",
        "fake emergency"
      ],
      "lesson": "Money, secrecy, and fast emotional pressure are romance-scam warning signs."
    },
    {
      "id": "v15-gameroom-romance-travel-fee",
      "type": "gameChatReport",
      "title": "Live Game Room: Romance Travel Fee",
      "category": "Game Chat",
      "difficulty": "hard",
      "command": "WATCH CHAT \u2192 MUTE + REPORT",
      "directions": "Messages appear one at a time. The scammer is randomized every run.",
      "seconds": 16,
      "player": "ScamBot99",
      "message": "A new match asks for travel money and wants secrecy. Use my link: prize-fast-verify.net",
      "decoys": [
        "PixelPat",
        "GardenMom",
        "Runner42",
        "StudyBuddy",
        "NovaKid",
        "CraftyCat"
      ],
      "lesson": "Money, secrecy, and fast emotional pressure are romance-scam warning signs."
    },
    {
      "id": "v15-shield-marketplace-overpay",
      "type": "shieldCursor",
      "title": "Mouse Shield Defense: Marketplace Overpay",
      "category": "Marketplace Scam",
      "difficulty": "easy",
      "command": "MOVE SHIELD \u2192 BLOCK SCAM PRESSURE",
      "directions": "Move the shield with mouse/touch or WASD. Block scam labels and let safe verification pass.",
      "seconds": 16,
      "scenario": "A buyer overpays and asks you to refund before payment clears.",
      "scamLabels": [
        "SEND CODE",
        "PAY NOW",
        "OPEN LINK",
        "GIFT CARD",
        "REMOTE ACCESS",
        "CRYPTO FAST"
      ],
      "safeLabels": [
        "Official app",
        "Saved number",
        "Known portal",
        "Report button",
        "Trusted adult"
      ],
      "target": 6,
      "lesson": "Wait for cleared payment and stay on-platform; never refund fake overpayments."
    },
    {
      "id": "v15-dodge-marketplace-overpay",
      "type": "scamRainDodge",
      "title": "Scam Text Rain Dodge: Marketplace Overpay",
      "category": "Marketplace Scam",
      "difficulty": "easy",
      "command": "LEFT/RIGHT \u2192 DODGE SCAMS",
      "directions": "Move left/right, dodge scam text blocks, and collect verification stars.",
      "seconds": 17,
      "scenario": "A buyer overpays and asks you to refund before payment clears.",
      "scamLabels": [
        "URGENT",
        "PAY FEE",
        "SEND CODE",
        "LOGIN NOW",
        "SECRET",
        "DOWNLOAD"
      ],
      "target": 4,
      "lesson": "Wait for cleared payment and stay on-platform; never refund fake overpayments."
    },
    {
      "id": "v15-paddle-marketplace-overpay",
      "type": "packetPaddle",
      "title": "Firewall Paddle: Marketplace Overpay",
      "category": "Marketplace Scam",
      "difficulty": "easy",
      "command": "MOVE FIREWALL \u2192 BLOCK SCAM PACKETS",
      "directions": "Block red scam packets and let safe packets pass.",
      "seconds": 16,
      "scenario": "A buyer overpays and asks you to refund before payment clears.",
      "scamLabels": [
        "phish",
        "malware",
        "fake-pay",
        "code-theft",
        "remote-access"
      ],
      "safeLabels": [
        "receipt",
        "known contact",
        "official notice",
        "class note"
      ],
      "target": 6,
      "lesson": "Wait for cleared payment and stay on-platform; never refund fake overpayments."
    },
    {
      "id": "v15-browser-marketplace-overpay",
      "type": "browserPatchRun",
      "title": "Browser Rescue Run: Marketplace Overpay",
      "category": "Marketplace Scam",
      "difficulty": "easy",
      "command": "CLOSE BAIT \u2192 STOP DOWNLOAD \u2192 CLEAR PERMISSION",
      "directions": "Fix browser danger in the correct order while the meter rises.",
      "seconds": 16,
      "scenario": "A buyer overpays and asks you to refund before payment clears.",
      "lesson": "Wait for cleared payment and stay on-platform; never refund fake overpayments."
    },
    {
      "id": "v15-phone-marketplace-overpay",
      "type": "phoneTapSequence",
      "title": "Phone Report Path: Marketplace Overpay",
      "category": "Marketplace Scam",
      "difficulty": "easy",
      "command": "PHONE PATH \u2192 REPORT SAFELY",
      "directions": "Navigate the phone menu in the safe order.",
      "seconds": 17,
      "scenario": "A buyer overpays and asks you to refund before payment clears.",
      "message": "A buyer overpays and asks you to refund before payment clears. Tap here: verify-fast-help.net",
      "sender": "Unknown",
      "steps": [
        "Open suspicious message",
        "Open sender options",
        "Report or block",
        "Confirm safety action"
      ],
      "lesson": "Wait for cleared payment and stay on-platform; never refund fake overpayments."
    },
    {
      "id": "v15-whack-marketplace-overpay",
      "type": "scamWhack",
      "title": "Scam Whack: Marketplace Overpay",
      "category": "Marketplace Scam",
      "difficulty": "easy",
      "command": "WHACK SCAMS ONLY",
      "directions": "Tap scam popups only. Safe reminders are decoys.",
      "seconds": 15,
      "scenario": "A buyer overpays and asks you to refund before payment clears.",
      "scamLabels": [
        "PAY NOW",
        "SEND CODE",
        "FREE PRIZE",
        "LOGIN FAST",
        "ALLOW",
        "INSTALL"
      ],
      "safeLabels": [
        "Official app",
        "Known contact",
        "Calendar",
        "Report menu"
      ],
      "target": 6,
      "lesson": "Wait for cleared payment and stay on-platform; never refund fake overpayments."
    },
    {
      "id": "v15-adclean-marketplace-overpay",
      "type": "fakeAdClean",
      "title": "Fake Ad Cleaner: Marketplace Overpay",
      "category": "Marketplace Scam",
      "difficulty": "easy",
      "command": "CLOSE REAL X BUTTONS",
      "directions": "Clean fake ads by pressing real X buttons only.",
      "seconds": 15,
      "scenario": "A buyer overpays and asks you to refund before payment clears.",
      "lesson": "Wait for cleared payment and stay on-platform; never refund fake overpayments."
    },
    {
      "id": "v15-linkbridge-marketplace-overpay",
      "type": "browserRedirectMaze",
      "title": "Browser Redirect Maze: Marketplace Overpay",
      "category": "Marketplace Scam",
      "difficulty": "easy",
      "command": "STEP ONLY ON SAFE DOMAINS",
      "directions": "Choose safe domains across the bridge. One lookalike collapses the route.",
      "seconds": 18,
      "scenario": "A buyer overpays and asks you to refund before payment clears.",
      "official": "official-source.com",
      "domains": [
        "official-source.com",
        "real-company.com",
        "secure-login-fast.net",
        "account-verify.co",
        "gift-claim-now.info",
        "helpdesk-refund.biz"
      ],
      "lesson": "Wait for cleared payment and stay on-platform; never refund fake overpayments."
    },
    {
      "id": "v15-romancechat-marketplace-overpay",
      "type": "romanceEvidenceChat",
      "title": "Live Evidence Chat: Marketplace Overpay",
      "category": "Marketplace Scam",
      "difficulty": "easy",
      "command": "COLLECT RED FLAGS \u2192 REPORT",
      "directions": "Messages appear one at a time. Tap red-flag evidence chips, then report/block.",
      "seconds": 18,
      "scenario": "A buyer overpays and asks you to refund before payment clears.",
      "profile": "Taylor",
      "flags": [
        "money request",
        "secrecy",
        "urgent deadline",
        "external app",
        "fake emergency"
      ],
      "lesson": "Wait for cleared payment and stay on-platform; never refund fake overpayments."
    },
    {
      "id": "v15-gameroom-marketplace-overpay",
      "type": "gameChatReport",
      "title": "Live Game Room: Marketplace Overpay",
      "category": "Game Chat",
      "difficulty": "easy",
      "command": "WATCH CHAT \u2192 MUTE + REPORT",
      "directions": "Messages appear one at a time. The scammer is randomized every run.",
      "seconds": 16,
      "player": "ScamBot99",
      "message": "A buyer overpays and asks you to refund before payment clears. Use my link: prize-fast-verify.net",
      "decoys": [
        "PixelPat",
        "GardenMom",
        "Runner42",
        "StudyBuddy",
        "NovaKid",
        "CraftyCat"
      ],
      "lesson": "Wait for cleared payment and stay on-platform; never refund fake overpayments."
    },
    {
      "id": "v15-shield-package-fee-trap",
      "type": "shieldCursor",
      "title": "Mouse Shield Defense: Package Fee Trap",
      "category": "Package Scam",
      "difficulty": "medium",
      "command": "MOVE SHIELD \u2192 BLOCK SCAM PRESSURE",
      "directions": "Move the shield with mouse/touch or WASD. Block scam labels and let safe verification pass.",
      "seconds": 16,
      "scenario": "A text asks for a tiny redelivery fee through an unknown link.",
      "scamLabels": [
        "SEND CODE",
        "PAY NOW",
        "OPEN LINK",
        "GIFT CARD",
        "REMOTE ACCESS",
        "CRYPTO FAST"
      ],
      "safeLabels": [
        "Official app",
        "Saved number",
        "Known portal",
        "Report button",
        "Trusted adult"
      ],
      "target": 6,
      "lesson": "Use the official carrier app/site, not random text links."
    },
    {
      "id": "v15-dodge-package-fee-trap",
      "type": "scamRainDodge",
      "title": "Scam Text Rain Dodge: Package Fee Trap",
      "category": "Package Scam",
      "difficulty": "medium",
      "command": "LEFT/RIGHT \u2192 DODGE SCAMS",
      "directions": "Move left/right, dodge scam text blocks, and collect verification stars.",
      "seconds": 17,
      "scenario": "A text asks for a tiny redelivery fee through an unknown link.",
      "scamLabels": [
        "URGENT",
        "PAY FEE",
        "SEND CODE",
        "LOGIN NOW",
        "SECRET",
        "DOWNLOAD"
      ],
      "target": 4,
      "lesson": "Use the official carrier app/site, not random text links."
    },
    {
      "id": "v15-paddle-package-fee-trap",
      "type": "packetPaddle",
      "title": "Firewall Paddle: Package Fee Trap",
      "category": "Package Scam",
      "difficulty": "medium",
      "command": "MOVE FIREWALL \u2192 BLOCK SCAM PACKETS",
      "directions": "Block red scam packets and let safe packets pass.",
      "seconds": 16,
      "scenario": "A text asks for a tiny redelivery fee through an unknown link.",
      "scamLabels": [
        "phish",
        "malware",
        "fake-pay",
        "code-theft",
        "remote-access"
      ],
      "safeLabels": [
        "receipt",
        "known contact",
        "official notice",
        "class note"
      ],
      "target": 6,
      "lesson": "Use the official carrier app/site, not random text links."
    },
    {
      "id": "v15-browser-package-fee-trap",
      "type": "browserPatchRun",
      "title": "Browser Rescue Run: Package Fee Trap",
      "category": "Package Scam",
      "difficulty": "medium",
      "command": "CLOSE BAIT \u2192 STOP DOWNLOAD \u2192 CLEAR PERMISSION",
      "directions": "Fix browser danger in the correct order while the meter rises.",
      "seconds": 16,
      "scenario": "A text asks for a tiny redelivery fee through an unknown link.",
      "lesson": "Use the official carrier app/site, not random text links."
    },
    {
      "id": "v15-phone-package-fee-trap",
      "type": "phoneTapSequence",
      "title": "Phone Report Path: Package Fee Trap",
      "category": "Package Scam",
      "difficulty": "medium",
      "command": "PHONE PATH \u2192 REPORT SAFELY",
      "directions": "Navigate the phone menu in the safe order.",
      "seconds": 17,
      "scenario": "A text asks for a tiny redelivery fee through an unknown link.",
      "message": "A text asks for a tiny redelivery fee through an unknown link. Tap here: verify-fast-help.net",
      "sender": "Unknown",
      "steps": [
        "Open suspicious message",
        "Open sender options",
        "Report or block",
        "Confirm safety action"
      ],
      "lesson": "Use the official carrier app/site, not random text links."
    },
    {
      "id": "v15-whack-package-fee-trap",
      "type": "scamWhack",
      "title": "Scam Whack: Package Fee Trap",
      "category": "Package Scam",
      "difficulty": "medium",
      "command": "WHACK SCAMS ONLY",
      "directions": "Tap scam popups only. Safe reminders are decoys.",
      "seconds": 15,
      "scenario": "A text asks for a tiny redelivery fee through an unknown link.",
      "scamLabels": [
        "PAY NOW",
        "SEND CODE",
        "FREE PRIZE",
        "LOGIN FAST",
        "ALLOW",
        "INSTALL"
      ],
      "safeLabels": [
        "Official app",
        "Known contact",
        "Calendar",
        "Report menu"
      ],
      "target": 6,
      "lesson": "Use the official carrier app/site, not random text links."
    },
    {
      "id": "v15-adclean-package-fee-trap",
      "type": "fakeAdClean",
      "title": "Fake Ad Cleaner: Package Fee Trap",
      "category": "Package Scam",
      "difficulty": "medium",
      "command": "CLOSE REAL X BUTTONS",
      "directions": "Clean fake ads by pressing real X buttons only.",
      "seconds": 15,
      "scenario": "A text asks for a tiny redelivery fee through an unknown link.",
      "lesson": "Use the official carrier app/site, not random text links."
    },
    {
      "id": "v15-linkbridge-package-fee-trap",
      "type": "browserRedirectMaze",
      "title": "Browser Redirect Maze: Package Fee Trap",
      "category": "Package Scam",
      "difficulty": "medium",
      "command": "STEP ONLY ON SAFE DOMAINS",
      "directions": "Choose safe domains across the bridge. One lookalike collapses the route.",
      "seconds": 18,
      "scenario": "A text asks for a tiny redelivery fee through an unknown link.",
      "official": "official-source.com",
      "domains": [
        "official-source.com",
        "real-company.com",
        "secure-login-fast.net",
        "account-verify.co",
        "gift-claim-now.info",
        "helpdesk-refund.biz"
      ],
      "lesson": "Use the official carrier app/site, not random text links."
    },
    {
      "id": "v15-romancechat-package-fee-trap",
      "type": "romanceEvidenceChat",
      "title": "Live Evidence Chat: Package Fee Trap",
      "category": "Package Scam",
      "difficulty": "medium",
      "command": "COLLECT RED FLAGS \u2192 REPORT",
      "directions": "Messages appear one at a time. Tap red-flag evidence chips, then report/block.",
      "seconds": 18,
      "scenario": "A text asks for a tiny redelivery fee through an unknown link.",
      "profile": "Alex",
      "flags": [
        "money request",
        "secrecy",
        "urgent deadline",
        "external app",
        "fake emergency"
      ],
      "lesson": "Use the official carrier app/site, not random text links."
    },
    {
      "id": "v15-gameroom-package-fee-trap",
      "type": "gameChatReport",
      "title": "Live Game Room: Package Fee Trap",
      "category": "Game Chat",
      "difficulty": "medium",
      "command": "WATCH CHAT \u2192 MUTE + REPORT",
      "directions": "Messages appear one at a time. The scammer is randomized every run.",
      "seconds": 16,
      "player": "ScamBot99",
      "message": "A text asks for a tiny redelivery fee through an unknown link. Use my link: prize-fast-verify.net",
      "decoys": [
        "PixelPat",
        "GardenMom",
        "Runner42",
        "StudyBuddy",
        "NovaKid",
        "CraftyCat"
      ],
      "lesson": "Use the official carrier app/site, not random text links."
    },
    {
      "id": "v15-shield-scholarship-portal",
      "type": "shieldCursor",
      "title": "Mouse Shield Defense: Scholarship Portal",
      "category": "University Phishing",
      "difficulty": "hard",
      "command": "MOVE SHIELD \u2192 BLOCK SCAM PRESSURE",
      "directions": "Move the shield with mouse/touch or WASD. Block scam labels and let safe verification pass.",
      "seconds": 16,
      "scenario": "A scholarship email asks for your school login and bank account today.",
      "scamLabels": [
        "SEND CODE",
        "PAY NOW",
        "OPEN LINK",
        "GIFT CARD",
        "REMOTE ACCESS",
        "CRYPTO FAST"
      ],
      "safeLabels": [
        "Official app",
        "Saved number",
        "Known portal",
        "Report button",
        "Trusted adult"
      ],
      "target": 7,
      "lesson": "Use the official school portal and financial aid office, not lookalike scholarship forms."
    },
    {
      "id": "v15-dodge-scholarship-portal",
      "type": "scamRainDodge",
      "title": "Scam Text Rain Dodge: Scholarship Portal",
      "category": "University Phishing",
      "difficulty": "hard",
      "command": "LEFT/RIGHT \u2192 DODGE SCAMS",
      "directions": "Move left/right, dodge scam text blocks, and collect verification stars.",
      "seconds": 17,
      "scenario": "A scholarship email asks for your school login and bank account today.",
      "scamLabels": [
        "URGENT",
        "PAY FEE",
        "SEND CODE",
        "LOGIN NOW",
        "SECRET",
        "DOWNLOAD"
      ],
      "target": 5,
      "lesson": "Use the official school portal and financial aid office, not lookalike scholarship forms."
    },
    {
      "id": "v15-paddle-scholarship-portal",
      "type": "packetPaddle",
      "title": "Firewall Paddle: Scholarship Portal",
      "category": "University Phishing",
      "difficulty": "hard",
      "command": "MOVE FIREWALL \u2192 BLOCK SCAM PACKETS",
      "directions": "Block red scam packets and let safe packets pass.",
      "seconds": 16,
      "scenario": "A scholarship email asks for your school login and bank account today.",
      "scamLabels": [
        "phish",
        "malware",
        "fake-pay",
        "code-theft",
        "remote-access"
      ],
      "safeLabels": [
        "receipt",
        "known contact",
        "official notice",
        "class note"
      ],
      "target": 6,
      "lesson": "Use the official school portal and financial aid office, not lookalike scholarship forms."
    },
    {
      "id": "v15-browser-scholarship-portal",
      "type": "browserPatchRun",
      "title": "Browser Rescue Run: Scholarship Portal",
      "category": "University Phishing",
      "difficulty": "hard",
      "command": "CLOSE BAIT \u2192 STOP DOWNLOAD \u2192 CLEAR PERMISSION",
      "directions": "Fix browser danger in the correct order while the meter rises.",
      "seconds": 16,
      "scenario": "A scholarship email asks for your school login and bank account today.",
      "lesson": "Use the official school portal and financial aid office, not lookalike scholarship forms."
    },
    {
      "id": "v15-phone-scholarship-portal",
      "type": "phoneTapSequence",
      "title": "Phone Report Path: Scholarship Portal",
      "category": "University Phishing",
      "difficulty": "hard",
      "command": "PHONE PATH \u2192 REPORT SAFELY",
      "directions": "Navigate the phone menu in the safe order.",
      "seconds": 17,
      "scenario": "A scholarship email asks for your school login and bank account today.",
      "message": "A scholarship email asks for your school login and bank account today. Tap here: verify-fast-help.net",
      "sender": "Unknown",
      "steps": [
        "Open suspicious message",
        "Open sender options",
        "Report or block",
        "Confirm safety action"
      ],
      "lesson": "Use the official school portal and financial aid office, not lookalike scholarship forms."
    },
    {
      "id": "v15-whack-scholarship-portal",
      "type": "scamWhack",
      "title": "Scam Whack: Scholarship Portal",
      "category": "University Phishing",
      "difficulty": "hard",
      "command": "WHACK SCAMS ONLY",
      "directions": "Tap scam popups only. Safe reminders are decoys.",
      "seconds": 15,
      "scenario": "A scholarship email asks for your school login and bank account today.",
      "scamLabels": [
        "PAY NOW",
        "SEND CODE",
        "FREE PRIZE",
        "LOGIN FAST",
        "ALLOW",
        "INSTALL"
      ],
      "safeLabels": [
        "Official app",
        "Known contact",
        "Calendar",
        "Report menu"
      ],
      "target": 7,
      "lesson": "Use the official school portal and financial aid office, not lookalike scholarship forms."
    },
    {
      "id": "v15-adclean-scholarship-portal",
      "type": "fakeAdClean",
      "title": "Fake Ad Cleaner: Scholarship Portal",
      "category": "University Phishing",
      "difficulty": "hard",
      "command": "CLOSE REAL X BUTTONS",
      "directions": "Clean fake ads by pressing real X buttons only.",
      "seconds": 15,
      "scenario": "A scholarship email asks for your school login and bank account today.",
      "lesson": "Use the official school portal and financial aid office, not lookalike scholarship forms."
    },
    {
      "id": "v15-linkbridge-scholarship-portal",
      "type": "browserRedirectMaze",
      "title": "Browser Redirect Maze: Scholarship Portal",
      "category": "University Phishing",
      "difficulty": "hard",
      "command": "STEP ONLY ON SAFE DOMAINS",
      "directions": "Choose safe domains across the bridge. One lookalike collapses the route.",
      "seconds": 18,
      "scenario": "A scholarship email asks for your school login and bank account today.",
      "official": "official-source.com",
      "domains": [
        "official-source.com",
        "real-company.com",
        "secure-login-fast.net",
        "account-verify.co",
        "gift-claim-now.info",
        "helpdesk-refund.biz"
      ],
      "lesson": "Use the official school portal and financial aid office, not lookalike scholarship forms."
    },
    {
      "id": "v15-romancechat-scholarship-portal",
      "type": "romanceEvidenceChat",
      "title": "Live Evidence Chat: Scholarship Portal",
      "category": "University Phishing",
      "difficulty": "hard",
      "command": "COLLECT RED FLAGS \u2192 REPORT",
      "directions": "Messages appear one at a time. Tap red-flag evidence chips, then report/block.",
      "seconds": 18,
      "scenario": "A scholarship email asks for your school login and bank account today.",
      "profile": "Jordan",
      "flags": [
        "money request",
        "secrecy",
        "urgent deadline",
        "external app",
        "fake emergency"
      ],
      "lesson": "Use the official school portal and financial aid office, not lookalike scholarship forms."
    },
    {
      "id": "v15-gameroom-scholarship-portal",
      "type": "gameChatReport",
      "title": "Live Game Room: Scholarship Portal",
      "category": "Game Chat",
      "difficulty": "hard",
      "command": "WATCH CHAT \u2192 MUTE + REPORT",
      "directions": "Messages appear one at a time. The scammer is randomized every run.",
      "seconds": 16,
      "player": "ScamBot99",
      "message": "A scholarship email asks for your school login and bank account today. Use my link: prize-fast-verify.net",
      "decoys": [
        "PixelPat",
        "GardenMom",
        "Runner42",
        "StudyBuddy",
        "NovaKid",
        "CraftyCat"
      ],
      "lesson": "Use the official school portal and financial aid office, not lookalike scholarship forms."
    },
    {
      "id": "v15-shield-ai-tool-unlocker",
      "type": "shieldCursor",
      "title": "Mouse Shield Defense: AI Tool Unlocker",
      "category": "AI Malware",
      "difficulty": "easy",
      "command": "MOVE SHIELD \u2192 BLOCK SCAM PRESSURE",
      "directions": "Move the shield with mouse/touch or WASD. Block scam labels and let safe verification pass.",
      "seconds": 16,
      "scenario": "A free AI unlocker asks you to disable security and download a helper.",
      "scamLabels": [
        "SEND CODE",
        "PAY NOW",
        "OPEN LINK",
        "GIFT CARD",
        "REMOTE ACCESS",
        "CRYPTO FAST"
      ],
      "safeLabels": [
        "Official app",
        "Saved number",
        "Known portal",
        "Report button",
        "Trusted adult"
      ],
      "target": 6,
      "lesson": "Cracked AI tools and unlockers are common malware traps."
    },
    {
      "id": "v15-dodge-ai-tool-unlocker",
      "type": "scamRainDodge",
      "title": "Scam Text Rain Dodge: AI Tool Unlocker",
      "category": "AI Malware",
      "difficulty": "easy",
      "command": "LEFT/RIGHT \u2192 DODGE SCAMS",
      "directions": "Move left/right, dodge scam text blocks, and collect verification stars.",
      "seconds": 17,
      "scenario": "A free AI unlocker asks you to disable security and download a helper.",
      "scamLabels": [
        "URGENT",
        "PAY FEE",
        "SEND CODE",
        "LOGIN NOW",
        "SECRET",
        "DOWNLOAD"
      ],
      "target": 4,
      "lesson": "Cracked AI tools and unlockers are common malware traps."
    },
    {
      "id": "v15-paddle-ai-tool-unlocker",
      "type": "packetPaddle",
      "title": "Firewall Paddle: AI Tool Unlocker",
      "category": "AI Malware",
      "difficulty": "easy",
      "command": "MOVE FIREWALL \u2192 BLOCK SCAM PACKETS",
      "directions": "Block red scam packets and let safe packets pass.",
      "seconds": 16,
      "scenario": "A free AI unlocker asks you to disable security and download a helper.",
      "scamLabels": [
        "phish",
        "malware",
        "fake-pay",
        "code-theft",
        "remote-access"
      ],
      "safeLabels": [
        "receipt",
        "known contact",
        "official notice",
        "class note"
      ],
      "target": 6,
      "lesson": "Cracked AI tools and unlockers are common malware traps."
    },
    {
      "id": "v15-browser-ai-tool-unlocker",
      "type": "browserPatchRun",
      "title": "Browser Rescue Run: AI Tool Unlocker",
      "category": "AI Malware",
      "difficulty": "easy",
      "command": "CLOSE BAIT \u2192 STOP DOWNLOAD \u2192 CLEAR PERMISSION",
      "directions": "Fix browser danger in the correct order while the meter rises.",
      "seconds": 16,
      "scenario": "A free AI unlocker asks you to disable security and download a helper.",
      "lesson": "Cracked AI tools and unlockers are common malware traps."
    },
    {
      "id": "v15-phone-ai-tool-unlocker",
      "type": "phoneTapSequence",
      "title": "Phone Report Path: AI Tool Unlocker",
      "category": "AI Malware",
      "difficulty": "easy",
      "command": "PHONE PATH \u2192 REPORT SAFELY",
      "directions": "Navigate the phone menu in the safe order.",
      "seconds": 17,
      "scenario": "A free AI unlocker asks you to disable security and download a helper.",
      "message": "A free AI unlocker asks you to disable security and download a helper. Tap here: verify-fast-help.net",
      "sender": "Unknown",
      "steps": [
        "Open suspicious message",
        "Open sender options",
        "Report or block",
        "Confirm safety action"
      ],
      "lesson": "Cracked AI tools and unlockers are common malware traps."
    },
    {
      "id": "v15-whack-ai-tool-unlocker",
      "type": "scamWhack",
      "title": "Scam Whack: AI Tool Unlocker",
      "category": "AI Malware",
      "difficulty": "easy",
      "command": "WHACK SCAMS ONLY",
      "directions": "Tap scam popups only. Safe reminders are decoys.",
      "seconds": 15,
      "scenario": "A free AI unlocker asks you to disable security and download a helper.",
      "scamLabels": [
        "PAY NOW",
        "SEND CODE",
        "FREE PRIZE",
        "LOGIN FAST",
        "ALLOW",
        "INSTALL"
      ],
      "safeLabels": [
        "Official app",
        "Known contact",
        "Calendar",
        "Report menu"
      ],
      "target": 6,
      "lesson": "Cracked AI tools and unlockers are common malware traps."
    },
    {
      "id": "v15-adclean-ai-tool-unlocker",
      "type": "fakeAdClean",
      "title": "Fake Ad Cleaner: AI Tool Unlocker",
      "category": "AI Malware",
      "difficulty": "easy",
      "command": "CLOSE REAL X BUTTONS",
      "directions": "Clean fake ads by pressing real X buttons only.",
      "seconds": 15,
      "scenario": "A free AI unlocker asks you to disable security and download a helper.",
      "lesson": "Cracked AI tools and unlockers are common malware traps."
    },
    {
      "id": "v15-linkbridge-ai-tool-unlocker",
      "type": "browserRedirectMaze",
      "title": "Browser Redirect Maze: AI Tool Unlocker",
      "category": "AI Malware",
      "difficulty": "easy",
      "command": "STEP ONLY ON SAFE DOMAINS",
      "directions": "Choose safe domains across the bridge. One lookalike collapses the route.",
      "seconds": 18,
      "scenario": "A free AI unlocker asks you to disable security and download a helper.",
      "official": "official-source.com",
      "domains": [
        "official-source.com",
        "real-company.com",
        "secure-login-fast.net",
        "account-verify.co",
        "gift-claim-now.info",
        "helpdesk-refund.biz"
      ],
      "lesson": "Cracked AI tools and unlockers are common malware traps."
    },
    {
      "id": "v15-romancechat-ai-tool-unlocker",
      "type": "romanceEvidenceChat",
      "title": "Live Evidence Chat: AI Tool Unlocker",
      "category": "AI Malware",
      "difficulty": "easy",
      "command": "COLLECT RED FLAGS \u2192 REPORT",
      "directions": "Messages appear one at a time. Tap red-flag evidence chips, then report/block.",
      "seconds": 18,
      "scenario": "A free AI unlocker asks you to disable security and download a helper.",
      "profile": "Casey",
      "flags": [
        "money request",
        "secrecy",
        "urgent deadline",
        "external app",
        "fake emergency"
      ],
      "lesson": "Cracked AI tools and unlockers are common malware traps."
    },
    {
      "id": "v15-gameroom-ai-tool-unlocker",
      "type": "gameChatReport",
      "title": "Live Game Room: AI Tool Unlocker",
      "category": "Game Chat",
      "difficulty": "easy",
      "command": "WATCH CHAT \u2192 MUTE + REPORT",
      "directions": "Messages appear one at a time. The scammer is randomized every run.",
      "seconds": 16,
      "player": "ScamBot99",
      "message": "A free AI unlocker asks you to disable security and download a helper. Use my link: prize-fast-verify.net",
      "decoys": [
        "PixelPat",
        "GardenMom",
        "Runner42",
        "StudyBuddy",
        "NovaKid",
        "CraftyCat"
      ],
      "lesson": "Cracked AI tools and unlockers are common malware traps."
    },
    {
      "id": "v15-shield-charity-countdown",
      "type": "shieldCursor",
      "title": "Mouse Shield Defense: Charity Countdown",
      "category": "Charity Scam",
      "difficulty": "medium",
      "command": "MOVE SHIELD \u2192 BLOCK SCAM PRESSURE",
      "directions": "Move the shield with mouse/touch or WASD. Block scam labels and let safe verification pass.",
      "seconds": 16,
      "scenario": "A disaster charity page wants urgent crypto donations and has no verification.",
      "scamLabels": [
        "SEND CODE",
        "PAY NOW",
        "OPEN LINK",
        "GIFT CARD",
        "REMOTE ACCESS",
        "CRYPTO FAST"
      ],
      "safeLabels": [
        "Official app",
        "Saved number",
        "Known portal",
        "Report button",
        "Trusted adult"
      ],
      "target": 6,
      "lesson": "Verify charities independently before donating; pressure and crypto-only payments are risky."
    },
    {
      "id": "v15-dodge-charity-countdown",
      "type": "scamRainDodge",
      "title": "Scam Text Rain Dodge: Charity Countdown",
      "category": "Charity Scam",
      "difficulty": "medium",
      "command": "LEFT/RIGHT \u2192 DODGE SCAMS",
      "directions": "Move left/right, dodge scam text blocks, and collect verification stars.",
      "seconds": 17,
      "scenario": "A disaster charity page wants urgent crypto donations and has no verification.",
      "scamLabels": [
        "URGENT",
        "PAY FEE",
        "SEND CODE",
        "LOGIN NOW",
        "SECRET",
        "DOWNLOAD"
      ],
      "target": 4,
      "lesson": "Verify charities independently before donating; pressure and crypto-only payments are risky."
    },
    {
      "id": "v15-paddle-charity-countdown",
      "type": "packetPaddle",
      "title": "Firewall Paddle: Charity Countdown",
      "category": "Charity Scam",
      "difficulty": "medium",
      "command": "MOVE FIREWALL \u2192 BLOCK SCAM PACKETS",
      "directions": "Block red scam packets and let safe packets pass.",
      "seconds": 16,
      "scenario": "A disaster charity page wants urgent crypto donations and has no verification.",
      "scamLabels": [
        "phish",
        "malware",
        "fake-pay",
        "code-theft",
        "remote-access"
      ],
      "safeLabels": [
        "receipt",
        "known contact",
        "official notice",
        "class note"
      ],
      "target": 6,
      "lesson": "Verify charities independently before donating; pressure and crypto-only payments are risky."
    },
    {
      "id": "v15-browser-charity-countdown",
      "type": "browserPatchRun",
      "title": "Browser Rescue Run: Charity Countdown",
      "category": "Charity Scam",
      "difficulty": "medium",
      "command": "CLOSE BAIT \u2192 STOP DOWNLOAD \u2192 CLEAR PERMISSION",
      "directions": "Fix browser danger in the correct order while the meter rises.",
      "seconds": 16,
      "scenario": "A disaster charity page wants urgent crypto donations and has no verification.",
      "lesson": "Verify charities independently before donating; pressure and crypto-only payments are risky."
    },
    {
      "id": "v15-phone-charity-countdown",
      "type": "phoneTapSequence",
      "title": "Phone Report Path: Charity Countdown",
      "category": "Charity Scam",
      "difficulty": "medium",
      "command": "PHONE PATH \u2192 REPORT SAFELY",
      "directions": "Navigate the phone menu in the safe order.",
      "seconds": 17,
      "scenario": "A disaster charity page wants urgent crypto donations and has no verification.",
      "message": "A disaster charity page wants urgent crypto donations and has no verification. Tap here: verify-fast-help.net",
      "sender": "Unknown",
      "steps": [
        "Open suspicious message",
        "Open sender options",
        "Report or block",
        "Confirm safety action"
      ],
      "lesson": "Verify charities independently before donating; pressure and crypto-only payments are risky."
    },
    {
      "id": "v15-whack-charity-countdown",
      "type": "scamWhack",
      "title": "Scam Whack: Charity Countdown",
      "category": "Charity Scam",
      "difficulty": "medium",
      "command": "WHACK SCAMS ONLY",
      "directions": "Tap scam popups only. Safe reminders are decoys.",
      "seconds": 15,
      "scenario": "A disaster charity page wants urgent crypto donations and has no verification.",
      "scamLabels": [
        "PAY NOW",
        "SEND CODE",
        "FREE PRIZE",
        "LOGIN FAST",
        "ALLOW",
        "INSTALL"
      ],
      "safeLabels": [
        "Official app",
        "Known contact",
        "Calendar",
        "Report menu"
      ],
      "target": 6,
      "lesson": "Verify charities independently before donating; pressure and crypto-only payments are risky."
    },
    {
      "id": "v15-adclean-charity-countdown",
      "type": "fakeAdClean",
      "title": "Fake Ad Cleaner: Charity Countdown",
      "category": "Charity Scam",
      "difficulty": "medium",
      "command": "CLOSE REAL X BUTTONS",
      "directions": "Clean fake ads by pressing real X buttons only.",
      "seconds": 15,
      "scenario": "A disaster charity page wants urgent crypto donations and has no verification.",
      "lesson": "Verify charities independently before donating; pressure and crypto-only payments are risky."
    },
    {
      "id": "v15-linkbridge-charity-countdown",
      "type": "browserRedirectMaze",
      "title": "Browser Redirect Maze: Charity Countdown",
      "category": "Charity Scam",
      "difficulty": "medium",
      "command": "STEP ONLY ON SAFE DOMAINS",
      "directions": "Choose safe domains across the bridge. One lookalike collapses the route.",
      "seconds": 18,
      "scenario": "A disaster charity page wants urgent crypto donations and has no verification.",
      "official": "official-source.com",
      "domains": [
        "official-source.com",
        "real-company.com",
        "secure-login-fast.net",
        "account-verify.co",
        "gift-claim-now.info",
        "helpdesk-refund.biz"
      ],
      "lesson": "Verify charities independently before donating; pressure and crypto-only payments are risky."
    },
    {
      "id": "v15-romancechat-charity-countdown",
      "type": "romanceEvidenceChat",
      "title": "Live Evidence Chat: Charity Countdown",
      "category": "Charity Scam",
      "difficulty": "medium",
      "command": "COLLECT RED FLAGS \u2192 REPORT",
      "directions": "Messages appear one at a time. Tap red-flag evidence chips, then report/block.",
      "seconds": 18,
      "scenario": "A disaster charity page wants urgent crypto donations and has no verification.",
      "profile": "Taylor",
      "flags": [
        "money request",
        "secrecy",
        "urgent deadline",
        "external app",
        "fake emergency"
      ],
      "lesson": "Verify charities independently before donating; pressure and crypto-only payments are risky."
    },
    {
      "id": "v15-gameroom-charity-countdown",
      "type": "gameChatReport",
      "title": "Live Game Room: Charity Countdown",
      "category": "Game Chat",
      "difficulty": "medium",
      "command": "WATCH CHAT \u2192 MUTE + REPORT",
      "directions": "Messages appear one at a time. The scammer is randomized every run.",
      "seconds": 16,
      "player": "ScamBot99",
      "message": "A disaster charity page wants urgent crypto donations and has no verification. Use my link: prize-fast-verify.net",
      "decoys": [
        "PixelPat",
        "GardenMom",
        "Runner42",
        "StudyBuddy",
        "NovaKid",
        "CraftyCat"
      ],
      "lesson": "Verify charities independently before donating; pressure and crypto-only payments are risky."
    },
    {
      "id": "v15-shield-fake-support-call",
      "type": "shieldCursor",
      "title": "Mouse Shield Defense: Fake Support Call",
      "category": "Tech Support Scam",
      "difficulty": "hard",
      "command": "MOVE SHIELD \u2192 BLOCK SCAM PRESSURE",
      "directions": "Move the shield with mouse/touch or WASD. Block scam labels and let safe verification pass.",
      "seconds": 16,
      "scenario": "A popup says to call support and install remote access now.",
      "scamLabels": [
        "SEND CODE",
        "PAY NOW",
        "OPEN LINK",
        "GIFT CARD",
        "REMOTE ACCESS",
        "CRYPTO FAST"
      ],
      "safeLabels": [
        "Official app",
        "Saved number",
        "Known portal",
        "Report button",
        "Trusted adult"
      ],
      "target": 7,
      "lesson": "Close fake warnings and use trusted support; never install surprise remote access tools."
    },
    {
      "id": "v15-dodge-fake-support-call",
      "type": "scamRainDodge",
      "title": "Scam Text Rain Dodge: Fake Support Call",
      "category": "Tech Support Scam",
      "difficulty": "hard",
      "command": "LEFT/RIGHT \u2192 DODGE SCAMS",
      "directions": "Move left/right, dodge scam text blocks, and collect verification stars.",
      "seconds": 17,
      "scenario": "A popup says to call support and install remote access now.",
      "scamLabels": [
        "URGENT",
        "PAY FEE",
        "SEND CODE",
        "LOGIN NOW",
        "SECRET",
        "DOWNLOAD"
      ],
      "target": 5,
      "lesson": "Close fake warnings and use trusted support; never install surprise remote access tools."
    },
    {
      "id": "v15-paddle-fake-support-call",
      "type": "packetPaddle",
      "title": "Firewall Paddle: Fake Support Call",
      "category": "Tech Support Scam",
      "difficulty": "hard",
      "command": "MOVE FIREWALL \u2192 BLOCK SCAM PACKETS",
      "directions": "Block red scam packets and let safe packets pass.",
      "seconds": 16,
      "scenario": "A popup says to call support and install remote access now.",
      "scamLabels": [
        "phish",
        "malware",
        "fake-pay",
        "code-theft",
        "remote-access"
      ],
      "safeLabels": [
        "receipt",
        "known contact",
        "official notice",
        "class note"
      ],
      "target": 6,
      "lesson": "Close fake warnings and use trusted support; never install surprise remote access tools."
    },
    {
      "id": "v15-browser-fake-support-call",
      "type": "browserPatchRun",
      "title": "Browser Rescue Run: Fake Support Call",
      "category": "Tech Support Scam",
      "difficulty": "hard",
      "command": "CLOSE BAIT \u2192 STOP DOWNLOAD \u2192 CLEAR PERMISSION",
      "directions": "Fix browser danger in the correct order while the meter rises.",
      "seconds": 16,
      "scenario": "A popup says to call support and install remote access now.",
      "lesson": "Close fake warnings and use trusted support; never install surprise remote access tools."
    },
    {
      "id": "v15-phone-fake-support-call",
      "type": "phoneTapSequence",
      "title": "Phone Report Path: Fake Support Call",
      "category": "Tech Support Scam",
      "difficulty": "hard",
      "command": "PHONE PATH \u2192 REPORT SAFELY",
      "directions": "Navigate the phone menu in the safe order.",
      "seconds": 17,
      "scenario": "A popup says to call support and install remote access now.",
      "message": "A popup says to call support and install remote access now. Tap here: verify-fast-help.net",
      "sender": "Unknown",
      "steps": [
        "Open suspicious message",
        "Open sender options",
        "Report or block",
        "Confirm safety action"
      ],
      "lesson": "Close fake warnings and use trusted support; never install surprise remote access tools."
    },
    {
      "id": "v15-whack-fake-support-call",
      "type": "scamWhack",
      "title": "Scam Whack: Fake Support Call",
      "category": "Tech Support Scam",
      "difficulty": "hard",
      "command": "WHACK SCAMS ONLY",
      "directions": "Tap scam popups only. Safe reminders are decoys.",
      "seconds": 15,
      "scenario": "A popup says to call support and install remote access now.",
      "scamLabels": [
        "PAY NOW",
        "SEND CODE",
        "FREE PRIZE",
        "LOGIN FAST",
        "ALLOW",
        "INSTALL"
      ],
      "safeLabels": [
        "Official app",
        "Known contact",
        "Calendar",
        "Report menu"
      ],
      "target": 7,
      "lesson": "Close fake warnings and use trusted support; never install surprise remote access tools."
    },
    {
      "id": "v15-adclean-fake-support-call",
      "type": "fakeAdClean",
      "title": "Fake Ad Cleaner: Fake Support Call",
      "category": "Tech Support Scam",
      "difficulty": "hard",
      "command": "CLOSE REAL X BUTTONS",
      "directions": "Clean fake ads by pressing real X buttons only.",
      "seconds": 15,
      "scenario": "A popup says to call support and install remote access now.",
      "lesson": "Close fake warnings and use trusted support; never install surprise remote access tools."
    },
    {
      "id": "v15-linkbridge-fake-support-call",
      "type": "browserRedirectMaze",
      "title": "Browser Redirect Maze: Fake Support Call",
      "category": "Tech Support Scam",
      "difficulty": "hard",
      "command": "STEP ONLY ON SAFE DOMAINS",
      "directions": "Choose safe domains across the bridge. One lookalike collapses the route.",
      "seconds": 18,
      "scenario": "A popup says to call support and install remote access now.",
      "official": "official-source.com",
      "domains": [
        "official-source.com",
        "real-company.com",
        "secure-login-fast.net",
        "account-verify.co",
        "gift-claim-now.info",
        "helpdesk-refund.biz"
      ],
      "lesson": "Close fake warnings and use trusted support; never install surprise remote access tools."
    },
    {
      "id": "v15-romancechat-fake-support-call",
      "type": "romanceEvidenceChat",
      "title": "Live Evidence Chat: Fake Support Call",
      "category": "Tech Support Scam",
      "difficulty": "hard",
      "command": "COLLECT RED FLAGS \u2192 REPORT",
      "directions": "Messages appear one at a time. Tap red-flag evidence chips, then report/block.",
      "seconds": 18,
      "scenario": "A popup says to call support and install remote access now.",
      "profile": "Alex",
      "flags": [
        "money request",
        "secrecy",
        "urgent deadline",
        "external app",
        "fake emergency"
      ],
      "lesson": "Close fake warnings and use trusted support; never install surprise remote access tools."
    },
    {
      "id": "v15-gameroom-fake-support-call",
      "type": "gameChatReport",
      "title": "Live Game Room: Fake Support Call",
      "category": "Game Chat",
      "difficulty": "hard",
      "command": "WATCH CHAT \u2192 MUTE + REPORT",
      "directions": "Messages appear one at a time. The scammer is randomized every run.",
      "seconds": 16,
      "player": "ScamBot99",
      "message": "A popup says to call support and install remote access now. Use my link: prize-fast-verify.net",
      "decoys": [
        "PixelPat",
        "GardenMom",
        "Runner42",
        "StudyBuddy",
        "NovaKid",
        "CraftyCat"
      ],
      "lesson": "Close fake warnings and use trusted support; never install surprise remote access tools."
    },
    {
      "id": "v15-shield-rental-deposit-rush",
      "type": "shieldCursor",
      "title": "Mouse Shield Defense: Rental Deposit Rush",
      "category": "Rental Scam",
      "difficulty": "easy",
      "command": "MOVE SHIELD \u2192 BLOCK SCAM PRESSURE",
      "directions": "Move the shield with mouse/touch or WASD. Block scam labels and let safe verification pass.",
      "seconds": 16,
      "scenario": "A landlord refuses tours but wants a deposit by payment app today.",
      "scamLabels": [
        "SEND CODE",
        "PAY NOW",
        "OPEN LINK",
        "GIFT CARD",
        "REMOTE ACCESS",
        "CRYPTO FAST"
      ],
      "safeLabels": [
        "Official app",
        "Saved number",
        "Known portal",
        "Report button",
        "Trusted adult"
      ],
      "target": 6,
      "lesson": "Verify property ownership and tour options before sending rental deposits."
    },
    {
      "id": "v15-dodge-rental-deposit-rush",
      "type": "scamRainDodge",
      "title": "Scam Text Rain Dodge: Rental Deposit Rush",
      "category": "Rental Scam",
      "difficulty": "easy",
      "command": "LEFT/RIGHT \u2192 DODGE SCAMS",
      "directions": "Move left/right, dodge scam text blocks, and collect verification stars.",
      "seconds": 17,
      "scenario": "A landlord refuses tours but wants a deposit by payment app today.",
      "scamLabels": [
        "URGENT",
        "PAY FEE",
        "SEND CODE",
        "LOGIN NOW",
        "SECRET",
        "DOWNLOAD"
      ],
      "target": 4,
      "lesson": "Verify property ownership and tour options before sending rental deposits."
    },
    {
      "id": "v15-paddle-rental-deposit-rush",
      "type": "packetPaddle",
      "title": "Firewall Paddle: Rental Deposit Rush",
      "category": "Rental Scam",
      "difficulty": "easy",
      "command": "MOVE FIREWALL \u2192 BLOCK SCAM PACKETS",
      "directions": "Block red scam packets and let safe packets pass.",
      "seconds": 16,
      "scenario": "A landlord refuses tours but wants a deposit by payment app today.",
      "scamLabels": [
        "phish",
        "malware",
        "fake-pay",
        "code-theft",
        "remote-access"
      ],
      "safeLabels": [
        "receipt",
        "known contact",
        "official notice",
        "class note"
      ],
      "target": 6,
      "lesson": "Verify property ownership and tour options before sending rental deposits."
    },
    {
      "id": "v15-browser-rental-deposit-rush",
      "type": "browserPatchRun",
      "title": "Browser Rescue Run: Rental Deposit Rush",
      "category": "Rental Scam",
      "difficulty": "easy",
      "command": "CLOSE BAIT \u2192 STOP DOWNLOAD \u2192 CLEAR PERMISSION",
      "directions": "Fix browser danger in the correct order while the meter rises.",
      "seconds": 16,
      "scenario": "A landlord refuses tours but wants a deposit by payment app today.",
      "lesson": "Verify property ownership and tour options before sending rental deposits."
    },
    {
      "id": "v15-phone-rental-deposit-rush",
      "type": "phoneTapSequence",
      "title": "Phone Report Path: Rental Deposit Rush",
      "category": "Rental Scam",
      "difficulty": "easy",
      "command": "PHONE PATH \u2192 REPORT SAFELY",
      "directions": "Navigate the phone menu in the safe order.",
      "seconds": 17,
      "scenario": "A landlord refuses tours but wants a deposit by payment app today.",
      "message": "A landlord refuses tours but wants a deposit by payment app today. Tap here: verify-fast-help.net",
      "sender": "Unknown",
      "steps": [
        "Open suspicious message",
        "Open sender options",
        "Report or block",
        "Confirm safety action"
      ],
      "lesson": "Verify property ownership and tour options before sending rental deposits."
    },
    {
      "id": "v15-whack-rental-deposit-rush",
      "type": "scamWhack",
      "title": "Scam Whack: Rental Deposit Rush",
      "category": "Rental Scam",
      "difficulty": "easy",
      "command": "WHACK SCAMS ONLY",
      "directions": "Tap scam popups only. Safe reminders are decoys.",
      "seconds": 15,
      "scenario": "A landlord refuses tours but wants a deposit by payment app today.",
      "scamLabels": [
        "PAY NOW",
        "SEND CODE",
        "FREE PRIZE",
        "LOGIN FAST",
        "ALLOW",
        "INSTALL"
      ],
      "safeLabels": [
        "Official app",
        "Known contact",
        "Calendar",
        "Report menu"
      ],
      "target": 6,
      "lesson": "Verify property ownership and tour options before sending rental deposits."
    },
    {
      "id": "v15-adclean-rental-deposit-rush",
      "type": "fakeAdClean",
      "title": "Fake Ad Cleaner: Rental Deposit Rush",
      "category": "Rental Scam",
      "difficulty": "easy",
      "command": "CLOSE REAL X BUTTONS",
      "directions": "Clean fake ads by pressing real X buttons only.",
      "seconds": 15,
      "scenario": "A landlord refuses tours but wants a deposit by payment app today.",
      "lesson": "Verify property ownership and tour options before sending rental deposits."
    },
    {
      "id": "v15-linkbridge-rental-deposit-rush",
      "type": "browserRedirectMaze",
      "title": "Browser Redirect Maze: Rental Deposit Rush",
      "category": "Rental Scam",
      "difficulty": "easy",
      "command": "STEP ONLY ON SAFE DOMAINS",
      "directions": "Choose safe domains across the bridge. One lookalike collapses the route.",
      "seconds": 18,
      "scenario": "A landlord refuses tours but wants a deposit by payment app today.",
      "official": "official-source.com",
      "domains": [
        "official-source.com",
        "real-company.com",
        "secure-login-fast.net",
        "account-verify.co",
        "gift-claim-now.info",
        "helpdesk-refund.biz"
      ],
      "lesson": "Verify property ownership and tour options before sending rental deposits."
    },
    {
      "id": "v15-romancechat-rental-deposit-rush",
      "type": "romanceEvidenceChat",
      "title": "Live Evidence Chat: Rental Deposit Rush",
      "category": "Rental Scam",
      "difficulty": "easy",
      "command": "COLLECT RED FLAGS \u2192 REPORT",
      "directions": "Messages appear one at a time. Tap red-flag evidence chips, then report/block.",
      "seconds": 18,
      "scenario": "A landlord refuses tours but wants a deposit by payment app today.",
      "profile": "Jordan",
      "flags": [
        "money request",
        "secrecy",
        "urgent deadline",
        "external app",
        "fake emergency"
      ],
      "lesson": "Verify property ownership and tour options before sending rental deposits."
    },
    {
      "id": "v15-gameroom-rental-deposit-rush",
      "type": "gameChatReport",
      "title": "Live Game Room: Rental Deposit Rush",
      "category": "Game Chat",
      "difficulty": "easy",
      "command": "WATCH CHAT \u2192 MUTE + REPORT",
      "directions": "Messages appear one at a time. The scammer is randomized every run.",
      "seconds": 16,
      "player": "ScamBot99",
      "message": "A landlord refuses tours but wants a deposit by payment app today. Use my link: prize-fast-verify.net",
      "decoys": [
        "PixelPat",
        "GardenMom",
        "Runner42",
        "StudyBuddy",
        "NovaKid",
        "CraftyCat"
      ],
      "lesson": "Verify property ownership and tour options before sending rental deposits."
    },
    {
      "id": "v15-shield-mfa-push-flood",
      "type": "shieldCursor",
      "title": "Mouse Shield Defense: MFA Push Flood",
      "category": "Account Takeover",
      "difficulty": "medium",
      "command": "MOVE SHIELD \u2192 BLOCK SCAM PRESSURE",
      "directions": "Move the shield with mouse/touch or WASD. Block scam labels and let safe verification pass.",
      "seconds": 16,
      "scenario": "Repeated login prompts appear even though you did not sign in.",
      "scamLabels": [
        "SEND CODE",
        "PAY NOW",
        "OPEN LINK",
        "GIFT CARD",
        "REMOTE ACCESS",
        "CRYPTO FAST"
      ],
      "safeLabels": [
        "Official app",
        "Saved number",
        "Known portal",
        "Report button",
        "Trusted adult"
      ],
      "target": 6,
      "lesson": "Deny MFA prompts you did not start, then change passwords and review sessions."
    },
    {
      "id": "v15-dodge-mfa-push-flood",
      "type": "scamRainDodge",
      "title": "Scam Text Rain Dodge: MFA Push Flood",
      "category": "Account Takeover",
      "difficulty": "medium",
      "command": "LEFT/RIGHT \u2192 DODGE SCAMS",
      "directions": "Move left/right, dodge scam text blocks, and collect verification stars.",
      "seconds": 17,
      "scenario": "Repeated login prompts appear even though you did not sign in.",
      "scamLabels": [
        "URGENT",
        "PAY FEE",
        "SEND CODE",
        "LOGIN NOW",
        "SECRET",
        "DOWNLOAD"
      ],
      "target": 4,
      "lesson": "Deny MFA prompts you did not start, then change passwords and review sessions."
    },
    {
      "id": "v15-paddle-mfa-push-flood",
      "type": "packetPaddle",
      "title": "Firewall Paddle: MFA Push Flood",
      "category": "Account Takeover",
      "difficulty": "medium",
      "command": "MOVE FIREWALL \u2192 BLOCK SCAM PACKETS",
      "directions": "Block red scam packets and let safe packets pass.",
      "seconds": 16,
      "scenario": "Repeated login prompts appear even though you did not sign in.",
      "scamLabels": [
        "phish",
        "malware",
        "fake-pay",
        "code-theft",
        "remote-access"
      ],
      "safeLabels": [
        "receipt",
        "known contact",
        "official notice",
        "class note"
      ],
      "target": 6,
      "lesson": "Deny MFA prompts you did not start, then change passwords and review sessions."
    },
    {
      "id": "v15-browser-mfa-push-flood",
      "type": "browserPatchRun",
      "title": "Browser Rescue Run: MFA Push Flood",
      "category": "Account Takeover",
      "difficulty": "medium",
      "command": "CLOSE BAIT \u2192 STOP DOWNLOAD \u2192 CLEAR PERMISSION",
      "directions": "Fix browser danger in the correct order while the meter rises.",
      "seconds": 16,
      "scenario": "Repeated login prompts appear even though you did not sign in.",
      "lesson": "Deny MFA prompts you did not start, then change passwords and review sessions."
    },
    {
      "id": "v15-phone-mfa-push-flood",
      "type": "phoneTapSequence",
      "title": "Phone Report Path: MFA Push Flood",
      "category": "Account Takeover",
      "difficulty": "medium",
      "command": "PHONE PATH \u2192 REPORT SAFELY",
      "directions": "Navigate the phone menu in the safe order.",
      "seconds": 17,
      "scenario": "Repeated login prompts appear even though you did not sign in.",
      "message": "Repeated login prompts appear even though you did not sign in. Tap here: verify-fast-help.net",
      "sender": "Unknown",
      "steps": [
        "Open suspicious message",
        "Open sender options",
        "Report or block",
        "Confirm safety action"
      ],
      "lesson": "Deny MFA prompts you did not start, then change passwords and review sessions."
    },
    {
      "id": "v15-whack-mfa-push-flood",
      "type": "scamWhack",
      "title": "Scam Whack: MFA Push Flood",
      "category": "Account Takeover",
      "difficulty": "medium",
      "command": "WHACK SCAMS ONLY",
      "directions": "Tap scam popups only. Safe reminders are decoys.",
      "seconds": 15,
      "scenario": "Repeated login prompts appear even though you did not sign in.",
      "scamLabels": [
        "PAY NOW",
        "SEND CODE",
        "FREE PRIZE",
        "LOGIN FAST",
        "ALLOW",
        "INSTALL"
      ],
      "safeLabels": [
        "Official app",
        "Known contact",
        "Calendar",
        "Report menu"
      ],
      "target": 6,
      "lesson": "Deny MFA prompts you did not start, then change passwords and review sessions."
    },
    {
      "id": "v15-adclean-mfa-push-flood",
      "type": "fakeAdClean",
      "title": "Fake Ad Cleaner: MFA Push Flood",
      "category": "Account Takeover",
      "difficulty": "medium",
      "command": "CLOSE REAL X BUTTONS",
      "directions": "Clean fake ads by pressing real X buttons only.",
      "seconds": 15,
      "scenario": "Repeated login prompts appear even though you did not sign in.",
      "lesson": "Deny MFA prompts you did not start, then change passwords and review sessions."
    },
    {
      "id": "v15-linkbridge-mfa-push-flood",
      "type": "browserRedirectMaze",
      "title": "Browser Redirect Maze: MFA Push Flood",
      "category": "Account Takeover",
      "difficulty": "medium",
      "command": "STEP ONLY ON SAFE DOMAINS",
      "directions": "Choose safe domains across the bridge. One lookalike collapses the route.",
      "seconds": 18,
      "scenario": "Repeated login prompts appear even though you did not sign in.",
      "official": "official-source.com",
      "domains": [
        "official-source.com",
        "real-company.com",
        "secure-login-fast.net",
        "account-verify.co",
        "gift-claim-now.info",
        "helpdesk-refund.biz"
      ],
      "lesson": "Deny MFA prompts you did not start, then change passwords and review sessions."
    },
    {
      "id": "v15-romancechat-mfa-push-flood",
      "type": "romanceEvidenceChat",
      "title": "Live Evidence Chat: MFA Push Flood",
      "category": "Account Takeover",
      "difficulty": "medium",
      "command": "COLLECT RED FLAGS \u2192 REPORT",
      "directions": "Messages appear one at a time. Tap red-flag evidence chips, then report/block.",
      "seconds": 18,
      "scenario": "Repeated login prompts appear even though you did not sign in.",
      "profile": "Casey",
      "flags": [
        "money request",
        "secrecy",
        "urgent deadline",
        "external app",
        "fake emergency"
      ],
      "lesson": "Deny MFA prompts you did not start, then change passwords and review sessions."
    },
    {
      "id": "v15-gameroom-mfa-push-flood",
      "type": "gameChatReport",
      "title": "Live Game Room: MFA Push Flood",
      "category": "Game Chat",
      "difficulty": "medium",
      "command": "WATCH CHAT \u2192 MUTE + REPORT",
      "directions": "Messages appear one at a time. The scammer is randomized every run.",
      "seconds": 16,
      "player": "ScamBot99",
      "message": "Repeated login prompts appear even though you did not sign in. Use my link: prize-fast-verify.net",
      "decoys": [
        "PixelPat",
        "GardenMom",
        "Runner42",
        "StudyBuddy",
        "NovaKid",
        "CraftyCat"
      ],
      "lesson": "Deny MFA prompts you did not start, then change passwords and review sessions."
    },
    {
      "id": "v15-shield-qr-parking-swap",
      "type": "shieldCursor",
      "title": "Mouse Shield Defense: QR Parking Swap",
      "category": "QR Scam",
      "difficulty": "hard",
      "command": "MOVE SHIELD \u2192 BLOCK SCAM PRESSURE",
      "directions": "Move the shield with mouse/touch or WASD. Block scam labels and let safe verification pass.",
      "seconds": 16,
      "scenario": "A parking meter QR sticker leads to a strange payment page.",
      "scamLabels": [
        "SEND CODE",
        "PAY NOW",
        "OPEN LINK",
        "GIFT CARD",
        "REMOTE ACCESS",
        "CRYPTO FAST"
      ],
      "safeLabels": [
        "Official app",
        "Saved number",
        "Known portal",
        "Report button",
        "Trusted adult"
      ],
      "target": 7,
      "lesson": "Use the official parking app or city website, not suspicious stickers."
    },
    {
      "id": "v15-dodge-qr-parking-swap",
      "type": "scamRainDodge",
      "title": "Scam Text Rain Dodge: QR Parking Swap",
      "category": "QR Scam",
      "difficulty": "hard",
      "command": "LEFT/RIGHT \u2192 DODGE SCAMS",
      "directions": "Move left/right, dodge scam text blocks, and collect verification stars.",
      "seconds": 17,
      "scenario": "A parking meter QR sticker leads to a strange payment page.",
      "scamLabels": [
        "URGENT",
        "PAY FEE",
        "SEND CODE",
        "LOGIN NOW",
        "SECRET",
        "DOWNLOAD"
      ],
      "target": 5,
      "lesson": "Use the official parking app or city website, not suspicious stickers."
    },
    {
      "id": "v15-paddle-qr-parking-swap",
      "type": "packetPaddle",
      "title": "Firewall Paddle: QR Parking Swap",
      "category": "QR Scam",
      "difficulty": "hard",
      "command": "MOVE FIREWALL \u2192 BLOCK SCAM PACKETS",
      "directions": "Block red scam packets and let safe packets pass.",
      "seconds": 16,
      "scenario": "A parking meter QR sticker leads to a strange payment page.",
      "scamLabels": [
        "phish",
        "malware",
        "fake-pay",
        "code-theft",
        "remote-access"
      ],
      "safeLabels": [
        "receipt",
        "known contact",
        "official notice",
        "class note"
      ],
      "target": 6,
      "lesson": "Use the official parking app or city website, not suspicious stickers."
    },
    {
      "id": "v15-browser-qr-parking-swap",
      "type": "browserPatchRun",
      "title": "Browser Rescue Run: QR Parking Swap",
      "category": "QR Scam",
      "difficulty": "hard",
      "command": "CLOSE BAIT \u2192 STOP DOWNLOAD \u2192 CLEAR PERMISSION",
      "directions": "Fix browser danger in the correct order while the meter rises.",
      "seconds": 16,
      "scenario": "A parking meter QR sticker leads to a strange payment page.",
      "lesson": "Use the official parking app or city website, not suspicious stickers."
    },
    {
      "id": "v15-phone-qr-parking-swap",
      "type": "phoneTapSequence",
      "title": "Phone Report Path: QR Parking Swap",
      "category": "QR Scam",
      "difficulty": "hard",
      "command": "PHONE PATH \u2192 REPORT SAFELY",
      "directions": "Navigate the phone menu in the safe order.",
      "seconds": 17,
      "scenario": "A parking meter QR sticker leads to a strange payment page.",
      "message": "A parking meter QR sticker leads to a strange payment page. Tap here: verify-fast-help.net",
      "sender": "Unknown",
      "steps": [
        "Open suspicious message",
        "Open sender options",
        "Report or block",
        "Confirm safety action"
      ],
      "lesson": "Use the official parking app or city website, not suspicious stickers."
    },
    {
      "id": "v15-whack-qr-parking-swap",
      "type": "scamWhack",
      "title": "Scam Whack: QR Parking Swap",
      "category": "QR Scam",
      "difficulty": "hard",
      "command": "WHACK SCAMS ONLY",
      "directions": "Tap scam popups only. Safe reminders are decoys.",
      "seconds": 15,
      "scenario": "A parking meter QR sticker leads to a strange payment page.",
      "scamLabels": [
        "PAY NOW",
        "SEND CODE",
        "FREE PRIZE",
        "LOGIN FAST",
        "ALLOW",
        "INSTALL"
      ],
      "safeLabels": [
        "Official app",
        "Known contact",
        "Calendar",
        "Report menu"
      ],
      "target": 7,
      "lesson": "Use the official parking app or city website, not suspicious stickers."
    },
    {
      "id": "v15-adclean-qr-parking-swap",
      "type": "fakeAdClean",
      "title": "Fake Ad Cleaner: QR Parking Swap",
      "category": "QR Scam",
      "difficulty": "hard",
      "command": "CLOSE REAL X BUTTONS",
      "directions": "Clean fake ads by pressing real X buttons only.",
      "seconds": 15,
      "scenario": "A parking meter QR sticker leads to a strange payment page.",
      "lesson": "Use the official parking app or city website, not suspicious stickers."
    },
    {
      "id": "v15-linkbridge-qr-parking-swap",
      "type": "browserRedirectMaze",
      "title": "Browser Redirect Maze: QR Parking Swap",
      "category": "QR Scam",
      "difficulty": "hard",
      "command": "STEP ONLY ON SAFE DOMAINS",
      "directions": "Choose safe domains across the bridge. One lookalike collapses the route.",
      "seconds": 18,
      "scenario": "A parking meter QR sticker leads to a strange payment page.",
      "official": "official-source.com",
      "domains": [
        "official-source.com",
        "real-company.com",
        "secure-login-fast.net",
        "account-verify.co",
        "gift-claim-now.info",
        "helpdesk-refund.biz"
      ],
      "lesson": "Use the official parking app or city website, not suspicious stickers."
    },
    {
      "id": "v15-romancechat-qr-parking-swap",
      "type": "romanceEvidenceChat",
      "title": "Live Evidence Chat: QR Parking Swap",
      "category": "QR Scam",
      "difficulty": "hard",
      "command": "COLLECT RED FLAGS \u2192 REPORT",
      "directions": "Messages appear one at a time. Tap red-flag evidence chips, then report/block.",
      "seconds": 18,
      "scenario": "A parking meter QR sticker leads to a strange payment page.",
      "profile": "Taylor",
      "flags": [
        "money request",
        "secrecy",
        "urgent deadline",
        "external app",
        "fake emergency"
      ],
      "lesson": "Use the official parking app or city website, not suspicious stickers."
    },
    {
      "id": "v15-gameroom-qr-parking-swap",
      "type": "gameChatReport",
      "title": "Live Game Room: QR Parking Swap",
      "category": "Game Chat",
      "difficulty": "hard",
      "command": "WATCH CHAT \u2192 MUTE + REPORT",
      "directions": "Messages appear one at a time. The scammer is randomized every run.",
      "seconds": 16,
      "player": "ScamBot99",
      "message": "A parking meter QR sticker leads to a strange payment page. Use my link: prize-fast-verify.net",
      "decoys": [
        "PixelPat",
        "GardenMom",
        "Runner42",
        "StudyBuddy",
        "NovaKid",
        "CraftyCat"
      ],
      "lesson": "Use the official parking app or city website, not suspicious stickers."
    },
    {
      "id": "v15-virus-bank-login-storm",
      "type": "virusDownload",
      "title": "Virus Download Panic: Bank Login Storm",
      "category": "Malware",
      "difficulty": "medium",
      "command": "STOP THE DOWNLOAD",
      "directions": "Mash cancel / Space / Enter before the install reaches 100%.",
      "seconds": 10,
      "popupTitle": "Bank Login Storm",
      "popupBody": "A fake bank alert demands login and MFA code before midnight.",
      "clicksNeeded": 18,
      "downloadRate": 1.9,
      "lesson": "Use the official bank app or saved phone number; never use a surprise login link."
    },
    {
      "id": "v15-virus-game-prize-rush",
      "type": "virusDownload",
      "title": "Virus Download Panic: Game Prize Rush",
      "category": "Malware",
      "difficulty": "hard",
      "command": "STOP THE DOWNLOAD",
      "directions": "Mash cancel / Space / Enter before the install reaches 100%.",
      "seconds": 9,
      "popupTitle": "Game Prize Rush",
      "popupBody": "A player promises rare skins through a link outside the game.",
      "clicksNeeded": 24,
      "downloadRate": 2.45,
      "lesson": "Report reward links in game chat; official rewards stay inside official game systems."
    },
    {
      "id": "v15-virus-romance-travel-fee",
      "type": "virusDownload",
      "title": "Virus Download Panic: Romance Travel Fee",
      "category": "Malware",
      "difficulty": "easy",
      "command": "STOP THE DOWNLOAD",
      "directions": "Mash cancel / Space / Enter before the install reaches 100%.",
      "seconds": 10,
      "popupTitle": "Romance Travel Fee",
      "popupBody": "A new match asks for travel money and wants secrecy.",
      "clicksNeeded": 18,
      "downloadRate": 1.9,
      "lesson": "Money, secrecy, and fast emotional pressure are romance-scam warning signs."
    },
    {
      "id": "v15-virus-marketplace-overpay",
      "type": "virusDownload",
      "title": "Virus Download Panic: Marketplace Overpay",
      "category": "Malware",
      "difficulty": "medium",
      "command": "STOP THE DOWNLOAD",
      "directions": "Mash cancel / Space / Enter before the install reaches 100%.",
      "seconds": 10,
      "popupTitle": "Marketplace Overpay",
      "popupBody": "A buyer overpays and asks you to refund before payment clears.",
      "clicksNeeded": 18,
      "downloadRate": 1.9,
      "lesson": "Wait for cleared payment and stay on-platform; never refund fake overpayments."
    },
    {
      "id": "v15-virus-package-fee-trap",
      "type": "virusDownload",
      "title": "Virus Download Panic: Package Fee Trap",
      "category": "Malware",
      "difficulty": "hard",
      "command": "STOP THE DOWNLOAD",
      "directions": "Mash cancel / Space / Enter before the install reaches 100%.",
      "seconds": 9,
      "popupTitle": "Package Fee Trap",
      "popupBody": "A text asks for a tiny redelivery fee through an unknown link.",
      "clicksNeeded": 24,
      "downloadRate": 2.45,
      "lesson": "Use the official carrier app/site, not random text links."
    },
    {
      "id": "v15-virus-scholarship-portal",
      "type": "virusDownload",
      "title": "Virus Download Panic: Scholarship Portal",
      "category": "Malware",
      "difficulty": "easy",
      "command": "STOP THE DOWNLOAD",
      "directions": "Mash cancel / Space / Enter before the install reaches 100%.",
      "seconds": 10,
      "popupTitle": "Scholarship Portal",
      "popupBody": "A scholarship email asks for your school login and bank account today.",
      "clicksNeeded": 18,
      "downloadRate": 1.9,
      "lesson": "Use the official school portal and financial aid office, not lookalike scholarship forms."
    },
    {
      "id": "v15-virus-ai-tool-unlocker",
      "type": "virusDownload",
      "title": "Virus Download Panic: AI Tool Unlocker",
      "category": "Malware",
      "difficulty": "medium",
      "command": "STOP THE DOWNLOAD",
      "directions": "Mash cancel / Space / Enter before the install reaches 100%.",
      "seconds": 10,
      "popupTitle": "AI Tool Unlocker",
      "popupBody": "A free AI unlocker asks you to disable security and download a helper.",
      "clicksNeeded": 18,
      "downloadRate": 1.9,
      "lesson": "Cracked AI tools and unlockers are common malware traps."
    },
    {
      "id": "v15-virus-charity-countdown",
      "type": "virusDownload",
      "title": "Virus Download Panic: Charity Countdown",
      "category": "Malware",
      "difficulty": "hard",
      "command": "STOP THE DOWNLOAD",
      "directions": "Mash cancel / Space / Enter before the install reaches 100%.",
      "seconds": 9,
      "popupTitle": "Charity Countdown",
      "popupBody": "A disaster charity page wants urgent crypto donations and has no verification.",
      "clicksNeeded": 24,
      "downloadRate": 2.45,
      "lesson": "Verify charities independently before donating; pressure and crypto-only payments are risky."
    },
    {
      "id": "v15-virus-fake-support-call",
      "type": "virusDownload",
      "title": "Virus Download Panic: Fake Support Call",
      "category": "Malware",
      "difficulty": "easy",
      "command": "STOP THE DOWNLOAD",
      "directions": "Mash cancel / Space / Enter before the install reaches 100%.",
      "seconds": 10,
      "popupTitle": "Fake Support Call",
      "popupBody": "A popup says to call support and install remote access now.",
      "clicksNeeded": 18,
      "downloadRate": 1.9,
      "lesson": "Close fake warnings and use trusted support; never install surprise remote access tools."
    },
    {
      "id": "v15-virus-rental-deposit-rush",
      "type": "virusDownload",
      "title": "Virus Download Panic: Rental Deposit Rush",
      "category": "Malware",
      "difficulty": "medium",
      "command": "STOP THE DOWNLOAD",
      "directions": "Mash cancel / Space / Enter before the install reaches 100%.",
      "seconds": 10,
      "popupTitle": "Rental Deposit Rush",
      "popupBody": "A landlord refuses tours but wants a deposit by payment app today.",
      "clicksNeeded": 18,
      "downloadRate": 1.9,
      "lesson": "Verify property ownership and tour options before sending rental deposits."
    }
  ],
  "bossBank": [
    {
      "type": "choice",
      "category": "Bank Phishing",
      "prompt": "The Fraudster says your bank will close unless you click a login link.",
      "options": [
        [
          "Click link",
          false
        ],
        [
          "Open official bank app",
          true
        ],
        [
          "Reply with password",
          false
        ],
        [
          "Share the link",
          false
        ]
      ],
      "lesson": "Official app beats surprise link."
    },
    {
      "type": "choice",
      "category": "AI Voice Scam",
      "prompt": "A voice clone asks for money and secrecy.",
      "options": [
        [
          "Send money",
          false
        ],
        [
          "Verify through a saved number",
          true
        ],
        [
          "Keep it secret",
          false
        ],
        [
          "Buy gift cards",
          false
        ]
      ],
      "lesson": "Verify through known contacts."
    },
    {
      "type": "choice",
      "category": "Marketplace Scam",
      "prompt": "A buyer overpays and asks for a refund before payment clears.",
      "options": [
        [
          "Refund now",
          false
        ],
        [
          "Wait for official cleared payment",
          true
        ],
        [
          "Send your bank info",
          false
        ],
        [
          "Open their link",
          false
        ]
      ],
      "lesson": "Overpayment refund pressure is risky."
    },
    {
      "type": "domain",
      "prompt": "Pick the official domain for a school login.",
      "answer": "official-school.edu",
      "options": [
        "official-school.edu",
        "school-login-help.co",
        "campus-password-reset.net"
      ],
      "lesson": "Lookalike domains steal logins."
    },
    {
      "type": "domain",
      "prompt": "Pick the official game account domain.",
      "answer": "officialgame.com",
      "options": [
        "free-coins-login.net",
        "officialgame.com",
        "game-prize-fast.co"
      ],
      "lesson": "Free item links steal accounts."
    },
    {
      "type": "chat",
      "player": "ScamBot99",
      "message": "FREE COINS! Visit game-prize-fast.net and log in!",
      "lesson": "Report, do not engage."
    },
    {
      "type": "chat",
      "player": "ModHelper",
      "message": "Read me your 6-digit code or your account closes.",
      "lesson": "Never share verification codes."
    },
    {
      "type": "romance",
      "name": "Ava",
      "bio": "Loves you immediately and needs gift cards for travel.",
      "scam": true,
      "lesson": "Fast love plus money is dangerous."
    },
    {
      "type": "romance",
      "name": "Jamie",
      "bio": "Suggests a video call and does not ask for money.",
      "scam": false,
      "lesson": "No pressure is safer."
    },
    {
      "type": "file",
      "files": [
        [
          "meeting_notes.pdf",
          false
        ],
        [
          "invoice.exe",
          true
        ],
        [
          "bank_login.zip",
          true
        ],
        [
          "family.jpg",
          false
        ]
      ],
      "lesson": "Delete risky downloads without opening them."
    },
    {
      "type": "file",
      "files": [
        [
          "syllabus.pdf",
          false
        ],
        [
          "Campus_Password_Tool.exe",
          true
        ],
        [
          "photo.png",
          false
        ],
        [
          "grade_viewer.scr",
          true
        ]
      ],
      "lesson": "Executables and scripts from surprise messages are risky."
    },
    {
      "type": "mfa",
      "prompt": "You receive a surprise login approval prompt from another country.",
      "approve": false,
      "lesson": "Deny logins you did not start."
    },
    {
      "type": "mfa",
      "prompt": "You just started signing into your bank app and get an MFA prompt.",
      "approve": true,
      "lesson": "Approve only your own login."
    },
    {
      "type": "amount",
      "prompt": "A refund caller asks you to send $499 to fix an overpayment. Safe amount?",
      "answer": 0,
      "lesson": "Scam pressure should get $0."
    },
    {
      "type": "amount",
      "prompt": "You independently verified a charity and chose to donate $20. Safe amount?",
      "answer": 20,
      "lesson": "Independent verification matters."
    },
    {
      "type": "flags",
      "prompt": "Fake shopping site: 95% off, pay by wire, no return address.",
      "flags": [
        [
          "Huge discount",
          true
        ],
        [
          "Pay by wire",
          true
        ],
        [
          "No return address",
          true
        ],
        [
          "Product photo",
          false
        ]
      ],
      "lesson": "Extreme discounts plus unsafe payment are red flags."
    },
    {
      "type": "flags",
      "prompt": "Fake AI unlocker: download tool, disable antivirus, no company info.",
      "flags": [
        [
          "Disable antivirus",
          true
        ],
        [
          "Download unlocker",
          true
        ],
        [
          "No company info",
          true
        ],
        [
          "Gradient button",
          false
        ]
      ],
      "lesson": "Cracked tools and antivirus disabling are dangerous."
    },
    {
      "type": "choice",
      "category": "QR Scam",
      "prompt": "A QR sticker opens a weird payment page on a parking meter.",
      "options": [
        [
          "Pay it",
          false
        ],
        [
          "Use official city app/site",
          true
        ],
        [
          "Save card",
          false
        ],
        [
          "Enter bank login",
          false
        ]
      ],
      "lesson": "Official context matters for QR codes."
    },
    {
      "type": "choice",
      "category": "Job Scam",
      "prompt": "A remote job asks for an equipment fee before interview.",
      "options": [
        [
          "Pay fee",
          false
        ],
        [
          "Verify through official careers page",
          true
        ],
        [
          "Send SSN",
          false
        ],
        [
          "Accept immediately",
          false
        ]
      ],
      "lesson": "Pay-first jobs are scammy."
    },
    {
      "type": "sequence",
      "prompt": "A relative-like voice says: 'Send money now and do not call anyone.' Build the safe response sequence.",
      "steps": [
        "Pause",
        "Call saved number",
        "Document/report",
        "Send money",
        "Keep secret"
      ],
      "answer": [
        "Pause",
        "Call saved number",
        "Document/report"
      ],
      "lesson": "Safe response order beats panic."
    },
    {
      "type": "sequence",
      "prompt": "A fake bank text says to click a link and enter the MFA code. Build the safe response sequence.",
      "steps": [
        "Open official app",
        "Report/delete text",
        "Check account alerts",
        "Click link",
        "Reply with code"
      ],
      "answer": [
        "Open official app",
        "Check account alerts",
        "Report/delete text"
      ],
      "lesson": "Use official channels before acting on alerts."
    },
    {
      "type": "tokens",
      "prompt": "Boss message: 'FREE COINS! Login at game-prize-fast.net within 5 minutes or lose your account.'",
      "tokens": [
        [
          "Free reward pressure",
          true
        ],
        [
          "Unknown login domain",
          true
        ],
        [
          "Urgent deadline",
          true
        ],
        [
          "Game theme",
          false
        ],
        [
          "All caps word",
          false
        ]
      ],
      "lesson": "Evidence tokens reveal the scam pattern."
    },
    {
      "type": "tokens",
      "prompt": "Boss email: 'Invoice attached. Enable macros to view payment update.'",
      "tokens": [
        [
          "Unexpected invoice",
          true
        ],
        [
          "Enable macros",
          true
        ],
        [
          "Payment update pressure",
          true
        ],
        [
          "Attachment icon",
          false
        ],
        [
          "Polite greeting",
          false
        ]
      ],
      "lesson": "Macro requests and surprise invoices are risky."
    },
    {
      "type": "choice",
      "category": "Tech Support",
      "prompt": "A pop-up shows a support number and says not to close the browser.",
      "options": [
        [
          "Call number",
          false
        ],
        [
          "Install tool",
          false
        ],
        [
          "Close it and use trusted support",
          true
        ],
        [
          "Pay",
          false
        ]
      ],
      "lesson": "Pop-up support numbers are not trustworthy."
    },
    {
      "type": "sequence",
      "prompt": "Boss voice clone says: 'Send money and keep this secret.' Build the safe response.",
      "steps": [
        "Pause",
        "Call saved number",
        "Ask safe question",
        "Send money",
        "Keep secret"
      ],
      "answer": [
        "Pause",
        "Call saved number",
        "Ask safe question"
      ],
      "lesson": "Safe sequences beat panic."
    },
    {
      "type": "tokens",
      "prompt": "Boss page: 'Claim prize. Pay fee. Upload ID. Deadline 5 minutes.'",
      "tokens": [
        [
          "Prize fee",
          true
        ],
        [
          "ID upload",
          true
        ],
        [
          "Urgent deadline",
          true
        ],
        [
          "Colorful button",
          false
        ],
        [
          "Prize theme",
          false
        ]
      ],
      "lesson": "Evidence tokens expose fake prize scams."
    },
    {
      "type": "domain",
      "prompt": "Pick the safe official charity domain.",
      "answer": "redcross.org",
      "options": [
        "redcross.org",
        "urgent-redcross-crypto.net",
        "redcross-donate-fast.co"
      ],
      "lesson": "Verify charity domains independently."
    },
    {
      "type": "flags",
      "prompt": "Boss store: 95% off, pay by wire, no return address.",
      "flags": [
        [
          "95% off",
          true
        ],
        [
          "Pay by wire",
          true
        ],
        [
          "No return address",
          true
        ],
        [
          "Product image",
          false
        ]
      ],
      "lesson": "Extreme discounts and unsafe payment are red flags."
    },
    {
      "type": "amount",
      "prompt": "Boss romance account asks for $250 travel fee. Safe amount?",
      "answer": 0,
      "lesson": "Romance payment pressure gets $0."
    },
    {
      "type": "mfa",
      "prompt": "Boss sends an MFA prompt you did not request from another state.",
      "approve": false,
      "lesson": "Deny logins you did not start."
    },
    {
      "type": "choice",
      "category": "Game Chat",
      "prompt": "Boss posts: FREE EVENT SKINS. Log in through prize-fast-verify.net and send your 2FA code.",
      "options": [
        [
          "Open the prize login",
          false
        ],
        [
          "Send the 2FA code",
          false
        ],
        [
          "Report the player and use official event page",
          true
        ],
        [
          "Add them as a friend",
          false
        ]
      ],
      "lesson": "Game rewards should be checked through official game menus, not random links or code requests."
    },
    {
      "type": "domain",
      "prompt": "Boss shows four school portals. Pick the safest official-looking domain.",
      "answer": "purdue.edu",
      "options": [
        "purdue.edu",
        "purdue-password-reset.net",
        "purdue-scholarship-fast.co",
        "purdu3-login.com"
      ],
      "lesson": "Use exact official domains; extra words and lookalikes are risky."
    },
    {
      "type": "tokens",
      "prompt": "Boss romance message: I love you, keep this secret, crypto fee today, no video calls.",
      "tokens": [
        [
          "Quick love",
          true
        ],
        [
          "Secrecy",
          true
        ],
        [
          "Crypto fee today",
          true
        ],
        [
          "No video calls",
          true
        ],
        [
          "Friendly greeting",
          false
        ]
      ],
      "lesson": "Romance scams often combine emotional pressure, secrecy, money, and refusal to verify."
    },
    {
      "type": "flags",
      "prompt": "Boss browser popup says install AI Cleaner, disable antivirus, call this number, do not close page.",
      "flags": [
        [
          "Install cleaner",
          true
        ],
        [
          "Disable antivirus",
          true
        ],
        [
          "Call popup number",
          true
        ],
        [
          "Do not close page",
          true
        ],
        [
          "Browser window",
          false
        ]
      ],
      "lesson": "Fake support pages push installs, calls, and fear."
    },
    {
      "type": "amount",
      "prompt": "Boss marketplace buyer overpaid by $300 and asks for refund before payment clears. Safe amount?",
      "answer": 0,
      "lesson": "Overpayment refund pressure should get $0 until payment is independently verified."
    },
    {
      "type": "mfa",
      "prompt": "Boss floods you with sign-in approvals from a location you do not recognize.",
      "approve": false,
      "lesson": "Deny MFA prompts that you did not start."
    },
    {
      "type": "file",
      "prompt": "Boss download folder has safe notes and risky installers. Delete only risky files.",
      "files": [
        [
          "meeting_notes.pdf",
          false
        ],
        [
          "family_photo.jpg",
          false
        ],
        [
          "AI_Unblocker.exe",
          true
        ],
        [
          "Refund_Form.xlsm",
          true
        ],
        [
          "Bank_Login.scr",
          true
        ]
      ],
      "lesson": "Executable, script, and macro files from surprise sources are risky."
    },
    {
      "type": "sequence",
      "prompt": "Boss asks for a gift-card payment secretly. Build the safe response order.",
      "steps": [
        "Pause",
        "Verify with known contact",
        "Refuse payment",
        "Report/block"
      ],
      "answer": [
        "Pause",
        "Verify with known contact",
        "Refuse payment",
        "Report/block"
      ],
      "lesson": "A safe response pauses, verifies independently, refuses unsafe payment, then reports/blocks."
    },
    {
      "type": "chat",
      "player": "RapidPrize77",
      "message": "FREE ROBUX. Send your login code and I will unlock everything.",
      "lesson": "Report game chat asking for login codes."
    },
    {
      "type": "romance",
      "name": "Morgan",
      "bio": "I cannot video call, but I need a gift card tonight so I can visit you. Keep it secret.",
      "scam": true,
      "lesson": "Gift-card requests plus secrecy and no verification are scam signs."
    }
  ]
};
