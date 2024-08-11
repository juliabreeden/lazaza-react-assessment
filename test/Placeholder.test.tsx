import { render, screen, fireEvent } from "@testing-library/react";
import Settings from "../src/components/Settings";

test("updates settings and starts game", () => {
  const handleSettingsUpdate = jest.fn();
  render(<Settings onSettingsUpdate={handleSettingsUpdate} />);
  
  fireEvent.click(screen.getByRole('button', { name: /Apply Settings/ }));
  expect(handleSettingsUpdate).toHaveBeenCalled();
});




