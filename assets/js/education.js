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
                // Close
                panel.style.maxHeight = panel.scrollHeight + 'px';
                requestAnimationFrame(() => {
                    panel.style.maxHeight = '0px';
                });
                panel.classList.remove('open');
                btn.classList.remove('active');
                btn.querySelector('.btn-text').textContent = 'View Marks';
            } else {
                // Open
                panel.classList.add('open');
                btn.classList.add('active');
                btn.querySelector('.btn-text').textContent = 'Hide Marks';
                panel.style.maxHeight = panel.scrollHeight + 'px';

                // Animate progress bars and chart bars after opening
                setTimeout(() => {
                    animateProgressBars(panel);
                    animateChartBars(panel);
                }, 100);

                // Remove max-height constraint after animation to allow inner accordions
                panel.addEventListener('transitionend', function handler() {
                    if (panel.classList.contains('open')) {
                        panel.style.maxHeight = 'none';
                    }
                    panel.removeEventListener('transitionend', handler);
                });
            }
        });
    });

    // ---- Semester Accordion ----
    const semesterHeaders = document.querySelectorAll('.edu-semester-header');
    semesterHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const semester = header.closest('.edu-semester');
            const body = semester.querySelector('.edu-semester-body');
            const isOpen = semester.classList.contains('open');

            if (isOpen) {
                // Close
                body.style.maxHeight = body.scrollHeight + 'px';
                requestAnimationFrame(() => {
                    body.style.maxHeight = '0px';
                });
                semester.classList.remove('open');
            } else {
                // Close siblings first
                const siblings = semester.parentElement.querySelectorAll('.edu-semester.open');
                siblings.forEach(sib => {
                    if (sib !== semester) {
                        const sibBody = sib.querySelector('.edu-semester-body');
                        sibBody.style.maxHeight = sibBody.scrollHeight + 'px';
                        requestAnimationFrame(() => {
                            sibBody.style.maxHeight = '0px';
                        });
                        sib.classList.remove('open');
                    }
                });

                // Open this one
                semester.classList.add('open');
                body.style.maxHeight = body.scrollHeight + 'px';

                // Animate progress bars inside this semester
                setTimeout(() => {
                    animateProgressBars(body);
                }, 100);

                body.addEventListener('transitionend', function handler() {
                    if (semester.classList.contains('open')) {
                        body.style.maxHeight = 'none';
                    }
                    body.removeEventListener('transitionend', handler);
                });
            }
        });
    });

    // ---- Animate Progress Bars ----
    function animateProgressBars(container) {
        const fills = container.querySelectorAll('.edu-progress-fill, .edu-subject-card-fill');
        fills.forEach(fill => {
            const target = fill.getAttribute('data-width');
            if (target) {
                fill.style.width = target + '%';
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
