import * as React from 'react';
import { PaletteMode, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ToggleColorMode from './ToggleColorMode';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

import Sitemark from './SitemarkIcon';
import Link from 'next/link';

interface AppAppBarProps {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

export default function AppAppBar({ mode, toggleColorMode }: AppAppBarProps) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
      setOpen(false);
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 2,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          variant="regular"
          sx={(theme) => ({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
            borderRadius: '999px',
            bgcolor: theme.palette.mode === 'light' ? 'hsla(220, 60%, 99%, 0.6)' : 'hsla(220, 0%, 0%, 0.7)',
            backdropFilter: 'blur(24px)',
            maxHeight: 40,
            border: '1px solid',
            borderColor: 'divider',
            boxShadow:
              theme.palette.mode === 'light'
                ? '0 1px 2px hsla(210, 0%, 0%, 0.05), 0 2px 12px hsla(210, 100%, 80%, 0.5)'
                : '0 1px 2px hsla(210, 0%, 0%, 0.5), 0 2px 12px hsla(210, 100%, 25%, 0.3)',
          })}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              px: 0,
            }}
          >
            <AssignmentTurnedInIcon htmlColor="#026bd4" />
            <Typography fontWeight={700} color="#026bd4">
              Raison App {'|'}
            </Typography>

            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Link href="/dashboard">
                <Button variant="text" color="info" size="small" onClick={() => null}>
                  Dashboard
                </Button>
              </Link>
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Link href="/estabelecimento">
                <Button variant="text" color="info" size="small" onClick={() => null}>
                  Estabelecimento
                </Button>
              </Link>
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button variant="text" color="info" size="small" onClick={() => null}>
                Usuários
              </Button>
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Link href="/anuncios">
                <Button variant="text" color="info" size="small">
                  Anúncios
                </Button>
              </Link>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 0.5,
              alignItems: 'center',
            }}
          >
            <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
          </Box>
          <Box sx={{ display: { sm: 'flex', md: 'none' } }}>
            <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
              <Box
                sx={{
                  p: 2,
                  backgroundColor: 'background.default',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <Divider sx={{ my: 3 }} />
                <MenuItem onClick={() => null}>Dashboard</MenuItem>
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
