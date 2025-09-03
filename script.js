// Family Tree Data - Radial Layout
const familyData = {
    parents: [
        { id: 'mom', name: 'Slagathora', role: 'Mother' },
        { id: 'dad', name: 'Slagathoro', role: 'Father' }
    ],
    children: [
        { id: 'kid1', name: 'Kid 1', role: 'Child' },
        { id: 'kid2', name: 'Kid 2', role: 'Child' },
        { id: 'kid3', name: 'Kid 3', role: 'Child' }
    ]
};

// SVG dimensions and setup
const width = 800;
const height = 600;
const centerX = width / 2;
const centerY = height / 2;

// Create SVG
const svg = d3.select('#family-tree')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

// Create tooltip
const tooltip = d3.select('body')
    .append('div')
    .attr('class', 'tooltip');

// Calculate positions for radial layout
function calculatePositions() {
    const childRadius = 120;
    
    // Position children in perfect circle around center
    familyData.children.forEach((child, index) => {
        const angle = (index * 2 * Math.PI) / familyData.children.length;
        child.x = centerX + childRadius * Math.cos(angle - Math.PI / 2);
        child.y = centerY + childRadius * Math.sin(angle - Math.PI / 2);
    });
}

// Draw radial connection lines from center to children
function drawConnections() {
    const connections = svg.selectAll('.connection-line')
        .data(familyData.children)
        .enter()
        .append('line')
        .attr('class', 'connection-line')
        .attr('x1', centerX)
        .attr('y1', centerY)
        .attr('x2', centerX)
        .attr('y2', centerY)
        .style('opacity', 0)
        .transition()
        .duration(800)
        .delay((d, i) => i * 200)
        .attr('x2', (d) => d.x)
        .attr('y2', (d) => d.y)
        .style('opacity', 0.8);
}

// Draw family members
function drawFamilyMembers() {
    // Draw parents in center (overlapping slightly)
    const parents = svg.selectAll('.parent')
        .data(familyData.parents)
        .enter()
        .append('g')
        .attr('class', 'family-member parent')
        .attr('transform', (d, i) => {
            const offsetX = i === 0 ? -25 : 25;
            return `translate(${centerX + offsetX}, ${centerY})`;
        });

    parents.append('circle')
        .attr('r', 30)
        .attr('class', 'parents')
        .style('opacity', 0)
        .transition()
        .duration(600)
        .delay(200)
        .style('opacity', 1);

    parents.append('text')
        .attr('class', 'member-text parent-text')
        .attr('dy', -5)
        .text((d) => d.name)
        .style('opacity', 0)
        .transition()
        .duration(400)
        .delay(400)
        .style('opacity', 1);

    parents.append('text')
        .attr('class', 'member-text parent-role')
        .attr('dy', 12)
        .attr('font-size', '10px')
        .attr('font-weight', 'normal')
        .text((d) => d.role)
        .style('opacity', 0)
        .transition()
        .duration(400)
        .delay(500)
        .style('opacity', 0.7);

    // Draw children in outer circle
    const children = svg.selectAll('.child')
        .data(familyData.children)
        .enter()
        .append('g')
        .attr('class', 'family-member child')
        .attr('transform', (d) => `translate(${d.x}, ${d.y})`);

    children.append('circle')
        .attr('r', 25)
        .attr('class', 'children')
        .style('opacity', 0)
        .transition()
        .duration(600)
        .delay((d, i) => 600 + i * 200)
        .style('opacity', 1);

    children.append('text')
        .attr('class', 'member-text child-text')
        .attr('dy', -3)
        .text((d) => d.name)
        .style('opacity', 0)
        .transition()
        .duration(400)
        .delay((d, i) => 800 + i * 200)
        .style('opacity', 1);

    children.append('text')
        .attr('class', 'member-text child-role')
        .attr('dy', 10)
        .attr('font-size', '9px')
        .attr('font-weight', 'normal')
        .text((d) => d.role)
        .style('opacity', 0)
        .transition()
        .duration(400)
        .delay((d, i) => 900 + i * 200)
        .style('opacity', 0.7);

    // Add hover effects
    const allMembers = svg.selectAll('.family-member');
    
    allMembers
        .on('mouseover', function(event, d) {
            d3.select(this).select('circle')
                .transition()
                .duration(200)
                .attr('r', (d) => d.role === 'Mother' || d.role === 'Father' ? 35 : 30);
            
            tooltip
                .style('opacity', 1)
                .html(`
                    <strong>${d.name}</strong><br/>
                    ${d.role}
                `)
                .style('left', (event.pageX + 10) + 'px')
                .style('top', (event.pageY - 10) + 'px');
        })
        .on('mouseout', function(event, d) {
            d3.select(this).select('circle')
                .transition()
                .duration(200)
                .attr('r', (d) => d.role === 'Mother' || d.role === 'Father' ? 30 : 25);
            
            tooltip
                .style('opacity', 0);
        })
        .on('click', function(event, d) {
            // Add click animation
            d3.select(this).select('circle')
                .transition()
                .duration(100)
                .attr('r', (d) => d.role === 'Mother' || d.role === 'Father' ? 40 : 35)
                .transition()
                .duration(100)
                .attr('r', (d) => d.role === 'Mother' || d.role === 'Father' ? 30 : 25);
            
            console.log(`Clicked on ${d.name} (${d.role})`);
        });
}

// Add decorative radial elements
function addDecorations() {
    // Add subtle background circles to emphasize the radial structure
    const circles = [80, 140, 180];
    
    circles.forEach((radius, index) => {
        svg.append('circle')
            .attr('cx', centerX)
            .attr('cy', centerY)
            .attr('r', radius)
            .attr('fill', 'none')
            .attr('stroke', '#e0e0e0')
            .attr('stroke-width', 1)
            .attr('stroke-dasharray', index === 0 ? 'none' : '3,3')
            .style('opacity', 0)
            .transition()
            .duration(1000)
            .delay(1500 + index * 200)
            .style('opacity', 0.3);
    });
}

// Initialize the visualization
function init() {
    calculatePositions();
    drawConnections();
    drawFamilyMembers();
    addDecorations();
}

// Start the visualization
init();
