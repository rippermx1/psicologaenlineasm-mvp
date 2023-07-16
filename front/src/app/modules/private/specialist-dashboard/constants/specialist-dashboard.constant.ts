export const SPECIALIST_DASHBOARD_ROUTES: SpecialistDashboardRoute[] = [
  { icon: 'home', path: 'meets', name: 'Citas' },
  { icon: 'home', path: 'patients', name: 'Pacientes' },
  { icon: 'home', path: 'schedule', name: 'Agenda' },
  { icon: 'home', path: 'profile', name: 'Perfil' },
];

interface SpecialistDashboardRoute {
  icon?: string;
  path: string;
  name: string;
}
