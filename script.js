// Family Tree Data
const familyData = {
    parents: [
        { id: 'mom', name: 'Slagathora', role: 'Mother', x: 0, y: 0 },
        { id: 'dad', name: 'Slagathoro', role: 'Father', x: 0, y: 0 }
    ],
    children: [
        { id: 'kid1', name: 'Kid 1', role: 'Child', x: 0, y: 0 },
        { id: 'kid2', name: 'Kid 2', role: 'Child', x: 0, y: 0 },
        { id: 'kid3', name: 'Kid 3', role: 'Child', x: 0, y: 0 }
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

// Calculate positions for concentric circles
function calculatePositions() {
    const parentRadius = 80;
    const childRadius = 150;
    
    // Position parents in center (side by side)
    familyData.parents[0].x = centerX - 40;
    familyData.parents[0].y = centerY;
    familyData.parents[1].x = centerX + 40;
    familyData.parents[1].y = centerY;
    
    // Position children in outer circle
    familyData.children.forEach((child, index) => {
        const angle = (index * 2 * Math.PI) / familyData.children.length;
        child.x = centerX + childRadius * Math.cos(angle - Math.PI / 2);
        child.y = centerY + childRadius * Math.sin(angle - Math.PI / 2);
    });
}

// Draw connection lines from parents to children
function drawConnections() {
    const connections = svg.selectAll('.connection-line')
        .data(familyData.children)
        .enter()
        .append('path')
        .attr('class', 'connection-line')
        .attr('d', (d) => {
            const parentX = centerX;
            const parentY = centerY;
            return `M ${parentX} ${parentY} L ${d.x} ${d.y}`;
        })
        .style('opacity', 0)
        .transition()
        .duration(800)
        .delay((d, i) => i * 200)
        .style('opacity', 0.7);
}

// Draw family members
function drawFamilyMembers() {
    // Draw parents
    const parents = svg.selectAll('.parent')
        .data(familyData.parents)
        .enter()
        .append('g')
        .attr('class', 'family-member parent')
        .attr('transform', (d) => `translate(${d.x}, ${d.y})`);

    parents.append('circle')
        .attr('r', 35)
        .attr('class', 'parents')
        .style('opacity', 0)
        .transition()
        .duration(600)
        .delay(200)
        .style('opacity', 1);

    parents.append('text')
        .attr('class', 'member-text')
        .attr('dy', -5)
        .text((d) => d.name)
        .style('opacity', 0)
        .transition()
        .duration(400)
        .delay(400)
        .style('opacity', 1);

    parents.append('text')
        .attr('class', 'member-text')
        .attr('dy', 15)
        .attr('font-size', '10px')
        .attr('font-weight', 'normal')
        .text((d) => d.role)
        .style('opacity', 0)
        .transition()
        .duration(400)
        .delay(500)
        .style('opacity', 0.7);

    // Draw children
    const children = svg.selectAll('.child')
        .data(familyData.children)
        .enter()
        .append('g')
        .attr('class', 'family-member child')
        .attr('transform', (d) => `translate(${d.x}, ${d.y})`);

    children.append('circle')
        .attr('r', 30)
        .attr('class', 'children')
        .style('opacity', 0)
        .transition()
        .duration(600)
        .delay((d, i) => 600 + i * 200)
        .style('opacity', 1);

    children.append('text')
        .attr('class', 'member-text')
        .attr('dy', -3)
        .text((d) => d.name)
        .style('opacity', 0)
        .transition()
        .duration(400)
        .delay((d, i) => 800 + i * 200)
        .style('opacity', 1);

    children.append('text')
        .attr('class', 'member-text')
        .attr('dy', 12)
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
                .attr('r', (d) => d.role === 'Mother' || d.role === 'Father' ? 40 : 35);
            
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
                .attr('r', (d) => d.role === 'Mother' || d.role === 'Father' ? 35 : 30);
            
            tooltip
                .style('opacity', 0);
        })
        .on('click', function(event, d) {
            // Add click animation
            d3.select(this).select('circle')
                .transition()
                .duration(100)
                .attr('r', (d) => d.role === 'Mother' || d.role === 'Father' ? 45 : 40)
                .transition()
                .duration(100)
                .attr('r', (d) => d.role === 'Mother' || d.role === 'Father' ? 35 : 30);
            
            console.log(`Clicked on ${d.name} (${d.role})`);
        });
}

// Add decorative elements
function addDecorations() {
    // Add a subtle background circle
    svg.append('circle')
        .attr('cx', centerX)
        .attr('cy', centerY)
        .attr('r', 200)
        .attr('fill', 'none')
        .attr('stroke', '#e0e0e0')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '5,5')
        .style('opacity', 0)
        .transition()
        .duration(1000)
        .delay(1500)
        .style('opacity', 0.3);
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
