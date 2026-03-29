import { Box, Stack, useTheme } from '@mui/material';
import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import dayjs from 'dayjs';

const ThankYouNote = ({ darkmode, thankYou }) => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // If no data, don't render
    if (!thankYou || thankYou.length === 0) return null;

    return (
        <Box
            sx={{
                padding: theme.spacing(5, 0),
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: darkmode ? '#333333' : '#ffffff',
                color: darkmode ? 'white' : 'black',
            }}
        >
            <Box
                sx={{
                    padding: isMobile ? theme.spacing(2) : theme.spacing(3),
                    borderRadius: 5,
                    maxWidth: 'fit-content',
                    height: 'fit-content',
                    backgroundColor: 'rgb(218, 209, 198, 0.3)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: darkmode ? '1px solid white' : '1px solid black',
                }}
            >
                <Stack
                    direction='row'
                    gap={isMobile ? 1 : 3}
                    alignItems='center'
                >
                    {/* Image */}
                    <Box>
                        <img
                            src={thankYou[6]?.replace(/['"]+/g, '')}
                            alt='Contributor'
                            width={isDesktop ? 100 : isMobile ? 36 : 90}
                            height={isDesktop ? 100 : isMobile ? '100%' : 90}
                        />
                    </Box>

                    {/* Text */}
                    <Box
                        sx={{
                            fontSize: isMobile ? 'small' : 'medium',
                        }}
                    >
                        Thank you{' '}
                        {thankYou?.filter((item) => item?.trim() === '')
                            .length === 0 && (
                            <a
                                target='_blank'
                                rel='noreferrer'
                                href={thankYou[5]?.replace(/['"]+/g, '')}
                            >
                                {thankYou[3]?.replace(/['"]+/g, '').trim()
                                    ? thankYou[3]?.replace(/['"]+/g, '')
                                    : thankYou[2]?.replace(/['"]+/g, '')}
                            </a>
                        )}
                        <br />
                        for making {thankYou[7]?.replace(
                            /['"]+/g,
                            ''
                        )} pull{' '}
                        {parseInt(thankYou[7]?.replace(/['"]+/g, '')) >= 2
                            ? 'requests'
                            : 'request'}
                        <br />
                        to{' '}
                        {thankYou[8]?.split(' ')?.length >= 4
                            ? parseInt(thankYou[8]?.split(' ')?.length) +
                              ' Jenkins '
                            : 'the '}
                        {/* Repo links */}
                        {thankYou[8]?.split(' ').length < 4 &&
                            thankYou[8]
                                ?.replace(/['"]+/g, '')
                                .split(/\s+/)
                                .filter(Boolean)
                                .map((repo, idx) => (
                                    <React.Fragment key={idx}>
                                        {thankYou[8]?.split(' ').length > 2 &&
                                            idx ===
                                                thankYou[8]?.split(' ').length -
                                                    2 &&
                                            'and '}

                                        <a
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            href={`https://github.com/${repo}`}
                                        >
                                            {repo?.split('/')[1]}
                                        </a>

                                        {thankYou[8]?.split(' ').length >= 2 &&
                                        idx <
                                            thankYou[8]?.split(' ').length -
                                                2 ? (
                                            <>
                                                ,
                                                <br />
                                            </>
                                        ) : (
                                            ' '
                                        )}
                                    </React.Fragment>
                                ))}{' '}
                        {thankYou[8]?.split(' ').length > 2
                            ? 'repos'
                            : 'repo'}{' '}
                        in{' '}
                        {dayjs(
                            thankYou[1]?.replace(/['"]+/g, '').trim()
                        ).format('MMMM YYYY')}
                        !
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
};

export default ThankYouNote;
