import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Helmet } from 'react-helmet';
import { Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import DOMPurify from 'dompurify';
import '../styles/contributor-details.css';

function ContributorDetails() {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [contributor, setContributor] = useState(null);
    const [sanitizedHTML, setSanitizedHTML] = useState('');
    const [slug, setSlug] = useState(null); // ✅ FIX

    // ✅ SAFE WINDOW ACCESS
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            setSlug(params.get('slug'));
        }
    }, []);

    // ✅ FETCH DATA (runs only after slug is set)
    useEffect(() => {
        if (!slug) return;

        fetch('/contributors.json')
            .then((res) => res.json())
            .then((data) => {
                const found = data.find((c) => {
                    if (c.slug === slug) return true;

                    if (c.node?.fields?.slug) {
                        const cleanSlug = c.node.fields.slug
                            .split('/')
                            .filter(Boolean)
                            .pop();

                        return cleanSlug === slug;
                    }

                    return false;
                });

                setContributor(found?.node || found);
            })
            .catch((err) => console.error('Fetch error:', err));
    }, [slug]);

    // ✅ SANITIZE HTML
    useEffect(() => {
        if (contributor?.html) {
            setSanitizedHTML(DOMPurify.sanitize(contributor.html));
        }
    }, [contributor]);

    if (!contributor) {
        return (
            <h2 style={{ color: 'white', textAlign: 'center' }}>Loading...</h2>
        );
    }

    const title = `${contributor.name} - Jenkins Contributor Spotlight`;

    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>

            <Box display='flex' flexDirection='column'>
                <Box
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='center'
                    padding={isMobile ? 5 : 10}
                    sx={{
                        backgroundImage:
                            'url("/marek-szturc-2s3fI3M1lO0-unsplash.jpg")',
                        backgroundSize: 'cover',
                    }}
                >
                    <img
                        src={
                            contributor.image
                                ? `/${contributor.image}`
                                : '/jenkins.png'
                        }
                        alt='avatar'
                        width={isDesktop ? 300 : 200}
                        style={{ borderRadius: '50%' }}
                    />
                </Box>

                <Box padding={isMobile ? 2 : 6}>
                    <Link to='/' style={{ textDecoration: 'none' }}>
                        <Stack direction='row' gap={1}>
                            <ArrowBackIcon />
                            <Typography>Back</Typography>
                        </Stack>
                    </Link>

                    <Typography variant='h4' textAlign='center' mt={2}>
                        {contributor.name}
                    </Typography>

                    <Typography textAlign='center'>
                        {contributor.location || 'World'}
                    </Typography>

                    <Typography textAlign='center'>
                        {contributor.intro}
                    </Typography>

                    <Box display='flex' justifyContent='center' gap={2} mt={2}>
                        {contributor.github && (
                            <motion.a
                                href={`https://github.com/${contributor.github}`}
                                target='_blank'
                            >
                                <Github />
                            </motion.a>
                        )}

                        {contributor.linkedin && (
                            <motion.a
                                href={`https://linkedin.com/in/${contributor.linkedin}`}
                                target='_blank'
                            >
                                <Linkedin />
                            </motion.a>
                        )}

                        {contributor.email && (
                            <motion.a href={`mailto:${contributor.email}`}>
                                <Mail />
                            </motion.a>
                        )}
                    </Box>

                    <Box
                        mt={4}
                        dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
                    />
                </Box>
            </Box>
        </>
    );
}

export default ContributorDetails;
