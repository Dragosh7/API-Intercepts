
export function generateRandomWords(length: number): string {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomWords = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomWords += characters[randomIndex];
  }
  return randomWords;
}


export function getBackgroundImage() {
  return cy.request({
    method: "GET",
    url: "https://static.wixstatic.com/media/3030f0cdb8854cee84ee31fc9598f5df.jpg/v1/fill/w_1478,h_1149,al_t,q_85,usm_0.66_1.00_0.01,enc_auto/3030f0cdb8854cee84ee31fc9598f5df.jpg",
    failOnStatusCode: false,
  });
}