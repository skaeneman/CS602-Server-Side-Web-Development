// http://www.forbes.com/sites/kevinkruse/2013/05/28/inspirational-quotes/

const quotes = [
  "Life isn’t about getting and having, it’s about giving and being. –Kevin Kruse",
  "Whatever the mind of man can conceive and believe, it can achieve. –Napoleon Hill",
  "Strive not to be a success, but rather to be of value. –Albert Einstein",
  "You miss 100% of the shots you don’t take. –Wayne Gretzky",
  "Every strike brings me closer to the next home run. –Babe Ruth",
  "Definiteness of purpose is the starting point of all achievement. –W. Clement Stone",
  "Life is what happens to you while you’re busy making other plans. –John Lennon",
  "We become what we think about. –Earl Nightingale",
  "Life is 10% what happens to me and 90% of how I react to it. –Charles Swindoll"
  ];


exports.getRandomQuote = () => {
	return quotes[Math.floor(
		             Math.random() * quotes.length)];
};

exports.getAllQuotes = () => {
	return quotes;
}

