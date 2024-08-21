document.addEventListener('DOMContentLoaded', function () {
    const player = {
        health: 100,
        maxHealth: 100,
        attack: 10,
        defense: 5,
    };

    const enemies = [
        { name: 'Skeleton', maxHealth: 40, attack: 7, image: 'images/skeleton.png', specialAttack: 'Bone Crush' },
        { name: 'Fire_Spirit', maxHealth: 60, attack: 12, image: 'images/fire_spirit.png', specialAttack: 'Flame Burst' },
        { name: 'Plent', maxHealth: 80, attack: 15, image: 'images/plent.png', specialAttack: 'Vine Whip' },
    ];

    let currentEnemyIndex = 0;
    let currentEnemy = { ...enemies[currentEnemyIndex], health: enemies[currentEnemyIndex].maxHealth };

    const playerHealthElement = document.getElementById('player-health');
    const enemyNameElement = document.getElementById('enemy-name');
    const enemyHealthElement = document.getElementById('enemy-health');

    const attackBtn = document.getElementById('attack-btn');
    const defendBtn = document.getElementById('defend-btn');
    const healBtn = document.getElementById('heal-btn');
    const specialBtn = document.getElementById('special-btn');

    function updatePlayerStats() {
        playerHealthElement.textContent = `${player.health} / ${player.maxHealth}`;
        updateHealthBars();
    }

    function updateHealthBars() {
        const playerHealthPercent = (player.health / player.maxHealth) * 100;
        document.getElementById('player-health-fill').style.width = playerHealthPercent + '%';

        const enemyHealthPercent = (currentEnemy.health / currentEnemy.maxHealth) * 100;
        document.getElementById('enemy-health-fill').style.width = enemyHealthPercent + '%';

        enemyNameElement.textContent = currentEnemy.name;
        enemyHealthElement.textContent = `${currentEnemy.health} / ${currentEnemy.maxHealth}`;
    }

    function attackEnemy() {
        currentEnemy.health -= player.attack;
        if (currentEnemy.health < 0) {
            currentEnemy.health = 0;
        }
        updateHealthBars();

        if (currentEnemy.health <= 0) {
            alert(`You defeated ${currentEnemy.name}!`);
            if (currentEnemyIndex < enemies.length - 1) {
                currentEnemyIndex++;
                currentEnemy = { ...enemies[currentEnemyIndex], health: enemies[currentEnemyIndex].maxHealth };
                updateEnemyStats();
                alert('A new enemy approaches!');
            } else {
                alert('You defeated all enemies!');
                resetGame();
            }
        } else {
            enemyAttacks();
        }
    }

    function defend() {
        const damage = Math.max(currentEnemy.attack - player.defense, 0);
        player.health -= damage;
        alert(`You defended and took ${damage} damage!`);
        updatePlayerStats();
        checkGameOver();
        enemyAttacks();
    }

    function healPlayer() {
        const healing = Math.floor(Math.random() * 20) + 10;
        player.health += healing;
        player.health = Math.min(player.health, player.maxHealth);
        updatePlayerStats();
        alert(`You healed for ${healing} HP!`);
        enemyAttacks();
    }

    function specialMove() {
        const specialDamage = player.attack * 2;
        currentEnemy.health -= specialDamage;
        if (currentEnemy.health < 0) {
            currentEnemy.health = 0;
        }
        alert('You used your Special Move and dealt ' + specialDamage + ' damage!');
        updateHealthBars();

        if (currentEnemy.health <= 0) {
            alert(`You defeated ${currentEnemy.name}!`);
            if (currentEnemyIndex < enemies.length - 1) {
                currentEnemyIndex++;
                currentEnemy = { ...enemies[currentEnemyIndex], health: enemies[currentEnemyIndex].maxHealth };
                updateEnemyStats();
                alert('A new enemy approaches!');
            } else {
                alert('You defeated all enemies!');
                resetGame();
            }
        } else {
            enemyAttacks();
        }
    }

    function enemyAttacks() {
        const randomEvent = Math.random();
        if (randomEvent < 0.3) {
            player.health -= currentEnemy.attack * 2;
            alert(`The enemy used ${currentEnemy.specialAttack}! You took ${currentEnemy.attack * 2} damage!`);
        } else if (randomEvent < 0.6) {
            player.health -= currentEnemy.attack;
            alert(`The enemy attacked! You took ${currentEnemy.attack} damage!`);
        } else {
            alert('The enemy missed!');
        }
        updatePlayerStats();
        checkGameOver();
    }

    function checkGameOver() {
        if (player.health <= 0) {
            alert('Game Over!');
            resetGame();
        }
    }

    function resetGame() {
        player.health = 100;
        currentEnemyIndex = 0;
        currentEnemy = { ...enemies[currentEnemyIndex], health: enemies[currentEnemyIndex].maxHealth };
        updatePlayerStats();
        updateEnemyStats();
    }

    function updateEnemyStats() {
        document.getElementById('enemy-image').src = currentEnemy.image;
        enemyNameElement.textContent = currentEnemy.name;
        enemyHealthElement.textContent = `${currentEnemy.health} / ${currentEnemy.maxHealth}`;
        updateHealthBars();
    }

    attackBtn.addEventListener('click', attackEnemy);
    defendBtn.addEventListener('click', defend);
    healBtn.addEventListener('click', healPlayer);
    specialBtn.addEventListener('click', specialMove);

    updatePlayerStats();
    updateEnemyStats();
});
