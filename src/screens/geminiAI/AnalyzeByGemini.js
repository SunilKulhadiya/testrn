import axios from "axios";

import AppConstant from "../../../src/Helper/Constant"

const cache = new Map();

const retryWithBackoff = async (fn, retries = 3, delay = 1000) => {
  try {
    return await fn();
  } catch (err) {
    if (retries === 0) throw err;
    console.warn(`Retrying after ${delay}ms due to error:`, err.message);
    await new Promise(res => setTimeout(res, delay));
    return retryWithBackoff(fn, retries - 1, delay * 2);
  }
};

export const AnalyzeByGemini = async (base64Image, language = "en") => {

  // ✅ Return cached result if we already analyzed this image
  if (cache.has(base64Image)) {
    console.log("⚡ Returning cached result");
    return cache.get(base64Image);
  }
  //-------------------
  let prompt = `
  You are a professional pharmacist and medical information expert.

  Your job is to analyze a medicine wrapper image and return structured medical information.

  IMPORTANT RULES:
  - Return ONLY valid JSON
  - Do NOT write explanations
  - Do NOT add text before or after JSON
  - Always include ALL keys
  - If any value is not visible in the image, use general medical knowledge
  - Never leave important fields empty if the medicine composition is known
  - Keep the response medically safe and accurate

  OCR RULES:
  - Read and extract ALL visible text from the image
  - Medicine name has highest priority
  - Composition/Ingredients has highest priority
  - Manufacturer name should also be extracted if visible

  COMPOSITION RULES (VERY IMPORTANT):
  - Extract ALL chemical ingredients
  - If composition is written like:
      Paracetamol + Caffeine
      Amoxicillin and Clavulanic Acid
      Metformin 500 mg + Glimepiride 1 mg
    → Split into separate objects

  Each chemical must be a separate object in the composition array

  Example:
  "composition": [
    { "chemical_name": "Metformin Hydrochloride", "strength": "500 mg" },
    { "chemical_name": "Glimepiride", "strength": "1 mg" }
  ]

  - Include full chemical names
  - Include strength if visible (mg/ml/g)
  - NEVER return empty composition if ingredients are visible

  DIABETES SAFETY CHECK:
  Also check if this medicine is safe for diabetic patients.

  Rules:
  - If medicine contains sucrose, glucose, dextrose, sugar syrup, steroids → NOT SAFE
  - If generally safe medicines (like antibiotics, paracetamol, etc.) → SAFE
  - If safety depends on doctor consultation → USE WITH CAUTION

  Return the result in the required language.
  `;

  //const Languag = language || "hi";
  const Languag = "hi";

  console.log("63, AnalyzeByGemini.js, i18n.language : ",language, " = ", Languag);

  switch (Languag) {
    // ---------------- HINDI ----------------
      case "hi":
        prompt += `
          Return response in Hindi language.

          {
            "name": "",
            "brand_name": "",
            "generic_name": "",
            "medicine_type": "",
            "manufacturer": "",
            "capsule_shell_source": "",

            "composition": [
              {
                "chemical_name": "",
                "source": "",
                "strength": "",
                "veg_status": ""
              }
            ],

            "uses": [],
            "conditions_treated": [],
            "benefits": [],
            "how_it_works": "",

            "dosage": {
              "adult": "",
              "children": "",
              "max_daily_dose": ""
            },

            "side_effects": {
              "common": [],
              "serious": []
            },

            "warnings": {
              "pregnancy": "",
              "breastfeeding": "",
              "alcohol": ""
            },

            "contraindications": [],
            "drug_interactions": [],

            "dietary_classification": {
              "halal": "",
              "jain_safe": "",
              "vegetarian": ""
            },

            "diabetes_safety": {
              "is_safe": "",
              "reason": "",
              "sugar_content": "",
              "recommendation": ""
            },

            "veg_status": "",
            "risk_level": "",
            "safety_score": 0,
            "storage": "",
            "expiry_warning": "",
            "disclaimer": "यह जानकारी केवल शैक्षिक उद्देश्य के लिए है"
          }
          `;
        break;

        // ---------------- ARABIC ----------------
        case 'ar':
          prompt += `
        {
          "name": "اسم الدواء",
          "brand_name": "الاسم التجاري",
          "generic_name": "الاسم العلمي",
          "medicine_type": "نوع الدواء",
          "manufacturer": "الشركة المصنعة",
          "capsule_shell_source": "",
          "composition": [
            {
              "chemical_name": "",
              "source": "",
              "strength": "",
              "veg_status": ""
            }
          ],
          "uses": [],
          "conditions_treated": [],
          "benefits": [],
          "how_it_works": "",
          "dosage": {
            "adult": "",
            "children": "",
            "max_daily_dose": ""
          },
          "side_effects": {
            "common": [],
            "serious": []
          },
          "warnings": {
            "pregnancy": "",
            "breastfeeding": "",
            "alcohol": ""
          },
          "contraindications": [],
          "drug_interactions": [],
          "dietary_classification": {
            "halal": "",
            "jain_safe": "",
            "vegetarian": ""
          },
          "veg_status": "",
          "risk_level": "",
          "safety_score": 0,
          "storage": "",
          "expiry_warning": "",
          "disclaimer": "هذه المعلومات لأغراض تعليمية فقط"
        }
        `;
          break;

        // ---------------- MARATHI ----------------
        case 'mr':
          prompt += `
    {
      "name": "औषधाचे नाव",
      "brand_name": "ब्रँड नाव",
      "generic_name": "जनरिक नाव",
      "medicine_type": "औषधाचा प्रकार",
      "manufacturer": "निर्माता कंपनी",

      "capsule_shell_source": "",

      "composition": [
        {
          "chemical_name": "",
          "source": "",
          "strength": "",
          "veg_status": ""
        }
      ],

      "uses": [],
      "conditions_treated": [],
      "benefits": [],

      "how_it_works": "",

      "dosage": {
        "adult": "",
        "children": "",
        "max_daily_dose": ""
      },

      "side_effects": {
        "common": [],
        "serious": []
      },

      "warnings": {
        "pregnancy": "",
        "breastfeeding": "",
        "alcohol": ""
      },

      "contraindications": [],
      "drug_interactions": [],

      "dietary_classification": {
        "halal": "",
        "jain_safe": "",
        "vegetarian": ""
      },

      "veg_status": "",

      "risk_level": "",
      "safety_score": 0,

      "storage": "",
      "expiry_warning": "",

      "disclaimer": "ही माहिती फक्त शैक्षणिक उद्देशांसाठी आहे"
    }
    `;
          break;

        // ---------------- GUJARATI ----------------
        case 'gu':
          prompt += `
    {
      "name": "દવાના નામ",
      "brand_name": "બ્રાન્ડ નામ",
      "generic_name": "જનરિક નામ",
      "medicine_type": "દવાનો પ્રકાર",
      "manufacturer": "ઉત્પાદક કંપની",

      "capsule_shell_source": "",

      "composition": [
        {
          "chemical_name": "",
          "source": "",
          "strength": "",
          "veg_status": ""
        }
      ],

      "uses": [],
      "conditions_treated": [],
      "benefits": [],

      "how_it_works": "",

      "dosage": {
        "adult": "",
        "children": "",
        "max_daily_dose": ""
      },

      "side_effects": {
        "common": [],
        "serious": []
      },

      "warnings": {
        "pregnancy": "",
        "breastfeeding": "",
        "alcohol": ""
      },

      "contraindications": [],
      "drug_interactions": [],

      "dietary_classification": {
        "halal": "",
        "jain_safe": "",
        "vegetarian": ""
      },

      "veg_status": "",

      "risk_level": "",
      "safety_score": 0,

      "storage": "",
      "expiry_warning": "",

      "disclaimer": "આ માહિતી માત્ર શૈક્ષણિક હેતુઓ માટે છે"
    }
    `;
      break;

    // ---------------- SPANISH ----------------
    case 'es':
      prompt += `
    {
      "name": "nombre del medicamento",
      "brand_name": "nombre de la marca",
      "generic_name": "nombre genérico",
      "medicine_type": "tipo de medicamento",
      "manufacturer": "fabricante",

      "capsule_shell_source": "",

      "composition": [
        {
          "chemical_name": "",
          "source": "",
          "strength": "",
          "veg_status": ""
        }
      ],

      "uses": [],
      "conditions_treated": [],
      "benefits": [],

      "how_it_works": "",

      "dosage": {
        "adult": "",
        "children": "",
        "max_daily_dose": ""
      },

      "side_effects": {
        "common": [],
        "serious": []
      },

      "warnings": {
        "pregnancy": "",
        "breastfeeding": "",
        "alcohol": ""
      },

      "contraindications": [],
      "drug_interactions": [],

      "dietary_classification": {
        "halal": "",
        "jain_safe": "",
        "vegetarian": ""
      },

      "veg_status": "",

      "risk_level": "",
      "safety_score": 0,

      "storage": "",
      "expiry_warning": "",

      "disclaimer": "Esta información es solo para fines educativos"
    }
    `;
      break;

    // ---------------- FRENCH ----------------
    case 'fr':
      prompt += `
{
  "name": "nom du médicament",
  "brand_name": "nom de la marque",
  "generic_name": "nom générique",
  "medicine_type": "type de médicament",
  "manufacturer": "fabricant",

  "capsule_shell_source": "",

  "composition": [
    {
      "chemical_name": "",
      "source": "",
      "strength": "",
      "veg_status": ""
    }
  ],

  "uses": [],
  "conditions_treated": [],
  "benefits": [],

  "how_it_works": "",

  "dosage": {
    "adult": "",
    "children": "",
    "max_daily_dose": ""
  },

  "side_effects": {
    "common": [],
    "serious": []
  },

  "warnings": {
    "pregnancy": "",
    "breastfeeding": "",
    "alcohol": ""
  },

  "contraindications": [],
  "drug_interactions": [],

  "dietary_classification": {
    "halal": "",
    "jain_safe": "",
    "vegetarian": ""
  },

  "veg_status": "",

  "risk_level": "",
  "safety_score": 0,

  "storage": "",
  "expiry_warning": "",

  "disclaimer": "Ces informations sont uniquement à des fins éducatives"
}
`;
      break;

    // ---------------- CHINESE ----------------
    case 'zh':
      prompt += `
{
  "name": "药品名称",
  "brand_name": "品牌名称",
  "generic_name": "通用名",
  "medicine_type": "药物类型",
  "manufacturer": "生产厂家",

  "capsule_shell_source": "",

  "composition": [
    {
      "chemical_name": "",
      "source": "",
      "strength": "",
      "veg_status": ""
    }
  ],

  "uses": [],
  "conditions_treated": [],
  "benefits": [],

  "how_it_works": "",

  "dosage": {
    "adult": "",
    "children": "",
    "max_daily_dose": ""
  },

  "side_effects": {
    "common": [],
    "serious": []
  },

  "warnings": {
    "pregnancy": "",
    "breastfeeding": "",
    "alcohol": ""
  },

  "contraindications": [],
  "drug_interactions": [],

  "dietary_classification": {
    "halal": "",
    "jain_safe": "",
    "vegetarian": ""
  },

  "veg_status": "",

  "risk_level": "",
  "safety_score": 0,

  "storage": "",
  "expiry_warning": "",

  "disclaimer": "此信息仅供教育用途"
}
`;
      break;

    // ---------------- DEFAULT (ENGLISH) ----------------
    default:
      prompt += `
    {
      "name": "",
      "brand_name": "",
      "generic_name": "",
      "medicine_type": "",
      "manufacturer": "",
      "capsule_shell_source": "",
      "composition": [
        {
          "chemical_name": "",
          "source": "",
          "strength": "",
          "veg_status": ""
        }
      ],
      "uses": [],
      "conditions_treated": [],
      "benefits": [],
      "how_it_works": "",
      "dosage": {
        "adult": "",
        "children": "",
        "max_daily_dose": ""
      },
      "side_effects": {
        "common": [],
        "serious": []
      },
      "warnings": {
        "pregnancy": "",
        "breastfeeding": "",
        "alcohol": ""
      },
      "contraindications": [],
      "drug_interactions": [],
      "dietary_classification": {
        "halal": "",
        "jain_safe": "",
        "vegetarian": ""
      },
      "veg_status": "",
      "risk_level": "",
      "safety_score": 0,
      "storage": "",
      "expiry_warning": "",
      "disclaimer": "This information is for educational purposes only"
    }
    `;
  }
  //--------------------
try {

    console.log("521 , AppConstant.GEMINI_APPLY_URL:", AppConstant.GEMINI_APPLY_URL); // ✅ now will show if success
    console.log("📸 base64 length:", base64Image?.length);

    // const res = await axios.post(AppConstant.GEMINI_APPLY_URL, {
    //   contents: [
    //     {
    //       parts: [
    //         { text: prompt },
    //         {
    //           inline_data: {
    //             mime_type: "image/jpeg",
    //             data: base64Image
    //           }
    //         }
    //       ]
    //     }
    //   ]
    // });

try {
    const res = await retryWithBackoff(() =>
      axios.post(AppConstant.GEMINI_APPLY_URL, {
        contents: [
          {
            parts: [
              { text: prompt },
              {
                inline_data: {
                  mime_type: "image/jpeg",
                  data: base64Image
                }
              }
            ]
          }
        ]
      })
    );

    const text = res?.data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    const json = text.substring(text.indexOf("{"), text.lastIndexOf("}") + 1);
    const parsed = JSON.parse(json);

    // ✅ Cache the result
    cache.set(base64Image, parsed);

    return parsed;

  } catch (error) {
    console.error("❌ API ERROR:", error);
    if (error.response) {
      console.error("❌ RESPONSE ERROR:", error.response.data);
      console.error("❌ STATUS:", error.response.status);
      if (error.response.status === 429) {
        return {
          error: "Rate limit exceeded. Please try again later.",
          disclaimer: "This information is for educational purposes only"
        };
      }
    }
    return {}; // prevent crash
  }
      
    console.log("538 res:", res?.data?.candidates?.[0]?.content?.parts?.[0]?.text); // ✅ now will show if success

    const text =
      res?.data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

    const json =
      text.substring(text.indexOf("{"), text.lastIndexOf("}") + 1);

    return JSON.parse(json);

  } catch (error) {

    console.log("❌ API ERROR:", error); // 🔥 THIS is what you are missing

    if (error.response) {
      console.log("❌ RESPONSE ERROR:", error.response.data);
      console.log("❌ STATUS:", error.response.status);
    }

    return {}; // prevent crash
  }
};