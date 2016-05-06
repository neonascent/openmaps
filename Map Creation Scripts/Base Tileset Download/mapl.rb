#!/usr/bin/ruby

# map downloadr.
# tactical space lab, 2015

require 'fileutils'

if ARGV.empty? || ARGV.count != 5
  puts "syntax: mapl.rb zoom lat lng size (map)"
  puts "example: mapl.rb 10 52.518919 13.385333 10 toner-background"
  exit
end

wd = Dir.pwd

# http://b.tile.stamen.com/toner-background/10/558/355.png
# http://b.sm.mapstack.stamen.com/

zoom = ARGV[0] || 10 #url
lat = ARGV[1] || 355
lng = ARGV[2] || 558
size = ARGV[3] || 10 # 10x10
toner = ARGV[4] || "toner-background"

centery = ((lng.to_f + 180) / 360 * (2 ** zoom.to_i)).floor;
centerx = ((1 - Math.log(Math.tan(lat.to_f * Math::PI / 180) + 1 / Math.cos(lat.to_f * Math::PI / 180)) / Math::PI) / 2 * (2 ** zoom.to_i)).floor;

Dir.mkdir zoom rescue nil

startx = centerx.to_i - size.to_i/2 
starty = centery.to_i - size.to_i/2

starty.upto(starty+size.to_i) do |y|
  Dir.mkdir "#{wd}/#{zoom}/#{y}" rescue nil
  FileUtils.rm_rf Dir.glob("#{wd}/#{zoom}/#{y}/*")
  startx.upto(startx+size.to_i) do |x|
  puts "x:#{startx}"
  Dir.chdir("#{wd}/#{zoom}/#{y}")
  %x[wget "http://b.sm.mapstack.stamen.com/#{toner}/#{zoom}/#{y}/#{x}.png"]
  end
end

