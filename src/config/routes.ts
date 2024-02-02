export const routes = {
  login: { path: '/login' },

  home: { path: '/' },
  settings: { path: 'settings' },
  clients: {
    createPath: (client_id: string = ':client_id') => `${client_id}`,
    path: 'clients',
  },
}
