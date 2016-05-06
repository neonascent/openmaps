#!/usr/bin/ruby

# map downloadr.
# tactical space lab, 2015

require 'fileutils'

if ARGV.empty? || ARGV.count != 5
  puts "syntax: mapr.rb zoom centerx centery size"
  puts "example: mapr.rb 11 710 1117 10 toner"
  exit
end

wd = Dir.pwd

# http://b.tile.stamen.com/toner-background/10/558/355.png
# http://b.sm.mapstack.stamen.com/

zoom = ARGV[0] || 10 #url
centery = ARGV[1] || 355
centerx = ARGV[2] || 558
size = ARGV[3] || 10 # 10x10
toner = ARGV[4] || "toner-background"

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

