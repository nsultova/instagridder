// This is an example - which works
// Wanna-do: Typescript? Are there better solutions?
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('imageGrid');
    const items = grid.getElementsByClassName('grid-item');

    let draggedItem = null;
    let draggedIndex = null;

    Array.from(items).forEach(item => {
        item.addEventListener('dragstart', (e) => {
            draggedItem = item;
            draggedIndex = parseInt(item.dataset.index);
            e.dataTransfer.effectAllowed = 'move';
            item.classList.add('dragging');

            // helps with drag image transparency in some browsers 
            //0 -> do $thingy asap as code finishes
            setTimeout(() => {
                item.style.opacity = '0.5';
            }, 0);
        });

        item.addEventListener('dragend', (e) => {
            draggedItem.style.opacity = '1';
            draggedItem.classList.remove('dragging');
            
            // Remove all drag-over classes
            Array.from(items).forEach(item => {
                item.classList.remove('drag-over');
            });
        });

        item.addEventListener('dragover', (e) => {
            e.preventDefault(); //..or browser says nope
            e.dataTransfer.dropEffect = 'move';
            item.classList.add('drag-over');
        });

        item.addEventListener('dragleave', (e) => {
            item.classList.remove('drag-over');
        });

        item.addEventListener('drop', (e) => {
            e.preventDefault(); //..or browser says nope
            if (draggedItem === item) return;

            const allItems = [...items];
            const draggedOverIndex = parseInt(item.dataset.index);

            // Update visual order
            if (draggedIndex < draggedOverIndex) {
                item.parentNode.insertBefore(draggedItem, item.nextSibling);
            } else {
                item.parentNode.insertBefore(draggedItem, item);
            }

            // Update data-index attributes
            allItems.forEach((item, index) => {
                item.dataset.index = index;
            });
        });
    });
});

/* 
Learning notes for myself:
    dataset contains all data-* attributes grabbed from index.html

    Dragging logic:
    HTML --> tree structure, thus
    parentNode --> grap parent dir
    insertBefore --> mv file in .
    nextSibling --> nxt element at same depth
*/