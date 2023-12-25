const multer = require("multer");

const { ImageAnnotatorClient } = require("@google-cloud/vision");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GENAI_API_KEY);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const imageAnnotatorClient = new ImageAnnotatorClient();

const extractInfo = async (req, res) => {
  try {
    if (!req.file) {
      console.log("I was here");
      return res.status(400).json({ error: "No image uploaded." });
    }

    const imageBuffer = req.file.buffer;

    try {
      const [result] = await imageAnnotatorClient.textDetection(imageBuffer);
      const text = result.fullTextAnnotation.text;

      console.log("OCR Result:", text);

      // Parse the OCR result (similar to Tesseract parsing logic)
      const extractedInfo = await convertToJsonByGENAI(text);

      const extractedJson = extractJsonFromText(extractedInfo);

      if (!extractedJson) {
        return res.status(500).json({ error: "Failed to extract JSON data." });
      }

      // Send the parsed information to the frontend
      res.json({ result: extractedJson });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "OCR processing failed." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "OCR processing failed." });
  }
};

// Function to extract JSON data from text
function extractJsonFromText(text) {
  const jsonRegex = /\{[^]*\}/; // Regular expression to match JSON data
  const match = text.match(jsonRegex);

  if (match) {
    const extractedJsonString = match[0];
    const extractedJson = JSON.parse(extractedJsonString);
    //   return JSON.stringify(extractedJson, null, 2);
    return extractedJsonString;
  } else {
    return null; // Return null if no JSON data is found
  }
}

async function convertToJsonByGENAI(ocrText) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
    I'm working on a project that involves extracting information from Thai National ID cards. I've used OCR to extract text from a card image, and here's the resulting text:
    ${ocrText}
    Please extract the following information from the text and format it as JSON:

    Identification Number
    Name
    Last Name
    Date of Birth (in "DD-MM-YYYY" format)
    Date of Issue (in "DD-MM-YYYY" format)
    Date of Expiry (in "DD-MM-YYYY" format)

    Example Output:
    {
        "identification_number": "4 7363 39613 02 7",
        "name": "Mr. Rotngern",
        "last_name": "Yoopm",
        "date-of-birth": "31/03/2006",
        "date-of-issue": "15/09/2020",
        "date-of-expiry": "05/02/2026"
    }
    Additional Considerations:
    - Name should be in English Only.
    - If identification number or name or last name is not mentioned or sure use "unknown". This number if of 13 digits.
    - Date of expiry is always later than date of issue, it can be "lifelong" also. Use "/" as the format like 30/12/23 not "-" like 30-12-23.
    - Handle potential variations in text formatting and OCR errors gracefully.
    - Consider using regular expressions or other language-specific tools for accurate extraction.
    - Ensure proper handling of Thai characters and date formats.
    - If not sure about any of the data, then mention "unknown" in that.
    
    RETURN WITH THE JSON ONLY!!!
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return text;
}

// function parseGoogleVisionResult(ocrText) {
//     const lines = ocrText.split('\n');

//     const identificationNumberLine = lines.find(line => line.includes('Identification Number'));
//     const identificationNumberMatch = identificationNumberLine.match(/\b\d{1,4}\s\d{4,6}\s\d{4,6}\s\d{1,2}\s\d{1,4}\b/);
//     const identificationNumber = identificationNumberMatch ? identificationNumberMatch[0] : '';

//     const nameLine = lines.find(line => line.includes('Name'));
//     const nameParts = nameLine.split(' ').slice(1).filter(Boolean); // Filter out empty strings
//     const name = nameParts.slice(0, -1).join(' ').trim();
//     const lastName = nameParts.slice(-1).join(' ').trim();

//     const dateOfBirthLine = lines.find(line => line.includes('Date of Birth'));
//     const dateOfBirthMatch = dateOfBirthLine.match(/\b\d{1,2}\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\.?\s\d{4}\b/);
//     const dateOfBirth = dateOfBirthMatch ? dateOfBirthMatch[0] : '';

//     const dateOfIssueLine = lines.find(line => line.includes('Date of Issue'));
//     const dateOfIssueMatch = dateOfIssueLine.match(/\b\d{1,2}\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\.?\s\d{4}\b/);
//     const dateOfIssue = dateOfIssueMatch ? dateOfIssueMatch[0] : '';

//     const dateOfExpiryLine = lines.find(line => line.includes('Date of Expiry'));
//     const dateOfExpiryMatch = dateOfExpiryLine.match(/\b\d{1,2}\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\.?\s\d{4}\b/);
//     const dateOfExpiry = dateOfExpiryMatch ? dateOfExpiryMatch[0] : '';

//     return {
//         identification_number: identificationNumber,
//         name: name,
//         last_name: lastName,
//         'date-of-birth': dateOfBirth,
//         'date-of-issue': dateOfIssue,
//         'date-of-expiry': dateOfExpiry,
//     };
// }

module.exports = {
  extractInfo,
};
