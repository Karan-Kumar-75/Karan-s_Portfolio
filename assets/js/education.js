/* ============================================
   EDUCATION — INTERACTIVE MARKS SYSTEM
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---- View Marks Toggle ----
    const viewMarksBtns = document.querySelectorAll('.edu-view-marks-btn');
    viewMarksBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const panel = btn.closest('.edu-card').querySelector('.edu-marks-panel');
            const isOpen = panel.classList.contains('open');

            if (isOpen) {
                panel.style.maxHeight = panel.scrollHeight + 'px';
                requestAnimationFrame(() => {
                    panel.style.maxHeight = '0px';
                });
                panel.classList.remove('open');
                btn.classList.remove('active');
                btn.querySelector('.btn-text').textContent = 'View Detailed Marks';
                btn.setAttribute('aria-expanded', 'false');
            } else {
                panel.classList.add('open');
                btn.classList.add('active');
                btn.querySelector('.btn-text').textContent = 'Hide Marks';
                btn.setAttribute('aria-expanded', 'true');
                panel.style.maxHeight = panel.scrollHeight + 'px';

                setTimeout(() => {
                    animateProgressBars(panel);
                    animateChartBars(panel);
                }, 100);

                panel.addEventListener('transitionend', function handler() {
                    if (panel.classList.contains('open')) {
                        panel.style.maxHeight = 'none';
                    }
                    panel.removeEventListener('transitionend', handler);
                });
            }
        });
    });

    // ---- Semester Tabs ----
    const tabBtns = document.querySelectorAll('.edu-tab');
    const tabPanels = document.querySelectorAll('.edu-semester-panel');

    tabBtns.forEach(tab => {
        tab.addEventListener('click', () => {
            const sem = tab.getAttribute('data-sem');

            // Update tab states
            tabBtns.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');

            // Update panel states
            tabPanels.forEach(p => p.classList.remove('active'));
            const targetPanel = document.querySelector(`.edu-semester-panel[data-sem="${sem}"]`);
            if (targetPanel) {
                targetPanel.classList.add('active');
                // Animate progress bars in the new panel
                setTimeout(() => animateProgressBars(targetPanel), 50);
            }

            // Clear search when switching tabs
            const searchInput = document.getElementById('edu-subject-search');
            if (searchInput && searchInput.value) {
                searchInput.value = '';
                clearSearch();
            }
        });
    });

    // ---- Subject Search ----
    const searchInput = document.getElementById('edu-subject-search');
    const searchClear = document.getElementById('edu-search-clear');
    const noResults = document.getElementById('edu-no-results');

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const query = searchInput.value.trim().toLowerCase();

            // Toggle clear button visibility
            if (searchClear) {
                searchClear.classList.toggle('visible', query.length > 0);
            }

            if (query.length === 0) {
                clearSearch();
                return;
            }

            // Search across ALL semester panels
            let totalMatches = 0;
            let matchedSemester = null;

            tabPanels.forEach(panel => {
                const rows = panel.querySelectorAll('.edu-marks-table tbody tr');
                let panelMatches = 0;

                rows.forEach(row => {
                    const subjectCell = row.querySelector('td:first-child');
                    if (!subjectCell) return;

                    const text = subjectCell.textContent.toLowerCase();
                    if (text.includes(query)) {
                        row.classList.remove('search-hidden');
                        row.classList.add('search-highlight');
                        panelMatches++;
                        totalMatches++;
                        if (!matchedSemester) matchedSemester = panel.getAttribute('data-sem');
                    } else {
                        row.classList.add('search-hidden');
                        row.classList.remove('search-highlight');
                    }
                });
            });

            // Switch to the first matching semester tab
            if (matchedSemester) {
                const matchTab = document.querySelector(`.edu-tab[data-sem="${matchedSemester}"]`);
                if (matchTab && !matchTab.classList.contains('active')) {
                    matchTab.click();
                    // Re-apply search after tab switch
                    setTimeout(() => {
                        tabPanels.forEach(panel => {
                            const rows = panel.querySelectorAll('.edu-marks-table tbody tr');
                            rows.forEach(row => {
                                const subjectCell = row.querySelector('td:first-child');
                                if (!subjectCell) return;
                                const text = subjectCell.textContent.toLowerCase();
                                if (text.includes(query)) {
                                    row.classList.remove('search-hidden');
                                    row.classList.add('search-highlight');
                                } else {
                                    row.classList.add('search-hidden');
                                    row.classList.remove('search-highlight');
                                }
                            });
                        });
                    }, 50);
                }
            }

            // Show/hide no results message
            if (noResults) {
                noResults.style.display = totalMatches === 0 ? 'block' : 'none';
            }
        });

        if (searchClear) {
            searchClear.addEventListener('click', () => {
                searchInput.value = '';
                searchClear.classList.remove('visible');
                clearSearch();
                searchInput.focus();
            });
        }
    }

    function clearSearch() {
        const allRows = document.querySelectorAll('.edu-marks-table tbody tr');
        allRows.forEach(row => {
            row.classList.remove('search-hidden', 'search-highlight');
        });
        if (noResults) noResults.style.display = 'none';
    }

    // ---- PDF Download (Print) ----
    const downloadBtn = document.getElementById('btn-download-marksheet');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            // Ensure all panels are visible for print
            const panels = document.querySelectorAll('.edu-semester-panel');
            panels.forEach(p => p.classList.add('active'));

            // Ensure marks panel is open
            const marksPanel = document.getElementById('panel-diploma');
            if (marksPanel) {
                marksPanel.classList.add('open');
                marksPanel.style.maxHeight = 'none';
                marksPanel.style.opacity = '1';
            }

            // Set print widths for progress bars
            const fills = document.querySelectorAll('.edu-progress-fill');
            fills.forEach(fill => {
                const w = fill.getAttribute('data-width');
                if (w) fill.style.setProperty('--print-width', w + '%');
            });

            window.print();

            // Restore tab state after print
            setTimeout(() => {
                panels.forEach(p => p.classList.remove('active'));
                const activeTab = document.querySelector('.edu-tab.active');
                if (activeTab) {
                    const activeSem = activeTab.getAttribute('data-sem');
                    const activePanel = document.querySelector(`.edu-semester-panel[data-sem="${activeSem}"]`);
                    if (activePanel) activePanel.classList.add('active');
                }
            }, 500);
        });
    }

    // ---- Animate Progress Bars ----
    function animateProgressBars(container) {
        const fills = container.querySelectorAll('.edu-progress-fill, .edu-subject-card-fill');
        fills.forEach((fill, i) => {
            const target = fill.getAttribute('data-width');
            if (target) {
                setTimeout(() => {
                    fill.style.width = target + '%';
                }, i * 30);
            }
        });
    }

    // ---- Animate Chart Bars ----
    function animateChartBars(container) {
        const bars = container.querySelectorAll('.edu-chart-bar');
        bars.forEach((bar, index) => {
            const target = bar.getAttribute('data-height');
            if (target) {
                setTimeout(() => {
                    bar.style.height = target + '%';
                }, index * 80);
            }
        });
    }
});
