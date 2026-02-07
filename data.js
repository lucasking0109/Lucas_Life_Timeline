// Lucas King - Portfolio Data
// All content is organized by category for easy maintenance

const SITE_DATA = {
    personal: {
        name: "Chun-An (Lucas) Chin",
        title: "Quantitative Researcher | Quantitative trader | Data Scientist",
        bio: [
            "Chun-An has graduated from Boston University's MSMFT program and passed CFA Level II, with hands-on experience in quantitative research, systematic trading, and portfolio risk management. He specializes in combining macro signals, fundamental factors, and machine learning models to generate alpha across U.S. equities and derivatives markets.",
            "His current work focuses on applying large language models and deep learning to financial forecasting, news analytics, and event-driven strategies."
        ],
        social: {
            github: "https://github.com/lucasking0109",
            linkedin: "https://www.linkedin.com/in/chun-an-chin-989686224/",
            email: "cchunan@bu.edu"
        }
    },

    experience: [
        {
            title: "Vici Holdings - AI Data Scientist Intern",
            date: "July 2025",
            startYear: 2025,
            startMonth: 7,
            description: [
                "Applied LLMs to extract and quantify management-quality indicators from U.S. 10-K filings, focusing on disclosure consistency and governance signals, and linked them to long-term stock performance using permutation tests.",
                "Developed a multi-agent LLM system to identify impactful news and generate M&A valuation scenarios, leading to event-driven trades in preferred stocks based on conversion terms and interest-rate reset mechanics."
            ],
            link: null
        },
        {
            title: "Clear Island Co., Ltd. - Investment Analyst",
            date: "Nov 2022 - Jul 2024",
            startYear: 2022,
            startMonth: 11,
            endYear: 2024,
            endMonth: 7,
            description: [
                "Developed a quantitative framework to exploit economic cycles by integrating macro indicators with fundamental screens, signal normalization, and regime-based filtering to identify trading opportunities in the U.S. equities.",
                "Built a dynamic VaR and ES framework leveraging historical simulation and parametric methods, scenario analysis, and stress testing, improving end-of-day risk assessment and portfolio exposure decisions.",
                "Leveraged model signals to manage an unleveraged, high-beta (Beta = 2.0) portfolio, achieved Sharpe Ratio 2.84, Information Ratio 2.23, and generated +3.63% annualized alpha against the NASDAQ benchmark."
            ],
            link: null
        },
        {
            title: "Capital Futures Corporation - Trading Model Researcher Intern",
            date: "Sep 2020 - May 2021",
            startYear: 2020,
            startMonth: 9,
            endYear: 2021,
            endMonth: 5,
            description: [
                "Developed a z-score mean-reversion model; ATR-based dynamic bands delivered +12% annual return in live trading.",
                "Built trend-following strategies with volatility filters across Forex CFDs/time frames, forming diversified long/short portfolios; reduced portfolio volatility by 23%, raised win rate by 16%, and deployed to live trading."
            ],
            link: null
        }
    ],

    education: [
        {
            title: "Boston University",
            degree: "MS in Mathematical Finance & Financial Technology",
            date: "Sep 2024 - Present",
            startYear: 2024,
            startMonth: 9,
            description: [],
            coursework: "Statistics, Stochastic Calculus, Advanced Machine Learning, Algorithmic and High-Frequency Trading, Credit Risk, Deep Learning, Fixed Income, Advanced Programming, Corporate Risk, Economics of FinTech"
        },
        {
            title: "Soochow University",
            degree: "Bachelor of Business Administration",
            date: "Graduated Jun 2022",
            startYear: 2018,
            startMonth: 9,
            endYear: 2022,
            endMonth: 6,
            description: [],
            coursework: "Statistics, Financial Management, Operations Research, Operations Management, Microeconomics, Macroeconomics, Managerial Accounting, Information Management, Procurement Management, Marketing Research, Global Marketing, Project Management, Marketing Management, Business Calculus, Economics, Management, Accounting, Financial Investment and Asset Management, An Introduction to Financial Derivatives, Machine Learning with Python, Application of Artificial Intelligence in Financial Industry"
        },
        {
            title: "Hanze University of Applied Sciences (Hanze UAS)",
            degree: "Exchange Student - Brand, Design & Psychology",
            date: "Feb 2022 - Jun 2022",
            startYear: 2022,
            startMonth: 2,
            endYear: 2022,
            endMonth: 6,
            description: [
                "Exchange student with scholarship studying Brand, Design & Psychology."
            ]
        }
    ],

    projects: [
        {
            title: "Automated Investment Style Classification for Mutual Fund Prospectuses Using NLP",
            date: "May 2025",
            description: [
                "Data preprocessing and tokenization.",
                "Generated domain-specific word embeddings using Skip-gram Word2Vec.",
                "Built Knowledge Base to calculate cosine distance between document vectors and style centroids as additional features.",
                "Performed classification using Regression, Random Forest, and XGBoost.",
                "Achieved 66% accuracy using XGBoost for automated fund style classification."
            ],
            link: null
        },
        {
            title: "Company Bankruptcy Prediction (Kaggle Competition)",
            date: "Apr 2025",
            description: [
                "Applied StandardScaler for feature normalization; addressed extreme class imbalance using SMOTE oversampling within each cross-validation fold.",
                "Built Pipeline connecting StandardScaler → SMOTE → Classifier, preventing data leakage.",
                "Tested Random Forest, SVM, and XGBoost, optimizing for F1 score.",
                "XGBoost model achieved 0.46 F1 score on test set, demonstrating PR97 model stability."
            ],
            link: null
        },
        {
            title: "Big Data Cleaning and Application",
            date: "Apr 2025",
            description: [
                "Processed 400+ stocks' 1-minute price data from Polygon.io (May 2023 - May 2025) using PySpark, converting to Parquet format.",
                "Identified stock price anomalies by calculating VWAP and comparing statistical values across different data sources.",
                "Conducted regression analysis proving returns don't follow normal distribution; demonstrated most stock trading volume concentrates in the last 30 minutes before market close."
            ],
            link: null
        },
        {
            title: "U.S. Treasury Spot Yield Curve Fitting (2015-2025)",
            date: "Mar 2025",
            description: [
                "Used Bloomberg 2015-2025 Treasury par yield rates, deriving Spot Yield Curve through Bootstrap method.",
                "Applied Ho-Lee, Hull-White, Vasicek, Nelson-Siegel models, as well as LSTM, Random Forest, and Gradient Boosting Regression.",
                "Nelson-Siegel Model showed optimal stability with potential for price prediction and trading; LSTM demonstrated very high accuracy."
            ],
            link: null
        }
    ],

    competitions: [
        {
            title: "IMC Prosperity 3 Trading Competition",
            subtitle: "Top 1% globally (133rd/12,621)",
            date: "Spring 2025",
            description: [
                "Developed volatility-arbitrage strategies by modeling implied volatility surfaces, cross-sectional deviations, and generating dynamic Black-Scholes pricing signals to systematically exploit recurring short-term mispricing.",
                "Exploited hidden microstructure inefficiencies across markets by optimizing limit-order placement, execution timing, and fill probabilities, capturing ~60% of theoretical arbitrage potential with minimal risk exposure."
            ]
        },
        {
            title: "Rotman International Trading Competition 2025",
            date: "Spring 2025",
            description: [
                "Led team to 1st place in the MSMFT internal competition: Achieved 2nd place globally in the Sales & Trader Case by coordinating strategies and ensuring alignment across team members under real-time trading pressure.",
                "Deployed market-making strategies targeting order-book imbalances and spread dynamics, systematically profiting from structural inefficiencies while avoiding directional exposure."
            ]
        }
    ],

    certificates: {
        file: "certificates/ALL_Certificates_2026.pdf",
        images: [
            "certificates/images/cert-01.png",
            "certificates/images/cert-02.png",
            "certificates/images/cert-03.png",
            "certificates/images/cert-04.png",
            "certificates/images/cert-05.png",
            "certificates/images/cert-06.png",
            "certificates/images/cert-07.png",
            "certificates/images/cert-08.png",
            "certificates/images/cert-09.png",
            "certificates/images/cert-10.png",
            "certificates/images/cert-11.png",
            "certificates/images/cert-12.png",
            "certificates/images/cert-13.png",
            "certificates/images/cert-14.png",
            "certificates/images/cert-15.png",
            "certificates/images/cert-16.png",
            "certificates/images/cert-17.png"
        ],
        categories: [
            {
                name: "Finance",
                items: [
                    "CFA Level 2 Passed",
                    "CFA Level 1 Passed",
                    "Amplifyme x CFA Institute: Finalist of Investing Simulator Challenge",
                    "Akuna Capital: Options 101 / 201 Courses",
                    "Licensing Examination for Securities and Futures Intermediaries (Hong Kong)",
                    "Qualification Exam for Senior Securities Specialist",
                    "Qualification Exam for Futures Specialist",
                    "Basic Test on Financial Markets and Professional Ethics"
                    
                ]
            },
            {
                name: "Coding",
                items: [
                    "CodePath: Intermediate Technical Interview Prep (Advanced)",
                    "TQC: Python Programming",
                    "TQC: Web Data Extraction and Analysis"
                ]
            }
        ]
    }
};
