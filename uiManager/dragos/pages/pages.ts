
export const homepage = {
  roomsButton: () => cy.get("#i6kl732v2label"),
  clickOnRoomsButton: () => cy.get("#i6kl732v2label").should("be.visible").click(),
  exploreButton: () => cy.get("#i6kl732v1label")
  
}

export const roomsPage = {
  cottageRoom: () => cy.get("#content > div > div.content-body > div > ul > li:nth-child(2) > div > div.info > div.bottom > button > span")
}

export const explorePage = {
  twitterLink: () => cy.get('[href="http://www.twitter.com/wix"]')
}

export const contactPage = {
  nameField: () => cy.get("#input_comp-jxbsa1e9"),
  emailField: () => cy.get("#input_comp-jxbsa1em"),
  phoneField: () => cy.get("#input_comp-jxbsa1ev"),
  commentField: () => cy.get("#textarea_comp-jxbsa1f7"),
  submitField: () => cy.get("#comp-jxbsa1fi > button")
}