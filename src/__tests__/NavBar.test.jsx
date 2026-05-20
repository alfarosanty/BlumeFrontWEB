import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../components/NavBar';

// Mock child components that have their own context/service dependencies
vi.mock('../components/UserMenu', () => ({
  default: () => <div data-testid="user-menu" />,
}));

vi.mock('../components/Buscador', () => ({
  default: ({ onToggle }) => <div data-testid="buscador" />,
}));

// Mock services
vi.mock('../services/SectorService', () => ({
  SectorService: {
    getVisiblesWeb: vi.fn().mockResolvedValue([
      { id: 10, descripcion: 'Flores' },
      { id: 20, descripcion: 'Plantas' },
    ]),
  },
}));

vi.mock('../services/FamiliaService', () => ({
  FamiliaService: {
    getPorSector: vi.fn(),
  },
}));

// Mock contexts
vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    user: { username: 'testuser' },
    isAuthenticated: true,
  }),
}));

vi.mock('../context/CartContext', () => ({
  useCart: () => ({
    totalItems: 0,
    openCart: vi.fn(),
  }),
}));

import { FamiliaService } from '../services/FamiliaService';

const renderNavbar = () =>
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

describe('Navbar — familias por sector', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('T7: click en sector llama FamiliaService.getPorSector con el id correcto', async () => {
    FamiliaService.getPorSector.mockResolvedValue([
      { id: 1, descripcion: 'Rosas' },
    ]);

    renderNavbar();

    // Wait for sectors to load
    const chevron = await screen.findByLabelText('Expandir Flores');

    await act(async () => {
      fireEvent.click(chevron);
    });

    expect(FamiliaService.getPorSector).toHaveBeenCalledTimes(1);
    expect(FamiliaService.getPorSector).toHaveBeenCalledWith(10);
  });

  it('T8: sector ya cargado no vuelve a llamar a FamiliaService.getPorSector', async () => {
    FamiliaService.getPorSector.mockResolvedValue([
      { id: 1, descripcion: 'Rosas' },
    ]);

    renderNavbar();

    const chevron = await screen.findByLabelText('Expandir Flores');

    // First click: loads data
    await act(async () => {
      fireEvent.click(chevron);
    });

    expect(FamiliaService.getPorSector).toHaveBeenCalledTimes(1);

    // Close the sector (second click collapses it)
    await act(async () => {
      fireEvent.click(chevron);
    });

    // Third click: sector already cached, must not call service again
    await act(async () => {
      fireEvent.click(chevron);
    });

    expect(FamiliaService.getPorSector).toHaveBeenCalledTimes(1);
  });

  it('T9 – error en servicio: spinner visible durante carga y ausente tras rechazo', async () => {
    // 1. Crea una promesa que podemos rechazar manualmente
    let rejectFn;
    const deferred = new Promise((_, reject) => { rejectFn = reject; });
    FamiliaService.getPorSector.mockReturnValue(deferred);

    // 2. Renderiza y dispara el click
    renderNavbar();
    const chevron = await screen.findByLabelText('Expandir Flores');

    await act(async () => {
      fireEvent.click(chevron);
    });

    // 3. Afirma que el spinner ES visible (promesa todavía pendiente)
    expect(screen.getByLabelText('Cargando familias')).toBeInTheDocument();

    // 4. Rechaza la promesa
    await act(async () => { rejectFn(new Error('network error')); });

    // 5. Afirma que el spinner ya NO está
    expect(screen.queryByLabelText('Cargando familias')).not.toBeInTheDocument();
  });
});
