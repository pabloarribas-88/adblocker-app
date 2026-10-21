const SCREENS = [
  { file: "01-welcome.html", label: "01 Welcome" },
  { file: "02-value-proposition.html", label: "02 Value proposition" },
  { file: "03-privacy-speed.html", label: "03 Privacy and speed" },
  { file: "04-notification-preprompt.html", label: "04 Notification pre-prompt" },
  { file: "05-paywall.html", label: "05 Paywall" },
  { file: "06-web-checkout.html", label: "06 Web checkout" },
  { file: "07-post-purchase-sas.html", label: "07 Post-purchase offer – SUPERAntiSpyware" },
  { file: "08-post-purchase-vpn.html", label: "08 Post-purchase offer – iolo VPN" },
  { file: "09-purchase-confirmed.html", label: "09 Purchase confirmed" },
  { file: "10-create-account.html", label: "10 Create account" },
  { file: "11-enable-safari.html", label: "11 Enable in Safari" },
  { file: "12-activation-verified.html", label: "12 Activation verified" },
  { file: "13-cross-sell-vpn.html", label: "13 Cross-sell iolo VPN" },
  { file: "14-dashboard-protected.html", label: "14 Dashboard – protected" },
  { file: "15-dashboard-action-needed.html", label: "15 Dashboard – action needed" },
  { file: "16-settings.html", label: "16 Settings" },
  { file: "17-protection.html", label: "17 Protection" },
  { file: "18-help.html", label: "18 Help" },
];

function currentFile() {
  const path = window.location.pathname;
  return path.substring(path.lastIndexOf("/") + 1) || "01-welcome.html";
}

function buildJumpMenu() {
  const here = currentFile();

  const wrapper = document.createElement("div");
  wrapper.className = "proto-jump";

  const panel = document.createElement("div");
  panel.className = "proto-jump-panel";
  panel.id = "protoJumpPanel";

  SCREENS.forEach((screen) => {
    const link = document.createElement("a");
    link.href = screen.file;
    link.textContent = screen.label;
    if (screen.file === here) link.classList.add("current");
    panel.appendChild(link);
  });

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.setAttribute("aria-label", "Jump to screen");
  toggle.textContent = "☰";
  toggle.addEventListener("click", () => panel.classList.toggle("open"));

  wrapper.appendChild(panel);
  wrapper.appendChild(toggle);
  document.body.appendChild(wrapper);
}

function wireToggles() {
  document.querySelectorAll("[data-toggle]").forEach((el) => {
    el.addEventListener("click", () => el.classList.toggle("on"));
  });
}

function wirePlans() {
  const plans = document.querySelectorAll("[data-plan]");
  plans.forEach((plan) => {
    plan.addEventListener("click", () => {
      plans.forEach((p) => p.classList.remove("selected"));
      plan.classList.add("selected");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  buildJumpMenu();
  wireToggles();
  wirePlans();
});
