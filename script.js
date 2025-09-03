// Simple two-layer design
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

// Define the four sections
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

// Draw the four sections
const outerRadius = 200;
const innerRadius = 140;

sections.forEach((section, index) => {
    // Create arc path
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
    
    // Calculate text position (middle of the arc)
    const midAngle = (section.startAngle + section.endAngle) / 2;
    const textRadius = (innerRadius + outerRadius) / 2;
    const textX = centerX + textRadius * Math.cos(midAngle - Math.PI / 2);
    const textY = centerY + textRadius * Math.sin(midAngle - Math.PI / 2);
    
    // Add first name
    svg.append('text')
        .attr('x', textX)
        .attr('y', textY - 8)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .attr('font-family', 'Arial, sans-serif')
        .attr('font-size', '14px')
        .attr('font-weight', 'bold')
        .attr('fill', '#333')
        .text(section.text1);
    
    // Add second name
    svg.append('text')
        .attr('x', textX)
        .attr('y', textY + 8)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .attr('font-family', 'Arial, sans-serif')
        .attr('font-size', '14px')
        .attr('font-weight', 'bold')
        .attr('fill', '#333')
        .text(section.text2);
});
