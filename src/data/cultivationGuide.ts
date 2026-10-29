export interface CultivationPhase {
  id: string;
  stageTitle: string;
  hindiTitle: string;
  timelineDays: string;
  keyActionSummary: string;
  criticalParameters: {
    label: string;
    value: string;
  }[];
  detailedGuide: string[];
  organicTips: string[];
  expertDosAndDonts: {
    dos: string[];
    donts: string[];
  };
}

export const TOMATO_CULTIVATION_GUIDE: CultivationPhase[] = [
  {
    id: 'stage_soil_seed',
    stageTitle: '1. Seed Selection, Treatment & Soil Preparation',
    hindiTitle: 'बीज चयन, बीजोपचार और मिट्टी की तैयारी',
    timelineDays: 'Day -30 to -25 before transplanting',
    keyActionSummary: 'Choose disease-resistant hybrid varieties, treat seeds with Trichoderma, and prepare well-drained loamy soil with solarization.',
    criticalParameters: [
      { label: 'Soil pH Range', value: '6.0 – 6.8 (Slightly Acidic to Neutral)' },
      { label: 'Soil Temperature', value: '20°C – 26°C' },
      { label: 'Recommended Varieties', value: 'Pusa Ruby, Arka Rakshak, Pusa Rohini, Himsona' },
      { label: 'Seed Rate', value: '100 – 150 g / hectare (Hybrid)' }
    ],
    detailedGuide: [
      'Plough the land 3 to 4 times to achieve fine tilth. Ensure proper drainage to avoid water stagnation, which triggers fungal damping-off.',
      'Incorporate 20–25 tonnes of well-rotted Farm Yard Manure (FYM) or 5–7 tonnes of Vermicompost per hectare during the final ploughing.',
      'Seed Treatment (Biocontrol): Treat seeds with Trichoderma viride or Pseudomonas fluorescens @ 10g/kg of seed to protect against soil-borne Fusarium and Rhizoctonia.',
      'Chemical Seed Treatment (Optional): Alternatively, dress seeds with Thiram or Captan @ 2g/kg seed if biological options are unavailable.'
    ],
    organicTips: [
      'Conduct soil solarization using clear 25-micron polythene sheets for 4 weeks in peak summer to sterilize weed seeds and nematode cysts naturally.',
      'Mix 5 kg of Neem cake per 100 sq. meters to repel root-knot nematodes and wireworms.'
    ],
    expertDosAndDonts: {
      dos: [
        'Test soil fertility and electrical conductivity (EC < 1.0 dS/m) before planting.',
        'Always buy certified high-germination seeds from accredited ICAR/NSC retailers.'
      ],
      donts: [
        'Do not plant tomatoes in soil where potato, eggplant, or capsicum was cultivated in the previous 2 seasons (break Solanaceae pathogen cycle).',
        'Avoid using fresh unfermented cow dung which creates toxic ammonia heat and attracts root grubs.'
      ]
    }
  },
  {
    id: 'stage_nursery',
    stageTitle: '2. Pro-Tray Nursery Raising & Germination',
    hindiTitle: 'प्रो-ट्रे नर्सरी एवं बीज अंकुरण',
    timelineDays: 'Day -25 to 0 (25-30 days in Nursery)',
    keyActionSummary: 'Grow seedlings in 98-cell plastic pro-trays using sterilized coco-peat and vermiculite medium inside shade net house.',
    criticalParameters: [
      { label: 'Growing Medium Ratio', value: 'Coco-peat : Vermiculite : Perlite (3:1:1)' },
      { label: 'Germination Time', value: '4 to 6 days' },
      { label: 'Nursery Age for Field', value: '25 to 30 days (4 to 5 true leaves)' },
      { label: 'Optimal Day Temp', value: '22°C – 28°C' }
    ],
    detailedGuide: [
      'Fill cavity pro-trays with sterilized coco-peat enriched with 1% Trichoderma harzianum.',
      'Sow 1 seed per cell at a depth of 0.5 cm. Cover gently with a thin layer of coco-peat.',
      'Stack the trays together and cover with black polyethylene sheet for 3-4 days until the first sprout emergence.',
      'Transfer trays under 50% green agro-shade net. Water twice daily using a fine rose sprayer or micro-sprinkler.'
    ],
    organicTips: [
      'Drench seedlings on Day 15 with diluted Panchagavya (3%) or Seaweed extract (2 ml/L) to induce vigorous lateral root branching.',
      'Spray cow milk spray (10% diluted in water) on nursery foliage to create a natural antiviral protective film against leaf curl.'
    ],
    expertDosAndDonts: {
      dos: [
        'Harden the seedlings 4–5 days prior to field transplanting by withholding water and exposing them to direct field sunlight.',
        'Dip seedling root plugs in Pseudomonas fluorescens slurry (10g/L) for 15 minutes right before field transplantation.'
      ],
      donts: [
        'Never let trays sit in stagnant water as Pythium damping-off will kill young stems overnight.',
        'Avoid transplanting weak, elongated leggy seedlings grown in low light.'
      ]
    }
  },
  {
    id: 'stage_transplanting',
    stageTitle: '3. Field Bed Preparation, Spacing & Transplanting',
    hindiTitle: 'खेत की तैयारी, रोपाई एवं दूरी (स्पेसिंग)',
    timelineDays: 'Day 0 to 15 (Establishment Phase)',
    keyActionSummary: 'Construct raised beds with drip irrigation and silver-black mulch. Transplant sturdy seedlings in evening hours.',
    criticalParameters: [
      { label: 'Bed Dimensions', value: 'Top width 90 cm, Height 30 cm, Furrow 50 cm' },
      { label: 'Plant-to-Plant Distance', value: '45 cm to 60 cm' },
      { label: 'Row-to-Row Distance', value: '120 cm to 150 cm (paired row)' },
      { label: 'Transplant Time', value: 'Late afternoon (3:30 PM onwards)' }
    ],
    detailedGuide: [
      'Form raised beds running North-South to ensure uniform sunlight interception across both sides of the canopy.',
      'Lay dual 16 mm drip lateral pipes with inline emitters spaced at 40 cm (discharge 2.0 to 4.0 LPH).',
      'Cover beds with 25-30 micron silver-black reflective plastic mulch film. Punch 3-inch holes at 50 cm spacing.',
      'Transplant seedlings gently without crushing the root ball. Firm the soil around the collar and apply light flood/drip irrigation immediately.'
    ],
    organicTips: [
      'Silver reflective mulch repels thrips and whiteflies by scattering UV light, dramatically reducing early viral leaf curl vector attacks.',
      'Incorporate 1 kg of mycorrhizal bio-fertilizer per acre in the transplant holes to expand nutrient absorption capacity.'
    ],
    expertDosAndDonts: {
      dos: [
        'Ensure transplanting is strictly completed during late afternoon or overcast weather to minimize transpiration shock.',
        'Perform the 1st automated 15-Day Inspection Checkpoint to confirm seedling root take.'
      ],
      donts: [
        'Do not bury the stem deeper than the original root collar level; deep stem burial invites collar rot (Sclerotium rolfsii).',
        'Avoid dry soil during the first 72 hours post-transplant.'
      ]
    }
  },
  {
    id: 'stage_staking_pruning',
    stageTitle: '4. Staking, Trellising & Canopy Sanitation (Crucial for Blight Control)',
    hindiTitle: 'सहारा देना (Staking), प्रूनिंग एवं कैनोपी स्वच्छता',
    timelineDays: 'Day 16 to 45 (Vegetative & Staking Phase)',
    keyActionSummary: 'Erect bamboo or GI wire trellis to keep foliage elevated off wet soil, preventing soil-splash fungal spore infections.',
    criticalParameters: [
      { label: 'Staking Support', value: '8-10 ft Bamboo poles or 12-gauge GI wire' },
      { label: 'Pruning Height', value: 'Remove all bottom leaves up to 15 cm (6 inches)' },
      { label: 'Sucker Management', value: 'Prune side shoots to maintain 2-3 vigorous main stems' },
      { label: 'Canopy Airflow', value: 'High ventilation to keep leaves dry within 2 hours of dew' }
    ],
    detailedGuide: [
      'Install bamboo poles every 10–12 feet along the row and string UV-stabilized trellis twine horizontally at 1 ft, 2.5 ft, 4 ft, and 5.5 ft levels.',
      'Tie tomato vines to the support lines using loose figure-8 knots so stems have space to thicken.',
      'Sanitary Pruning: Strip off all leaves and suckers touching the ground. Alternaria solani spores reside in the soil and infect plants through rain splash on bottom foliage.',
      'Ensure side suckers (axillary shoots) are pinched out when they are 2-3 inches long, ideally during sunny dry mornings.'
    ],
    organicTips: [
      'Disinfect pruning shears in 70% alcohol or 5% sodium hypochlorite solution between individual rows to prevent transmitting mosaic viruses.',
      'Apply wood ash (rich in bio-potassium and calcium) around the base of each plant to deter cutworms and strengthen cell walls.'
    ],
    expertDosAndDonts: {
      dos: [
        'Maintain single or double stem architecture for indeterminate greenhouse/trellised varieties.',
        'Upload your 15-day and 30-day inspection photo in the app to detect early blighted foliage.'
      ],
      donts: [
        'Never prune plants while leaves are wet with rain or morning dew; wet cuts are open doorways for bacterial spot (Xanthomonas).',
        'Do not leave pruned infected leaves on the ground—collect and bury or incinerate them outside the plot.'
      ]
    }
  },
  {
    id: 'stage_flowering_nutrition',
    stageTitle: '5. Flowering, Fruit Set & Balanced Nutrition',
    hindiTitle: 'पुष्पन (फूल आना), फल विकास एवं संतुलित पोषण',
    timelineDays: 'Day 46 to 75 (Flowering & Fruit Setting)',
    keyActionSummary: 'Supply balanced potassium and calcium fertigation, prevent blossom drop, and scout for early blight concentric rings.',
    criticalParameters: [
      { label: 'Fertigation Ratio', value: 'N:P:K 1:1:2 during fruit set, increasing K' },
      { label: 'Calcium Spray', value: 'Chelated Calcium (1.5 g/L) against Blossom End Rot' },
      { label: 'Irrigation Cadence', value: 'Every 2-3 days via drip (avoid moisture swings)' },
      { label: 'Pollination Aid', value: 'Slight morning trellis vibration / bumblebee activity' }
    ],
    detailedGuide: [
      'Flowering marks the transition to heavy nutrient uptake. Boost potassium (K) fertigation using Potassium Nitrate (13:0:45) or Sulphate of Potash (0:0:50).',
      'Blossom End Rot Prevention: Apply foliar Calcium Nitrate or Chelated Calcium (EDTA) @ 2g/L at peak flower initiation to prevent dark sunken rot at the fruit blossom end.',
      'Irrigate at regular intervals to maintain uniform soil moisture. Irregular watering cycles cause sudden fruit cracking and cuticle splitting.',
      'Monitor ambient temperature: daytime temps exceeding 35°C or nighttime temps dropping below 13°C cause poor pollination and flower dropping.'
    ],
    organicTips: [
      'Foliar spray fermented buttermilk (sour curd diluted 1:10 with water) every 10 days—lactic acid bacteria act as an effective organic fungicide and immunity stimulant.',
      'Spray Boron (Solubor 20%) @ 1.0 g/L during flower opening to enhance pollen tube viability and uniform fruit sizing.'
    ],
    expertDosAndDonts: {
      dos: [
        'Install yellow and blue sticky traps (15–20 per acre) at canopy level to monitor whiteflies and thrips.',
        'Execute the 60-day leaf inspection check to ensure fruit-bearing clusters remain uninfected.'
      ],
      donts: [
        'Do not spray chemical insecticides during 9:00 AM to 12:00 PM when honeybees and pollinators are actively foraging.',
        'Avoid excess nitrogenous fertilizers (Urea) at flowering, which causes excessive vegetative leaf growth and blossom drop.'
      ]
    }
  },
  {
    id: 'stage_harvesting',
    stageTitle: '6. Fruit Ripening, Harvesting & Post-Harvest Storage',
    hindiTitle: 'फल पकना, तुड़ाई एवं भण्डारण',
    timelineDays: 'Day 76 to 120+ (Harvesting & Marketing)',
    keyActionSummary: 'Harvest at breaker or pink stage for long-distance transport, or red-ripe for local consumption and processing.',
    criticalParameters: [
      { label: 'First Harvest Window', value: '70 to 85 days after transplanting (varies by hybrid)' },
      { label: 'Harvest Stages', value: 'Breaker (10% pink) | Turning (10-30%) | Pink | Red Ripe' },
      { label: 'Yield Expectation', value: '25 – 40 tonnes / acre (Modern Drip Cultivation)' },
      { label: 'Storage Temperature', value: '12°C – 15°C with 85–90% Relative Humidity' }
    ],
    detailedGuide: [
      'Pick tomatoes gently with calyx/stalk attached to prevent stem-end scarring and fungal mold entry.',
      'Harvest during early morning hours before fruit absorbs field heat. Place fruits in plastic crates lined with soft paper.',
      'Grade fruits into uniform size classes (A: >65mm, B: 50-65mm, C: <50mm) and eliminate cracked, sunscalded, or blighted fruits.',
      'Observe pre-harvest chemical withholding periods: never harvest crops within 5-7 days of any synthetic fungicide spray.'
    ],
    organicTips: [
      'Spray vermiwash (5%) after each picking harvest to accelerate recovery and prolong indeterminate fruit harvest flushes.',
      'Wipe storage crates with 2% neem oil emulsion to prevent post-harvest fruit rot organisms.'
    ],
    expertDosAndDonts: {
      dos: [
        'Stack plastic crates in ventilated shade, never in direct midday sunlight.',
        'Keep records of total picked yield and comparison with previous seasons.'
      ],
      donts: [
        'Never store unripe tomatoes below 10°C in standard household refrigerators; chilling injury destroys tomato aroma and prevents red carotenoid synthesis.',
        'Do not drop or squeeze fruits during crate transfer.'
      ]
    }
  }
];
