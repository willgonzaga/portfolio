git add .
read -p "Descrição: " desc
git commit -m "$desc"
git branch -M main
git remote add origin https://github.com/vailei/portfolio.git
git push -u origin main