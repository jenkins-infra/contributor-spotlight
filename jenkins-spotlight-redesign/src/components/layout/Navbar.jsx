
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function Navbar(){

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
const [activeMenu, setActiveMenu] = React.useState(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);

const toggleMobileMenu = () => {
  setMobileOpen(!mobileOpen);
};
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleMouseEnter = (event, label) => {
  setAnchorEl(event.currentTarget);
  setActiveMenu(label);
};

const handleMouseLeave = () => {
  setAnchorEl(null);
  setActiveMenu(null);
};

    const navLinks = [
        {label :"Blog", to:"https://www.jenkins.io/blog/"},
        {label :"Success Stories", to:"https://stories.jenkins.io/"},
        {label :"Contributor Spotlight", to:"https://contributors.jenkins.io/"},
        {label :"Documentation", to:"",
          dropdown: [
                { label: "User Guide", header: true },
                { label: "- Installing Jenkins" },
                { label: "- Jenkins Pipeline" },
                { label: "- Managing Jenkins" },
                { label: "- Securing Jenkins" },
                { label: "- System Administration" },
                { label: "- Troubleshooting Jenkins" },
                { label: "- Terms and Definitions" },
                { divider: true },
                { label: "Solution Pages", header: true },
                { label: "Tutorials", header: true },
                { label: "Developer Guide", header: true },
                { label: "Contributor Guide", header: true },
                { label: "Books", header: true },
       ],},
        {label :"Plugin", to:"https://plugins.jenkins.io/"},
        {label :"Community", to:"" , dropdown:[
                 { label: "Overview" },
                  { label: "Chat" },
                  { label: "Meet" },
                  { label: "Events" },
                  { label: "Forum" },
                  { label: "Issue Tracker" },
                  { label: "Mailing Lists" },
                  { label: "Roadmap" },
                  { label: "Account Management" },
                  { divider: true },
                  { label: "Special Interest Groups", header: true },
                  { label: "- Advocacy and Outreach" },
                  { label: "- Documentation" },
                  { label: "- Google Summer of Code" },
                  { label: "- Platform" },
        ]},
        {label :"Subprojects", to:"",
          dropdown: [
                  { label: "Overview" },
                  { label: "Google Summer of Code in Jenkins" },
                  { label: "Infrastructure" },
                  { label: "CI/CD and Jenkins Area Meetups" },
                  { label: "Jenkins Configuration as Code" },
                  { label: "Jenkins Operator" },
                  { label: "Jenkins Remoting" },
                  { label: "Document Jenkins on Kubernetes" },
                ],
        },
        {label :"Security", to:"",
                  dropdown: [
                   { label: "Overview" },
                   { label: "Security Advisories" },
                   { label: "Reporting Vulnerabilities" },
                 ],
        },
        {label :"About", to:"",
                      dropdown: [
                    { label: "Roadmap" },
                    { label: "Press" },
                    { label: "Awards" },
                    { label: "Conduct" },
                    { label: "Artwork" },
                  ],
        },
        {label :"Support", to:"https://www.jenkins.io/support/"},
        {label :"Download", to:"https://www.jenkins.io/download/"}
    ]
    return(

    <AppBar position="sticky"  sx={{  backgroundColor: '#212529', width: "100%", top: 0}}>
        <Toolbar disableGutters sx={{ px: 3 }}>
          <Typography
            variant="h5"
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontWeight: 700,
              letterSpacing: "0",
              color: "#fff",
              textDecoration: "none"
            }}
          >
            Jenkins
          </Typography>
          
      {/* Mobile version */}
         <Typography
            variant="h6"
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontWeight: 700,
              letterSpacing: "0",
              color: "#fff",
              textDecoration: "none"
            }}
          >
            Jenkins
          </Typography>

        {/* Desktop view */}
         <Box sx={{ ml: 'auto', display: { xs: 'none', md: "flex" } ,
           alignItems: "center" }}>
          {navLinks.map((link) => (
            <Box
              key={link.label}
            >
              {link.dropdown ? (
                <>
                  {/* Button with Arrow */}
                  <Button
                  onClick={(e)=>{handleMouseEnter(e,link.label)}}
                    endIcon={<KeyboardArrowDownIcon />}
                    sx={{
                        background: link.label === "Contributor Spotlight" ? "#0070EB":"transparent",
                        py:1,
                        color:'white',
                        '&:hover': {
                                background: link.label === "Contributor Spotlight" ? "#0070EB":"transparent",  textDecoration: "underline",
                                textUnderlineOffset: "6px"} 
                       }}
                  >
                    {link.label}
                  </Button>
        
                  {/* Dropdown Menu */}
                  <Menu
                    anchorEl={anchorEl}
                    open={activeMenu === link.label}
                    onClose={()=>{setAnchorEl(null);
                      setActiveMenu(null);
                    }
                    }
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    transformOrigin={{ vertical: "top", horizontal: "left" }}
                  >
                    {link.dropdown.map((item, index) => (
                      <MenuItem key={index}
                       onClick={()=>{
                        setAnchorEl(null);
                        setActiveMenu(null);
                        setMobileOpen(false);
                       }}
                      >
                        {item.label}
                      </MenuItem>
                    ))}
                  </Menu>
                </>
        
              ) : (
        
                <Button
                  href={link.to}
                    sx={{ color: "white", background: link.label === "Contributor Spotlight" ? "#0070EB":"transparent",justifyContent: "center",'&:hover': {
                                background: link.label === "Contributor Spotlight" ? "#0070EB":"transparent",  textDecoration: "underline",
                                textUnderlineOffset: "6px"}  }}
                >
                  {link.label}
                </Button>
        
              )}
        
            </Box>
          ))}
        </Box>
        <IconButton
            onClick={toggleMobileMenu}
            sx={{
              display: { xs: "flex", md: "none" },
              ml: "auto",
              color: "white"
            }}
          >
            <MenuIcon />
          </IconButton>
       </Toolbar>
       
        
         {/* Mobile view */}

        
       {mobileOpen && (
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                flexDirection: "column",
                width: "100%",
                position: "absolute",
                top: "64px",
                left: 0,
                backgroundColor: "#212529",
                zIndex: 1000,
                borderTop: "1px solid rgba(255,255,255,0.1)"
              }}
            >
             {navLinks.map((link) => (
              <Box key={link.label} sx={{ width: "100%", textAlign: "center" }}>
          
                {link.dropdown ? (
                  <>
                    <Button
                      fullWidth
                      onClick={(e)=> handleMouseEnter(e, link.label)}
                      endIcon={<KeyboardArrowDownIcon />}
                      sx={{
                        background: link.label === "Contributor Spotlight" ? "#0070EB":"transparent",
                        py: 1,
                        color: "white",
                        '&:hover': {
                          background: link.label === "Contributor Spotlight" ? "#0070EB":"transparent",
                          textDecoration: "underline",
                          textUnderlineOffset: "6px"
                        }
                      }}
                    >
                      {link.label}
                    </Button>
          
                    <Menu
                      anchorEl={anchorEl}
                      open={activeMenu === link.label}
                      onClose={()=>{
                        setAnchorEl(null);
                        setActiveMenu(null);
                      }}
                      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                      transformOrigin={{ vertical: "top", horizontal: "left" }}
                    >
                      {link.dropdown.map((item, index) => (
                        <MenuItem
                          key={index}
                          onClick={()=>{
                            setAnchorEl(null);
                            setActiveMenu(null);
                          }}
                        >
                          {item.label}
                        </MenuItem>
                      ))}
                    </Menu>
                  </>
                ) : (
                  <Button            
                  fullWidth
                  href={link.to}
                  onClick={() => setMobileOpen(false)}
                    sx={{
                      py: 1,
                      color: "white",
                      background: link.label === "Contributor Spotlight" ? "#0070EB":"transparent",
                      '&:hover': {
                        background: link.label === "Contributor Spotlight" ? "#0070EB":"transparent",
                        textDecoration: "underline",
                        textUnderlineOffset: "6px"
                      }
                    }}
                  >
                    {link.label}
                  </Button>
                )}
          
              </Box>
            ))}
          </Box>
        )}
    </AppBar>
    )
}


