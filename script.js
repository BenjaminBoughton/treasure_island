// Simple two-layer design with rotated text
const width = 800;
const height = 600;
const centerX = width / 2;
const centerY = height / 2;

// Create SVG
const svg = d3.select('#family-tree')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

// Draw single big circle in center
svg.append('circle')
    .attr('cx', centerX)
    .attr('cy', centerY)
    .attr('r', 120)
    .attr('fill', 'white')
    .attr('stroke', '#333')
    .attr('stroke-width', 3);

// Add center names
svg.append('text')
    .attr('x', centerX)
    .attr('y', centerY - 10)
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .attr('font-family', 'Arial, sans-serif')
    .attr('font-size', '16px')
    .attr('font-weight', 'bold')
    .attr('fill', '#333')
    .text('James Clement Richardson Jr.');

svg.append('text')
    .attr('x', centerX)
    .attr('y', centerY + 20)
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .attr('font-family', 'Arial, sans-serif')
    .attr('font-size', '16px')
    .attr('font-weight', 'bold')
    .attr('fill', '#333')
    .text('Sarah Annis Withenbury');

// Define the four main sections
const sections = [
    { 
        startAngle: 0, 
        endAngle: Math.PI / 2, 
        text1: 'Hugh Garvin', 
        text2: 'Adelaide Richardson' 
    },
    { 
        startAngle: Math.PI / 2, 
        endAngle: Math.PI, 
        text1: 'Coombs Richardson', 
        text2: 'Henry Laboiteaux' 
    },
    { 
        startAngle: Math.PI, 
        endAngle: 3 * Math.PI / 2, 
        text1: 'Emily Richardson', 
        text2: 'Clarence Burton' 
    },
    { 
        startAngle: 3 * Math.PI / 2, 
        endAngle: 2 * Math.PI, 
        text1: 'Althea Ford', 
        text2: 'Roland Richardson' 
    }
];

// Draw the four main sections with rotated text
const outerRadius = 220;
const innerRadius = 120;

sections.forEach((section, index) => {
    // Create arc path that starts from center circle edge
    const arc = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .startAngle(section.startAngle)
        .endAngle(section.endAngle);
    
    // Draw section
    svg.append('path')
        .attr('d', arc)
        .attr('transform', `translate(${centerX}, ${centerY})`)
        .attr('fill', 'white')
        .attr('stroke', '#333')
        .attr('stroke-width', 2);
    
    // Calculate text position and rotation
    const midAngle = (section.startAngle + section.endAngle) / 2;
    const textRadius = (innerRadius + outerRadius) / 2;
    const textX = centerX + textRadius * Math.cos(midAngle - Math.PI / 2);
    const textY = centerY + textRadius * Math.sin(midAngle - Math.PI / 2);
    
    // Calculate rotation angle (convert to degrees)
    let rotationAngle = (midAngle * 180 / Math.PI);
    
    // Adjust rotation for readability
    if (rotationAngle > 90 && rotationAngle < 270) {
        rotationAngle += 180;
    }
    
    // Create text group with rotation
    const textGroup = svg.append('g')
        .attr('transform', `translate(${textX}, ${textY}) rotate(${rotationAngle})`);
    
    // Add first name
    textGroup.append('text')
        .attr('x', 0)
        .attr('y', -6)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .attr('font-family', 'Arial, sans-serif')
        .attr('font-size', '12px')
        .attr('font-weight', 'bold')
        .attr('fill', '#333')
        .text(section.text1);
    
    // Add second name
    textGroup.append('text')
        .attr('x', 0)
        .attr('y', 6)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .attr('font-family', 'Arial, sans-serif')
        .attr('font-size', '12px')
        .attr('font-weight', 'bold')
        .attr('fill', '#333')
        .text(section.text2);
});

// Add Jim Carruthers text - positioned as high as possible within Emily's section
// Position it in Emily's section area, close to the inner radius
const emilySectionStart = Math.PI;
const emilySectionEnd = 3 * Math.PI / 2;
const jimAngle = emilySectionStart + (emilySectionEnd - emilySectionStart) * 0.8; // 80% through Emily's section
const jimTextRadius = innerRadius + 20; // Position close to inner radius (as high as possible)
const jimTextX = centerX + jimTextRadius * Math.cos(jimAngle - Math.PI / 2);
const jimTextY = centerY + jimTextRadius * Math.sin(jimAngle - Math.PI / 2);

// Simple horizontal text
svg.append('text')
    .attr('x', jimTextX)
    .attr('y', jimTextY)
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .attr('font-family', 'Arial, sans-serif')
    .attr('font-size', '10px')
    .attr('font-weight', 'bold')
    .attr('fill', '#333')
    .text('Jim Carruthers');
