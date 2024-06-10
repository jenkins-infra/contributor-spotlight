import React from 'react';
import { graphql, Link } from 'gatsby';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import '../styles/contributor-details.css';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Helmet } from 'react-helmet';
import dayjs from 'dayjs';

function ContributorDetails(props) {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
    const isTablet = useMediaQuery(theme.breakpoints.between('lg', 'sm'));
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const title =
        props.data.asciidoc.pageAttributes.name +
        ' - Jenkins Contributor Spotlight';

    return (
        <>
            <Helmet>
                <meta charSet='utf-8' />
                <title>{title}</title>
                <meta name='title' property='og:title' content={title} />
                <meta
                    property='og:image'
                    content={
                        '../../../' + props.data.asciidoc.pageAttributes.image
                    }
                />
                <meta property='og:image:width' content='520' />
                <meta property='og:image:height' content='270' />
                <meta
                    property='og:description'
                    content={
                        'Jenkins Contributor Spotlight is where we celebrate the contributions of Jenkins community members. In this feature we spotlight ' +
                        props.data.asciidoc.pageAttributes.name +
                        '.'
                    }
                />
                <meta
                    property='article:author'
                    content='Jenkins Copy Editors'
                />
                <meta
                    property='article:published_time'
                    content={dayjs(
                        props.data.asciidoc.pageAttributes.datepublished
                    ).toISOString()}
                />
            </Helmet>
            <Box padding={0} display='flex' flexDirection='column'>
                <Box
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='center'
                    padding={isMobile ? 5 : 10}
                    sx={{
                        backgroundImage:
                            'url("../../../marek-szturc-2s3fI3M1lO0-unsplash.jpg")',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <Box sx={{ paddingTop: isMobile ? 5 : 8 }}>
                        <img
                            src={
                                '../../../' +
                                props.data.asciidoc.pageAttributes.image
                            }
                            alt='Contributor avatar'
                            width={isDesktop ? 350 : isTablet ? 300 : 250}
                            height={isDesktop ? 350 : isTablet ? 300 : 250}
                            style={{ objectFit: 'cover', borderRadius: '50%' }}
                        />
                    </Box>
                </Box>
                <Box
                    padding={
                        isDesktop
                            ? '32px 160px'
                            : isTablet
                              ? '24px 64px'
                              : '16px 32px'
                    }
                >
                    <Link style={{ textDecoration: `none` }} to='/'>
                        <Stack direction='row' gap={1}>
                            <ArrowBackIcon />
                            <Typography>Back to Spotlight</Typography>
                        </Stack>
                    </Link>
                    <Box sx={{ paddingBottom: 2, paddingTop: 2 }}>
                        <Typography
                            variant='h5'
                            fontweight={500}
                            textAlign='center'
                        >
                            Contributor Spotlight
                        </Typography>
                    </Box>
                    <Box sx={{ paddingBottom: 1.5 }}>
                        <Typography
                            variant='h4'
                            fontWeight={700}
                            textAlign='center'
                            color='#0096FF'
                        >
                            {props.data.asciidoc.document.title}
                        </Typography>
                        <Typography
                            variant='h5'
                            textAlign='center'
                            color='#0096FF'
                        >
                            {props.data.asciidoc.pageAttributes.pronouns ??
                                'They/them'}
                        </Typography>
                    </Box>
                    <Box sx={{ paddingBottom: 1.5 }}>
                        <Typography variant='h6' textAlign='center'>
                            {props.data.asciidoc.pageAttributes.location ??
                                'World'}
                        </Typography>
                        <Typography variant='h6' textAlign='center'>
                            {'First Commit: ' +
                                props.data.asciidoc.pageAttributes
                                    .firstcommit ?? 'Unknown'}
                        </Typography>
                    </Box>
                    <Box sx={{ paddingBottom: 1.5 }}>
                        <Typography variant='h6' textAlign='center'>
                            {'Date Published: ' +
                                props.data.asciidoc.pageAttributes
                                    .datepublished}
                        </Typography>
                    </Box>
                    <Box
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        gap={1}
                        sx={{ paddingBottom: 2 }}
                    >
                        {props.data.asciidoc.pageAttributes.linkedin !== '' && (
                            <Link
                                to={`https://www.linkedin.com/in/${props.data.asciidoc.pageAttributes.linkedin}`}
                            >
                                <LinkedInIcon />
                            </Link>
                        )}
                        {props.data.asciidoc.pageAttributes.twitter !== '' && (
                            <Link
                                to={`https://twitter.com/${props.data.asciidoc.pageAttributes.twitter}`}
                            >
                                <TwitterIcon />
                            </Link>
                        )}
                        {props.data.asciidoc.pageAttributes.github !== '' && (
                            <Link
                                to={`https://github.com/${props.data.asciidoc.pageAttributes.github}`}
                            >
                                <GitHubIcon />
                            </Link>
                        )}
                        {props.data.asciidoc.pageAttributes.email !== '' && (
                            <Link
                                to={`mailto:${props.data.asciidoc.pageAttributes.email}`}
                            >
                                <AlternateEmailIcon />
                            </Link>
                        )}
                    </Box>
                    <Box sx={{ my: 2 }}>
                        <Typography>
                            {props.data.asciidoc.pageAttributes.intro}
                        </Typography>
                    </Box>
                    <Box
                        dangerouslySetInnerHTML={{
                            __html: props.data.asciidoc.html,
                        }}
                    />
                </Box>
            </Box>
        </>
    );
}

export default ContributorDetails;

export const pageQuery = graphql`
    query ($id: String!) {
        asciidoc(id: { eq: $id }) {
            html
            document {
                title
                subtitle
                main
            }
            pageAttributes {
                datepublished
                name
                pronouns
                location
                firstcommit
                linkedin
                twitter
                github
                email
                image
                featured
                intro
            }
        }
    }
`;
