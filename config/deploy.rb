require 'mina/git'

set :domain, 'wasp.thesponge.eu'
set :user, 'www-data'
set :repository, 'https://github.com/thesponge/kep-frontend'
set :branch, 'master'

if ENV['on']=='staging'
  set :deploy_to, '/srv/kep/staging/frontend'
else
  set :deploy_to, '/srv/kep/production/frontend'
end

task :deploy => :environment do
  deploy do
    system "rm -rf dist"
    system "ember build -e #{ENV['on']}"
    system "rsync -avP dist/* #{user}@#{domain}:#{deploy_to}/"
  end
end
