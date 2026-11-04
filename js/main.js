document.addEventListener("DOMContentLoaded", function () {
    const sidenav = document.querySelectorAll(".sidenav");
    if (window.M && sidenav.length) {
        M.Sidenav.init(sidenav);
    }

    const filterButtons = document.querySelectorAll("[data-filter]");
    const progressItems = document.querySelectorAll(".progress-item");
    const noResults = document.querySelector(".no-results");

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const filter = button.dataset.filter;
            let visibleItems = 0;

            filterButtons.forEach(function (filterButton) {
                const isActive = filterButton === button;
                filterButton.classList.toggle("active", isActive);
                filterButton.setAttribute("aria-pressed", String(isActive));
            });

            progressItems.forEach(function (item) {
                const isVisible = filter === "todos" || item.dataset.status === filter;
                item.hidden = !isVisible;
                if (isVisible) {
                    visibleItems += 1;
                }
            });

            if (noResults) {
                noResults.hidden = visibleItems > 0;
            }
        });
    });

    document.querySelectorAll("[data-toggle-details]").forEach(function (button) {
        button.addEventListener("click", function () {
            const detail = document.getElementById(button.dataset.toggleDetails);
            if (!detail) {
                return;
            }

            const isExpanded = button.getAttribute("aria-expanded") === "true";
            detail.hidden = isExpanded;
            button.setAttribute("aria-expanded", String(!isExpanded));
            button.firstChild.textContent = isExpanded ? "Ver detalle " : "Ocultar detalle ";
        });
    });
});