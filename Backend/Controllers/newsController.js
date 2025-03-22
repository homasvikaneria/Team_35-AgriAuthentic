import axios from 'axios';

// Function to fetch agriculture news in India
export const getAgricultureNews = async (req, res) => {
    try {
        const apiKey = '7f99147dbc0b4cd49624a8a72d86e40b'; // Your API key
        const url = `https://newsapi.org/v2/everything?q=agriculture%20India&language=en&apiKey=${apiKey}`;

        const response = await axios.get(url);
        
        if (response.data.articles.length === 0) {
            return res.status(404).json({ message: "No news found" });
        }

        res.json(response.data.articles); // Send the articles to the frontend
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch news", error: error.message });
    }
};
