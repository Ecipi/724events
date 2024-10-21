import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });

});


describe("When a page is created", () => {
  it("all images in the event section have valid sources", async () => {
    render(<Home />);
    
    const images = await screen.findAllByTestId("card-image-testid");
    
    images.forEach(image => {
      expect(image).toHaveAttribute('src');
      expect(image.src).toMatch(/\/images\/.+/);
    });
  });
});

describe("When the user navigates the page", () => {
  it("scrolls to the EventsContainer section when clicking on 'Nos services'", async () => {
    render(<Home />);

    const servicesLink = screen.getByRole('link', { name: "Nos réalisations" });
    fireEvent.click(servicesLink);

    const eventsContainer = await screen.findByRole('heading', { name: "Nos réalisations" });
    expect(eventsContainer).toBeInTheDocument(); 
  });
});