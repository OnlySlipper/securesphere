   
        const sampleData = {
            users: [
                { id: 1, name: "Иван Иванов", email: "ivanov@SecureSphere.ru", role: "Администратор", status: "active" },
                { id: 2, name: "Петр Петров", email: "petrov@SecureSphere.ru", role: "Менеджер", status: "active" },
                { id: 3, name: "Мария Сидорова", email: "sidorova@SecureSphere.ru", role: "Пользователь", status: "active" },
                { id: 4, name: "Анна Козлова", email: "kozlova@SecureSphere.ru", role: "Пользователь", status: "inactive" },
                { id: 5, name: "Сергей Васильев", email: "vasiliev@SecureSphere.ru", role: "Менеджер", status: "active" }
            ],
            projects: [
                { id: 1, name: "КИИ Аудит", status: "progress", description: "Аудит критической информационной инфраструктуры" },
                { id: 2, name: "Защита персональных данных", status: "completed", description: "Внедрение системы защиты ПДн" },
                { id: 3, name: "Пентест банковской системы", status: "progress", description: "Тестирование на проникновение" },
                { id: 4, name: "Мониторинг угроз", status: "paused", description: "Система мониторинга киберугроз" },
                { id: 5, name: "Обновление ИБ", status: "progress", description: "Комплексное обновление системы безопасности" }
            ],
            activities: [
                { type: "user", action: "added", target: "Алексей Петров", time: "10 минут назад", icon: "user-plus", color: "success" },
                { type: "security", action: "warning", target: "Подозрительная активность", time: "2 часа назад", icon: "exclamation-triangle", color: "warning" },
                { type: "project", action: "updated", target: "КИИ Аудит", time: "3 часа назад", icon: "project-diagram", color: "info" },
                { type: "report", action: "generated", target: "Отчет по безопасности", time: "5 часов назад", icon: "check-circle", color: "success" },
                { type: "system", action: "updated", target: "Настройки системы", time: "Вчера, 18:30", icon: "cog", color: "info" }
            ]
        };

        let currentState = {
            currentPage: 1,
            itemsPerPage: 10,
            currentSort: { column: null, direction: 'asc' }
        };

        document.addEventListener('DOMContentLoaded', function() {
            initializeAdminPanel();
        });

        function initializeAdminPanel() {
            initializeTheme();
            loadDashboard();
            loadUsers();
            loadProjects();
            initializeMobileMenu();
        }

        function initializeTheme() {
            const themeToggle = document.getElementById('theme-toggle');
            const currentTheme = localStorage.getItem('theme') || 'light';
            
            if (currentTheme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'dark');
                themeToggle.checked = true;
            }
            
            themeToggle.addEventListener('change', function() {
                if (this.checked) {
                    document.documentElement.setAttribute('data-theme', 'dark');
                    localStorage.setItem('theme', 'dark');
                } else {
                    document.documentElement.setAttribute('data-theme', 'light');
                    localStorage.setItem('theme', 'light');
                }
            });
        }

        function initializeMobileMenu() {
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            mobileMenuBtn.addEventListener('click', function() {
                alert('Мобильное меню будет реализовано в полной версии');
            });
        }

        function showSection(sectionId) {

            document.querySelectorAll('.content-section').forEach(section => {
                section.classList.remove('active');
            });

            document.querySelectorAll('.menu-item').forEach(item => {
                item.classList.remove('active');
            });

            document.getElementById(sectionId).classList.add('active');

            const menuItem = document.querySelector(`.menu-item[onclick="showSection('${sectionId}')"]`);
            if (menuItem) {
                menuItem.classList.add('active');
            }

            if (sectionId === 'dashboard-content') {
                loadDashboard();
            } else if (sectionId === 'users-content') {
                loadUsers();
            } else if (sectionId === 'projects-content') {
                loadProjects();
            }
        }

        function loadDashboard() {
            loadRecentActivities();
        }

        function loadRecentActivities() {
            const container = document.getElementById('recent-activities');
            container.innerHTML = '';
            
            sampleData.activities.forEach(activity => {
                const activityItem = document.createElement('div');
                activityItem.className = 'activity-item';
                activityItem.innerHTML = `
                    <div class="activity-icon ${activity.color}">
                        <i class="fas fa-${activity.icon}"></i>
                    </div>
                    <div class="activity-content">
                        <p>${getActivityText(activity)}</p>
                        <span class="activity-time">${activity.time}</span>
                    </div>
                `;
                container.appendChild(activityItem);
            });
        }

        function getActivityText(activity) {
            switch (activity.type) {
                case 'user':
                    return `Новый пользователь <strong>${activity.target}</strong> ${activity.action === 'added' ? 'добавлен' : 'удален'}`;
                case 'project':
                    return `Проект <strong>"${activity.target}"</strong> ${activity.action === 'updated' ? 'обновлен' : 'создан'}`;
                case 'security':
                    return `Обнаружена ${activity.target}`;
                case 'report':
                    return `Отчет <strong>"${activity.target}"</strong> сгенерирован`;
                case 'system':
                    return `Настройки системы ${activity.action === 'updated' ? 'обновлены' : 'изменены'}`;
                default:
                    return `${activity.action} ${activity.target}`;
            }
        }

        function loadUsers() {
            const container = document.getElementById('users-table-body');
            container.innerHTML = '';
            
            sampleData.users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.role}</td>
                    <td><span class="status ${user.status}">${user.status === 'active' ? 'Активен' : 'Неактивен'}</span></td>
                    <td>
                        <button class="btn-icon" onclick="editUser(${user.id})"><i class="fas fa-edit"></i></button>
                        <button class="btn-icon danger" onclick="deleteUser(${user.id})"><i class="fas fa-trash"></i></button>
                    </td>
                `;
                container.appendChild(row);
            });
            
            updatePagination();
        }

        function loadProjects() {
            const container = document.getElementById('projects-container');
            container.innerHTML = '';
            
            sampleData.projects.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';
                projectCard.innerHTML = `
                    <h4>${project.name}</h4>
                    <p>${project.description}</p>
                    <div class="project-status ${getStatusClass(project.status)}">${getStatusText(project.status)}</div>
                    <div style="margin-top: 15px;">
                        <button class="btn-icon" onclick="editProject(${project.id})"><i class="fas fa-edit"></i></button>
                        <button class="btn-icon danger" onclick="deleteProject(${project.id})"><i class="fas fa-trash"></i></button>
                    </div>
                `;
                container.appendChild(projectCard);
            });
        }

        function getStatusClass(status) {
            switch (status) {
                case 'completed': return 'status-completed';
                case 'progress': return 'status-progress';
                case 'paused': return 'status-paused';
                default: return '';
            }
        }

        function getStatusText(status) {
            switch (status) {
                case 'completed': return 'Завершен';
                case 'progress': return 'В работе';
                case 'paused': return 'На паузе';
                default: return status;
            }
        }

        function filterUsers() {
            const searchTerm = document.getElementById('user-search').value.toLowerCase();
            const roleFilter = document.getElementById('role-filter').value.toLowerCase();
            const rows = document.querySelectorAll('#users-table-body tr');
            
            rows.forEach(row => {
                const name = row.cells[1].textContent.toLowerCase();
                const email = row.cells[2].textContent.toLowerCase();
                const role = row.cells[3].textContent.toLowerCase();
                const matchesSearch = name.includes(searchTerm) || email.includes(searchTerm);
                const matchesRole = !roleFilter || role.includes(roleFilter);
                
                row.style.display = (matchesSearch && matchesRole) ? '' : 'none';
            });
        }

        function filterProjects() {
            const searchTerm = document.getElementById('project-search').value.toLowerCase();
            const statusFilter = document.getElementById('status-filter').value;
            const projects = document.querySelectorAll('.project-card');
            
            projects.forEach((project, index) => {
                const name = project.querySelector('h4').textContent.toLowerCase();
                const description = project.querySelector('p').textContent.toLowerCase();
                const status = sampleData.projects[index].status;
                const matchesSearch = name.includes(searchTerm) || description.includes(searchTerm);
                const matchesStatus = !statusFilter || status === statusFilter;
                
                project.style.display = (matchesSearch && matchesStatus) ? '' : 'none';
            });
        }

        function filterDashboard() {
            const filterValue = document.getElementById('time-filter').value;
            showNotification(`Фильтр применен: ${filterValue}`, 'info');
            loadRecentActivities();
        }

        function sortTable(tableId, columnIndex) {
            const table = document.getElementById(tableId);
            const tbody = table.querySelector('tbody');
            const rows = Array.from(tbody.querySelectorAll('tr'));
            const header = table.querySelectorAll('th')[columnIndex];

            const isAscending = header.classList.contains('sort-asc');
            const direction = isAscending ? -1 : 1;

            table.querySelectorAll('th').forEach(th => {
                th.classList.remove('sort-asc', 'sort-desc');
            });
            header.classList.add(isAscending ? 'sort-desc' : 'sort-asc');
 
            rows.sort((a, b) => {
                let aValue = a.cells[columnIndex].textContent;
                let bValue = b.cells[columnIndex].textContent;
                

                if (columnIndex === 0) {
                    aValue = parseInt(aValue);
                    bValue = parseInt(bValue);
                }
                
                if (aValue < bValue) return -1 * direction;
                if (aValue > bValue) return 1 * direction;
                return 0;
            });

            rows.forEach(row => tbody.appendChild(row));
        }

        function updatePagination() {
            document.getElementById('current-page').textContent = currentState.currentPage;
            document.getElementById('total-pages').textContent = Math.ceil(sampleData.users.length / currentState.itemsPerPage);
        }

        function changePage(direction) {
            const totalPages = Math.ceil(sampleData.users.length / currentState.itemsPerPage);
            
            if (direction === 'prev' && currentState.currentPage > 1) {
                currentState.currentPage--;
            } else if (direction === 'next' && currentState.currentPage < totalPages) {
                currentState.currentPage++;
            }
            
            updatePagination();
            loadUsers();
        }

        function addUser() {
            const name = prompt('Введите имя нового пользователя:');
            if (name) {
                const newUser = {
                    id: sampleData.users.length + 1,
                    name: name,
                    email: `${name.toLowerCase().replace(' ', '.')}@SecureSphere.ru`,
                    role: 'Пользователь',
                    status: 'active'
                };
                sampleData.users.push(newUser);

                sampleData.activities.unshift({
                    type: 'user',
                    action: 'added',
                    target: name,
                    time: 'Только что',
                    icon: 'user-plus',
                    color: 'success'
                });
                
                document.getElementById('users-count').textContent = sampleData.users.length;
                
                loadUsers();
                showNotification(`Пользователь ${name} добавлен`, 'success');
            }
        }

        function editUser(userId) {
            const user = sampleData.users.find(u => u.id === userId);
            if (user) {
                const newName = prompt('Введите новое имя:', user.name);
                if (newName) {
                    user.name = newName;
                    loadUsers();
                    showNotification('Пользователь обновлен', 'success');
                }
            }
        }

        function deleteUser(userId) {
            if (confirm('Вы уверены, что хотите удалить этого пользователя?')) {
                const userIndex = sampleData.users.findIndex(u => u.id === userId);
                if (userIndex !== -1) {
                    const userName = sampleData.users[userIndex].name;
                    sampleData.users.splice(userIndex, 1);
                    
                    document.getElementById('users-count').textContent = sampleData.users.length;
                    
                    loadUsers();
                    showNotification(`Пользователь ${userName} удален`, 'success');
                }
            }
        }

        function createProject() {
            const name = prompt('Введите название нового проекта:');
            if (name) {
                const newProject = {
                    id: sampleData.projects.length + 1,
                    name: name,
                    status: 'progress',
                    description: 'Новый проект'
                };
                sampleData.projects.push(newProject);
                
                sampleData.activities.unshift({
                    type: 'project',
                    action: 'created',
                    target: name,
                    time: 'Только что',
                    icon: 'project-diagram',
                    color: 'info'
                });

                document.getElementById('projects-count').textContent = sampleData.projects.length;
                
                loadProjects();
                showNotification(`Проект ${name} создан`, 'success');
            }
        }

        function editProject(projectId) {
            const project = sampleData.projects.find(p => p.id === projectId);
            if (project) {
                const newName = prompt('Введите новое название проекта:', project.name);
                if (newName) {
                    project.name = newName;
                    loadProjects();
                    showNotification('Проект обновлен', 'success');
                }
            }
        }

        function deleteProject(projectId) {
            if (confirm('Вы уверены, что хотите удалить этот проект?')) {
                const projectIndex = sampleData.projects.findIndex(p => p.id === projectId);
                if (projectIndex !== -1) {
                    const projectName = sampleData.projects[projectIndex].name;
                    sampleData.projects.splice(projectIndex, 1);
                    
                    document.getElementById('projects-count').textContent = sampleData.projects.length;
                    
                    loadProjects();
                    showNotification(`Проект ${projectName} удален`, 'success');
                }
            }
        }

        function generateReport(type = 'general') {
            const reportTypes = {
                'security': 'Отчет по безопасности',
                'performance': 'Отчет по производительности',
                'users': 'Отчет по пользователям',
                'projects': 'Отчет по проектам',
                'general': 'Общий отчет'
            };
            
            showNotification(`Генерация ${reportTypes[type]}...`, 'info');
            
            setTimeout(() => {
                showNotification(`${reportTypes[type]} готов к скачиванию`, 'success');

                const link = document.createElement('a');
                link.download = `${reportTypes[type]}.pdf`;
                link.href = '#';
                link.click();
            }, 1500);
        }

        function systemCheck() {
            showNotification('Проверка системы...', 'info');
            
            setTimeout(() => {
                showNotification('Проверка завершена. Система в норме.', 'success');
            }, 2000);
        }

        function backupSystem() {
            showNotification('Создание резервной копии...', 'info');
            
            setTimeout(() => {
                showNotification('Резервная копия создана успешно', 'success');
            }, 2000);
        }

        function changeTheme(theme) {
            if (theme === 'auto') {
                theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            }
            
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            document.getElementById('theme-toggle').checked = theme === 'dark';
            
            showNotification(`Тема изменена на ${theme === 'dark' ? 'темную' : 'светлую'}`, 'success');
        }

        function toggleSetting(setting) {
            const option = document.querySelector(`.setting-option[onclick="toggleSetting('${setting}')"]`);
            option.classList.toggle('active');
            showNotification(`Настройка ${setting} ${option.classList.contains('active') ? 'включена' : 'выключена'}`, 'info');
        }

        function handleLogout() {
            if (confirm('Вы уверены, что хотите выйти?')) {
                showNotification('Выход из системы...', 'info');
                setTimeout(() => {
                    alert('В реальном приложении здесь был бы выход из системы');
                }, 1000);
            }
        }

        function showNotification(message, type = 'info') {

            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.innerHTML = `
                <i class="fas fa-${type === 'success' ? 'check-circle' : 
                                  type === 'error' ? 'exclamation-circle' : 
                                  type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
                <span>${message}</span>
                <button onclick="this.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            `;
            
            document.body.appendChild(notification);

            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 3000);
        }