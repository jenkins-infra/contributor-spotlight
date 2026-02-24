import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { Github, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Box, Typography, Avatar, Card, CardContent, IconButton, Tooltip } from '@mui/material';
import XIcon from '../XIcon.jsx';

function SearchResults({ results, darkmode }) {
    if (!results || results.length === 0) {
        return (
            <Box
                sx={{
                    padding: '24px',
                    backgroundColor: darkmode ? '#2c2c2c' : '#f0f0f0',
                    borderRadius: '12px',
                    border: '1px solid #333',
                    color: darkmode ? '#ccc' : '#333',
                    textAlign: 'center',
                    margin: '16px 0',
                }}
            >
                <Typography variant="body1">🔍 No contributors found</Typography>
            </Box>
        );
    }

    const sortedResults = [...results].sort((a, b) => a.score - b.score);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {sortedResults.map(({ item }) => {
                if (!item) return null;
                return (
                    <Card 
                        key={item.id} 
                        sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            p: 2,
                            backgroundColor: darkmode ? '#1e1e1e' : '#fff'
                        }}
                    >
                        {/* Avatar and Name are linked to profile */}
                        <Box 
                            component={GatsbyLink} 
                            to={item.slug} 
                            sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                textDecoration: 'none', 
                                color: 'inherit',
                                flexGrow: 1 
                            }}
                            aria-label={`View profile of ${item.name}`}
                        >
                            <Avatar 
                                src={item.image} 
                                alt={item.name} 
                                sx={{ width: 56, height: 56, mr: 2 }} 
                            />
                            <Box>
                                <Typography variant="h6">{item.name}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.location}
                                </Typography>
                            </Box>
                        </Box>

                        {/* Social Links are separate - No Nested Links! */}
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            {item.github && (
                                <Tooltip title="GitHub">
                                    <IconButton 
                                        component="a" 
                                        href={`https://github.com/${item.github}`}
                                        target="_blank"
                                        aria-label="GitHub Profile"
                                    >
                                        <Github size={20} />
                                    </IconButton>
                                </Tooltip>
                            )}
                            {item.linkedin && (
                                <Tooltip title="LinkedIn">
                                    <IconButton 
                                        component="a" 
                                        href={`https://linkedin.com/in/${item.linkedin}`}
                                        target="_blank"
                                        aria-label="LinkedIn Profile"
                                    >
                                        <Linkedin size={20} />
                                    </IconButton>
                                </Tooltip>
                            )}
                            {item.twitter && (
                                <Tooltip title="X (Twitter)">
                                    <IconButton 
                                        component="a" 
                                        href={`https://x.com/${item.twitter}`}
                                        target="_blank"
                                        aria-label="X Profile"
                                    >
                                        <XIcon size={20} />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </Box>
                    </Card>
                );
            })}
        </Box>
    );
}

export default SearchResults;