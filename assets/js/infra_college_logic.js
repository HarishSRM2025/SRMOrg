        let currentDept = null;

        document.addEventListener('DOMContentLoaded', function() {
            renderSidebar();
            showDept(depts[0].id);
        });

        function renderSidebar() {
            const menu = document.getElementById('sidebarMenu');
            menu.innerHTML = depts.map(d => `
                <li>
                    <a href="#${d.id}" onclick="showDept('${d.id}');">
                    ${d.name}
                    </a>
                </li>
            `).join('');
        }

        function showDept(id) {
            const d = depts.find(x => x.id === id);
            if (!d) return;
            
            currentDept = id;
            
            const det = document.getElementById('departmentDetail');
            det.classList.remove('hidden');
            det.classList.add('active');
            
            updateSidebarActive(id);
            renderDetail(d);
        }

        function updateSidebarActive(id) {
            document.querySelectorAll('.sidebar-nav a').forEach(a => a.classList.remove('active'));
            const d = depts.find(x => x.id === id);
            if (d) {
                document.querySelectorAll('.sidebar-nav a').forEach(a => {
                    if (a.textContent.trim().includes(d.name)) a.classList.add('active');
                });
            }
        }

        function renderDetail(d) {

            // Update global CSS variables
            document.documentElement.style.setProperty('--dept-color', d.color);
            document.documentElement.style.setProperty('--dept-color-dark', d.colorDark);

            const container = document.getElementById('departmentDetail');

            let html = `
                <div class="tabs-content-wrapper" style="margin-top:.5rem;">
                    <div class="tabs-nav">
                        <button class="tab-button active" onclick="switchTab(event, 'overview-${d.id}')">Overview</button>
                        <button class="tab-button" onclick="switchTab(event, 'departments-${d.id}')">Departments</button>
                        <button class="tab-button" onclick="switchTab(event, 'infrastructure-${d.id}')">Infrastructure</button>
                        <button class="tab-button" onclick="switchTab(event, 'campus_highlights-${d.id}')">Campus Highlights</button>
                        <a class="tab-button" href='${d.href}' target='_blank' style='background:${d.color};color:white;text-decoration:none;'>Visit Our Website</a>
                    </div>

                    <div id="overview-${d.id}" class="tab-content active">
                        ${d.overview ? 
                            `
                            <h2>Overview</h2>
                            <p>${d.overview["desc"]}</p>
                            <br>
                            <hr>
                            <br>
                            <h3>Vision</h3>
                            <p>${d.overview["our_vision"]}</p>
                            <br>
                            <hr>
                            <br>
                            <h3>Mission</h3>
                            <p>${d.overview["our_mission"]}</p>
                            ` : 
                            
                        ""}
                    </div>

                    <div id="departments-${d.id}" class="tab-content">
                        <h3>UG Departments</h3>
                        <ul>
                            ${(d.departments["undergraduate_programs"] || [])
                                .map(e => `<li>${e}</li>`).join('')}
                        </ul>

                        <br><hr><br>

                        <h3>PG Departments</h3>
                        <ul>
                            ${(d.departments["postgraduate_programs"] || [])
                                .map(e => `<li>${e}</li>`).join('')}
                        </ul>
                    </div>

                    <div id="infrastructure-${d.id}" class="tab-content">
                        <ul>
                            ${(d.infrastructure || []).map(i => `<li>${i}</li>`).join('')}
                        </ul>
                    </div>

                    <div id="campus_highlights-${d.id}" class="tab-content">
                        <div class="stats-grid">
                            ${(d.campus_highlights || [])
                                .map(s => 
                                `<div class="stat-card">
                                    <h4>${s.value}</h4>
                                    <p>${s.label}</p>
                                </div>`).join('')}
                        </div>
                    </div>
                </div>
            `;

            container.innerHTML = html;
        }
        

        function toggleAccordion(header) {
            const isActive = header.classList.contains('active');
            
            // Close all accordions (including publications)
            document.querySelectorAll('.accordion-header, .tabs-header').forEach(h => {
                h.classList.remove('active');
                h.nextElementSibling.classList.remove('active');
            });
            
            // If the clicked accordion wasn't active, open it
            if (!isActive) {
                header.classList.add('active');
                header.nextElementSibling.classList.add('active');
            }
        }

        function switchTab(event, tabId) {
            const container = event.target.closest('.tabs-content-wrapper');
            container.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
            container.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            event.target.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        }

        