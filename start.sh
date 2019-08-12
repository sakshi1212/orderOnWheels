# npm install
echo "===== starting start.sh ======"
echo "===== database orderOnWheels created by default ====="

# set -e
# set -x

# /usr/sbin/mysqld &
# mysql_pid=$!

# until mysqladmin ping &>/dev/null; do
#   echo -n "."; sleep 0.2
# done

# # mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED BY '123123123'"
# # mysql -e "ALTER USER 'root'@'%' IDENTIFIED BY '123123123'"
# mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123123123'"
# mysql -e "ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '123123123'"

# mysqladmin shutdown

# wait $mysql_pid

echo "===== using sequelize to migrate the database ====="
npx sequelize db:migrate
echo "===== starting app ====="
npm run start-prod
echo "===== ending start.sh"