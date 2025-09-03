// Simple single circle design
const width = 800;
const height = 600;
const centerX = width / 2;
const centerY = height / 2;

// Create SVG
const svg = d3.select('#family-tree')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

// Draw single big circle
svg.append('circle')
    .attr('cx', centerX)
    .attr('cy', centerY)
    .attr('r', 120)
    .attr('fill', 'white')
    .attr('stroke', '#333')
    .attr('stroke-width', 3);

// Add names
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
